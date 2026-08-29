import { join } from "node:path";
import { runInDocker } from "./sandbox.js";
import { targetCommand } from "./target.js";
import type { Finding, AuditPolicy } from "./types.js";

function dynamicFinding(id: string, category: Finding["category"], severity: Finding["severity"], title: string, description: string, value: string): Finding {
  return { id, category, severity, title, description, source: "dynamic", confidence: "confirmed", evidence: [{ kind: "trace", value }] };
}

type ProcessEvent = {
  type: "process_exec";
  operation?: string;
  executable?: string;
  command?: string;
  arguments?: unknown[];
  shell?: boolean;
};

function findingIdPart(value: string) {
  return value.replace(/[^a-zA-Z0-9_.-]+/g, "-").slice(0, 80) || "unknown";
}

export function classifyProcessEvent(event: ProcessEvent, policy: AuditPolicy): Finding {
  const executable = String(event.executable ?? event.command ?? "unknown");
  const operation = String(event.operation ?? "unknown");
  const shellInterpreted = event.shell === true || operation === "exec" || operation === "execSync";
  const value = JSON.stringify(event);
  if (shellInterpreted && !policy.allowShellExecution) {
    return dynamicFinding(
      `dynamic-shell-exec-${findingIdPart(executable)}`,
      "process_execution",
      "critical",
      "Shell-interpreted process execution",
      `The server attempted ${operation} with a shell-interpreted command string while shell execution was disallowed.`,
      value
    );
  }
  const approved = policy.allowProcessExecution || policy.allowedProcessExecutables.includes(executable);
  if (approved) {
    return dynamicFinding(
      `dynamic-approved-process-${findingIdPart(executable)}`,
      "process_execution",
      "low",
      "Approved direct process execution",
      `The server directly invoked the policy-approved executable ${executable} without shell interpretation.`,
      value
    );
  }
  return dynamicFinding(
    `dynamic-direct-process-${findingIdPart(executable)}`,
    "process_execution",
    "medium",
    "Direct process execution requires review",
    `The server directly invoked ${executable} without shell interpretation, but that executable was not explicitly approved by policy.`,
    value
  );
}

export async function runDynamicAudit(root: string, policy: AuditPolicy, caseId: string, commandOverride?: [string, string[]]) {
  const traces: string[] = [];
  const findings: Finding[] = [];
  const emitted = new Set<string>();
  const addFinding = (finding: Finding) => {
    if (emitted.has(finding.id)) return;
    emitted.add(finding.id);
    findings.push(finding);
  };
  const normalizedPath = (value: unknown) => {
    const raw = String(value);
    if (raw.startsWith("file://")) {
      try { return decodeURIComponent(new URL(raw).pathname); } catch { return raw.slice("file://".length); }
    }
    return raw;
  };
  const harnessRoot = join(process.cwd(), "src");
  const [serverCommand, serverArgs] = commandOverride ?? await targetCommand(root);
  const commandSpec = JSON.stringify([serverCommand, ...serverArgs]);
  const sandbox = await runInDocker(root, harnessRoot, "node", ["/harness/probe.cjs", "/app"], { AUDIT_CASE_ID: caseId, MCP_SERVER_COMMAND: commandSpec });
  if (sandbox.mode === "unavailable") return { findings, traces, sandbox, protocol: { initialized: false, tools: [] as string[] }, limitations: [sandbox.error ?? "Sandbox unavailable"] };
  traces.push(sandbox.stderr.trim(), sandbox.stdout.trim());
  const probeLine = sandbox.stdout.split(/\r?\n/).find((line) => line.startsWith("PROBE_RESULT "));
  let protocol = { initialized: false, tools: [] as string[] };
  if (!probeLine) addFinding(dynamicFinding("dynamic-probe-failed", "protocol", "high", "MCP probe did not complete", "The server did not produce a valid probe result inside the sandbox.", sandbox.stderr || sandbox.stdout));
  else {
    try {
      const probe = JSON.parse(probeLine.slice("PROBE_RESULT ".length));
      if (probe.error) addFinding(dynamicFinding("dynamic-protocol-error", "protocol", "medium", "Protocol interaction failed", probe.error, probeLine));
      const toolNames = (probe.tools || []).map((tool: any) => tool.name);
      protocol = { initialized: Boolean(probe.initialize), tools: toolNames };
      if (toolNames.length === 0) addFinding(dynamicFinding("dynamic-no-tools", "protocol", "low", "No tools exposed", "The server completed initialization but exposed no tools to the audit client.", probeLine));
    } catch { addFinding(dynamicFinding("dynamic-probe-json", "protocol", "high", "Malformed probe result", "The sandbox probe output could not be parsed.", probeLine)); }
  }
  let probeServerStderr = "";
  if (probeLine) {
    try { probeServerStderr = JSON.parse(probeLine.slice("PROBE_RESULT ".length)).serverStderr || ""; } catch { /* already reported above */ }
  }
  const eventLines = `${sandbox.stderr}\n${sandbox.stdout}\n${probeServerStderr}`.split(/\r?\n/).filter((line) => line.startsWith("MCP_AUDIT_EVENT "));
  for (const line of eventLines) {
    try {
      const event = JSON.parse(line.slice("MCP_AUDIT_EVENT ".length));
      const value = JSON.stringify(event);
      if (event.type === "env_read" && !policy.allowedEnvironmentVariables.includes(event.name)) findings.push(dynamicFinding(`dynamic-secret-${event.name}`, "secret_access", "high", "Unexpected environment-variable access", `The server read ${event.name}, which is outside the audit policy.`, value));
      const path = normalizedPath(event.path);
      if (event.type === "fs_read" && !policy.allowedReadRoots.some((rootPath) => path.startsWith(rootPath))) addFinding(dynamicFinding(`dynamic-fs-read-${path}`, "filesystem", "high", "Out-of-policy filesystem read", `The server attempted to read ${path}.`, value));
      if (["fs_write", "fs_delete"].includes(event.type) && !policy.allowedWriteRoots.some((rootPath) => path.startsWith(rootPath))) addFinding(dynamicFinding(`dynamic-fs-${event.type}-${path}`, "filesystem", "high", "Out-of-policy filesystem mutation", `The server attempted ${event.type} at ${path}.`, value));
      if (event.type === "process_exec") addFinding(classifyProcessEvent(event, policy));
      if (event.type === "network_connect" && !policy.allowedNetworkHosts.includes(event.host)) addFinding(dynamicFinding(`dynamic-network-${event.host}`, "network", "high", "Unexpected network connection", `The server attempted to connect to ${event.host}.`, value));
    } catch { /* malformed trace is itself retained as raw evidence */ }
  }
  return { findings, traces, sandbox, protocol, limitations: [] as string[] };
}

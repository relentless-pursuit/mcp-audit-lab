import { runDynamicAudit } from "./dynamicAudit.js";
import { runStaticAudit } from "./staticAudit.js";
import { defaultPolicy } from "./policy.js";
import type { AuditPolicy, AuditResult } from "./types.js";
import { isAbsolute, relative } from "node:path";

function reportTarget(root: string) {
  const projectRelative = relative(process.cwd(), root);
  return projectRelative && !projectRelative.startsWith("..") && !isAbsolute(projectRelative)
    ? `$PROJECT_ROOT/${projectRelative}`
    : root;
}

export async function auditTarget(root: string, caseId = "manual", serverCommand?: [string, string[]], policy: AuditPolicy = defaultPolicy): Promise<AuditResult> {
  const staticFindings = await runStaticAudit(root);
  const dynamic = await runDynamicAudit(root, policy, caseId, serverCommand);
  const findings = [...staticFindings, ...dynamic.findings];
  const agentTrajectory = [
    { step: "inventory", decision: `Collected ${staticFindings.length} static signals before execution.`, evidence: staticFindings.map((f) => f.title).join("; ") || "none" },
    { step: "sandbox", decision: dynamic.sandbox.mode === "docker" ? "Selected Docker sandbox because the target is untrusted." : "Refused unsandboxed execution.", evidence: dynamic.sandbox.command },
    { step: "probe", decision: `Probed ${dynamic.protocol.tools.length} discovered MCP tools with safe example arguments.`, evidence: dynamic.protocol.tools.join(", ") || "none" },
    { step: "verify", decision: `Retained ${dynamic.findings.length} runtime findings with trace evidence.`, evidence: dynamic.findings.map((f) => f.title).join("; ") || "none" }
  ];
  return {
    caseId,
    target: reportTarget(root),
    generatedAt: new Date().toISOString(),
    protocol: { initialized: dynamic.protocol?.initialized ?? false, tools: dynamic.protocol?.tools ?? [] },
    staticFindings,
    dynamicFindings: dynamic.findings,
    findings,
    traces: dynamic.traces,
    agentTrajectory,
    limitations: dynamic.limitations,
    sandbox: { mode: dynamic.sandbox.mode, command: dynamic.sandbox.command }
  };
}

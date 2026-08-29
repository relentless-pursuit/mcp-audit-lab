import { readFile } from "node:fs/promises";
import { isAbsolute, relative } from "node:path";
import type { AuditResult, Finding } from "./types.js";

function reportTarget(root: string) {
  const projectRelative = relative(process.cwd(), root);
  return projectRelative && !projectRelative.startsWith("..") && !isAbsolute(projectRelative)
    ? `$PROJECT_ROOT/${projectRelative}`
    : root;
}

// Baseline: a documentation/tool-catalog review with no sandbox execution.
// It intentionally represents a reasonable basic review, not the final auditor.
export async function baselineAudit(root: string, caseId = "baseline"): Promise<AuditResult> {
  let source = "";
  for (const candidate of ["server.cjs", "src/index.ts", "src/index.js", "build/index.js"]) {
    try { source += `\n${await readFile(`${root}/${candidate}`, "utf8")}`; } catch { /* optional entrypoint */ }
  }
  const findings: Finding[] = [];
  const toolBlocks = source.match(/name:\s*["'`]([^"'`]+)["'`][\s\S]{0,500}?description:\s*["'`]([^"'`]+)["'`]/g) || [];
  for (const block of toolBlocks) {
    if (/delete|write|shell|command|network|secret|credential/i.test(block)) {
      findings.push({ id: `baseline-${findings.length}`, category: "documentation", severity: "medium", title: "Tool description requires review", description: "The catalog text contains a potentially sensitive capability keyword.", source: "static", confidence: "suspected", evidence: [{ kind: "file", value: "server.cjs tool catalog" }] });
    }
  }
  return { caseId, target: reportTarget(root), generatedAt: new Date().toISOString(), protocol: { initialized: false, tools: [] }, staticFindings: findings, dynamicFindings: [], findings, traces: [], agentTrajectory: [{ step: "review", decision: "Reviewed documentation and tool-catalog text only.", evidence: "server.cjs" }], limitations: ["Baseline does not execute the server or inspect runtime behaviour."], sandbox: { mode: "unavailable" } };
}

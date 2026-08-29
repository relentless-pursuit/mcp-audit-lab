import type { AuditResult } from "./types.js";

export function toMarkdown(result: AuditResult): string {
  const lines = [
    `# MCP Audit Report`, ``,
    `- Target: \`${result.target}\``,
    `- Case: \`${result.caseId}\``,
    `- Generated: ${result.generatedAt}`,
    `- Sandbox: **${result.sandbox.mode}**`,
    `- Protocol initialized: **${result.protocol.initialized ? "yes" : "no"}**`,
    `- Tools discovered: ${result.protocol.tools.length ? result.protocol.tools.map((x) => `\`${x}\``).join(", ") : "none"}`, ``,
    `## Findings`, ``
  ];
  if (!result.findings.length) lines.push("No findings were recorded.", "");
  for (const f of result.findings) {
    lines.push(`### ${f.severity.toUpperCase()}: ${f.title}`, "", f.description, "", `Source: ${f.source}; confidence: ${f.confidence}`, "", "Evidence:");
    for (const e of f.evidence) lines.push(`- ${e.kind}: ${e.value}`);
    lines.push("");
  }
  if (result.limitations.length) { lines.push("## Limitations", ""); for (const x of result.limitations) lines.push(`- ${x}`); lines.push(""); }
  lines.push("## Agent trajectory", "");
  for (const step of result.agentTrajectory) lines.push(`- **${step.step}**: ${step.decision}${step.evidence ? ` (evidence: ${step.evidence})` : ""}`);
  lines.push("");
  return lines.join("\n");
}

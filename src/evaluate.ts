import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { auditTarget } from "./audit.js";
import { baselineAudit } from "./baseline.js";
import type { CaseEvaluation, EvaluationResult, ExpectedFinding, FixtureMetadata } from "./types.js";

async function manifest(): Promise<FixtureMetadata[]> {
  return JSON.parse(await readFile(join(process.cwd(), "fixtures", "manifest.json"), "utf8"));
}

function matches(expected: ExpectedFinding, finding: any) {
  return finding.category === expected.category && finding.title.toLowerCase().includes(expected.titleIncludes.toLowerCase());
}

export function score(method: string, cases: FixtureMetadata[], results: any[], runtimeMs: number): EvaluationResult {
  const perCase: CaseEvaluation[] = cases.map((fixture, index) => {
    const expected = fixture.expectedFindings.filter((f) => ["high", "critical"].includes(f.severity));
    const detected = results[index]?.findings || [];
    const matched = expected.filter((e) => detected.some((f: any) => matches(e, f)));
    const missed = expected.filter((e) => !detected.some((f: any) => matches(e, f))).map((e) => `${e.category}: ${e.titleIncludes}`);
    const unexpectedHighRisk = detected.filter((f: any) => ["high", "critical"].includes(f.severity) && !expected.some((e) => matches(e, f))).length;
    return { caseId: fixture.caseId, expectedHighRisk: expected.length, detectedHighRisk: matched.length, missed, unexpectedHighRisk };
  });
  const expectedHighRisk = perCase.reduce((sum, item) => sum + item.expectedHighRisk, 0);
  const highRiskDetected = perCase.reduce((sum, item) => sum + item.detectedHighRisk, 0);
  const falsePositives = perCase.reduce((sum, item) => sum + item.unexpectedHighRisk, 0);
  const detected = results.flatMap((r) => r.findings);
  const evidenceBacked = detected.filter((f: any) => f.evidence?.length > 0).length;
  return { method, cases: cases.length, highRiskExpected: expectedHighRisk, highRiskDetected, highRiskRecall: expectedHighRisk ? highRiskDetected / expectedHighRisk : 1, falsePositives, evidenceBacked, runtimeMs, limitations: results.flatMap((r) => r.limitations || []), perCase };
}

export async function evaluateAll() {
  const cases = await manifest();
  const baselineResults = [];
  const finalResults = [];
  const startBaseline = Date.now();
  for (const c of cases) baselineResults.push(await baselineAudit(join(process.cwd(), "fixtures", c.caseId), c.caseId));
  const baseline = score("baseline", cases, baselineResults, Date.now() - startBaseline);
  const startFinal = Date.now();
  for (const c of cases) finalResults.push(await auditTarget(join(process.cwd(), "fixtures", c.caseId), c.caseId));
  const final = score("final", cases, finalResults, Date.now() - startFinal);
  await mkdir(join(process.cwd(), "reports"), { recursive: true });
  await writeFile(join(process.cwd(), "reports", "evaluation.json"), JSON.stringify({ baseline, final, cases, baselineResults, finalResults }, null, 2));
  return { baseline, final };
}

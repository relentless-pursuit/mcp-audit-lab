import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { runStaticAudit } from "../staticAudit.js";
import { baselineAudit } from "../baseline.js";
import { classifyProcessEvent } from "../dynamicAudit.js";
import { defaultPolicy } from "../policy.js";
import { score } from "../evaluate.js";

const root = join(process.cwd(), "fixtures");
test("static audit identifies process execution in the shell fixture", async () => {
  const findings = await runStaticAudit(join(root, "case-04-shell-exec"));
  assert.ok(findings.some((f) => f.category === "process_execution"));
});
test("baseline does not execute the server", async () => {
  const result = await baselineAudit(join(root, "case-05-secret-env"), "case-05-secret-env");
  assert.equal(result.sandbox.mode, "unavailable");
  assert.equal(result.target, "$PROJECT_ROOT/fixtures/case-05-secret-env");
  assert.ok(result.limitations.some((x) => x.includes("does not execute")));
});
test("runtime classification distinguishes shell strings from direct argument arrays", () => {
  const shell = classifyProcessEvent({ type: "process_exec", operation: "execSync", executable: "kubectl get pods", arguments: [], shell: true }, defaultPolicy);
  assert.equal(shell.severity, "critical");
  assert.equal(shell.title, "Shell-interpreted process execution");

  const approved = classifyProcessEvent(
    { type: "process_exec", operation: "execFileSync", executable: "kubectl", arguments: ["get", "pods"], shell: false },
    { ...defaultPolicy, allowedProcessExecutables: ["kubectl"] }
  );
  assert.equal(approved.severity, "low");
  assert.equal(approved.title, "Approved direct process execution");
  assert.match(approved.evidence[0].value, /\[\"get\",\"pods\"\]/);

  const unapproved = classifyProcessEvent({ type: "process_exec", operation: "spawn", executable: "kubectl", arguments: ["get", "pods"], shell: false }, defaultPolicy);
  assert.equal(unapproved.severity, "medium");
});
test("evaluation matches findings within the correct fixture", () => {
  const cases = [
    { caseId: "expected-shell", name: "", description: "", expectedFindings: [{ category: "process_execution", severity: "critical", titleIncludes: "shell-interpreted" }] },
    { caseId: "safe", name: "", description: "", expectedFindings: [] }
  ] as any;
  const shellFinding = { category: "process_execution", severity: "critical", title: "Shell-interpreted process execution", evidence: [{ kind: "trace", value: "fixture-b" }] };
  const result = score("test", cases, [{ findings: [] }, { findings: [shellFinding], limitations: [] }], 0);
  assert.equal(result.highRiskDetected, 0);
  assert.equal(result.falsePositives, 1);
  assert.deepEqual(result.perCase?.map((item) => item.missed), [["process_execution: shell-interpreted"], []]);
});

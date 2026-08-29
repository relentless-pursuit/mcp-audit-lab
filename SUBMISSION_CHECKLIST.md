# Final submission and compliance checklist

This checklist follows the official hackathon PDF. Items marked “submission action” require the participant to complete work outside the local project.

## Four required deliverables

- [x] Complete solution code is present.
- [x] Agent-shaping instructions are present in `AGENT_INSTRUCTIONS.md`.
- [x] README identifies the user, bottleneck and practical value.
- [x] A clearly labeled improvement changelog records meaningful iterations, evidence, decisions, a removed experiment, the main failure mode and hot take.
- [x] Clean-environment reproduction guide includes solution, baseline and evaluation commands, required data, versions, approximate runtime, cost and expected output.
- [x] Five-minute video script begins with the problem and baseline, demonstrates a realistic execution, shows the final comparison and changelog, and highlights the most valuable change and one removed experiment.
- [ ] Record a video no longer than five minutes. **Submission action.**
- [ ] Upload the video and add its accessible URL here: `________________`. **Submission action.**
- [x] Representative sanitized trajectory is included for the single audit agent, including instructions, tool responses, feedback, retry and human checkpoints.

## Official ground rules

- [x] Tools and components used are identified; external audit targets are not presented as project code.
- [x] README provenance states what was created for the hackathon and what is external.
- [x] The workflow uses public or synthetic data only.
- [x] No real credentials or private information are required or included.
- [x] Consequential target execution is isolated in a sandbox; installation approval remains a human decision.
- [x] A qualified human reviewer is required before a real installation or policy exception.
- [x] The use case is legal, defensive and directed at repositories the reviewer is authorized to inspect.
- [x] Result claims link to submitted reports and machine-readable evidence.
- [x] A clean-environment reproduction path is documented.
- [ ] Confirm licenses and service terms once more immediately before submission. **Submission action.**

## Rubric self-check: 100 points

### Problem & User Value - 15 points

- [x] Intended user: developer, security reviewer or platform engineer considering a third-party local MCP server.
- [x] Bottleneck: claimed capabilities do not establish actual behavior; manual review is slow and inconsistent.
- [x] Practical value: evidence supports reject, investigate or approve decisions before installation.

### Agent Solution & Engineering - 30 points

- [x] Agent responsibilities and decision rules are explicit.
- [x] Tools are purposeful: quarantine preparation, static inventory, sandboxed MCP probe and evidence verifier.
- [x] Process execution classification distinguishes shell strings from direct argument arrays.
- [x] Failure recovery and human checkpoints are documented.
- [x] `npm test` passes all four tests.

### End-to-End Quality - 20 points

- [x] Public repository preparation completes.
- [x] MCP protocol initializes for both tested versions.
- [x] Twenty-one tools are discovered and probed.
- [x] Markdown and JSON reports are produced.
- [x] Output gives an actionable result plus limitations rather than a bare risk score.

### Measured Improvement - 15 points

- [x] One primary metric is defined: high-risk finding recall.
- [x] Baseline and final workflow use the same ten cases.
- [x] Final evaluation detects 7/7 expected high-risk findings; baseline detects 0/7.
- [x] Safe fixtures have zero unexpected high-risk findings.
- [x] One difficult hidden-write case is included and explained.
- [x] Changelog connects iterations to evidence and decisions.

### Reproducibility - 15 points

- [x] Exact local setup, baseline, evaluation, preparation and audit commands are documented.
- [x] Recorded versions, data requirements, expected outputs, approximate runtime and cost are documented.
- [x] Repository tags and commits are pinned in comparison evidence.
- [x] Complete repository published at https://github.com/relentless-pursuit/mcp-audit-lab.
- [x] Tested the published repository once from a clean clone: `npm ci` and 4/4 tests pass.

### Hot Take / Insights - 5 points

- [x] Main failure mode is explicit: static capability signals can over-report while synthetic runtime probes can miss unexercised branches.
- [x] Practical insight is explicit: reproducible evidence paths are more useful than opaque MCP risk scores.

## Final portal check

- [ ] Confirm the repository is accessible to judges without requesting permission.
- [ ] Confirm the video link opens in a logged-out/private browser window.
- [ ] Confirm all submission-form fields are complete.
- [ ] Confirm no credential, private path or personal data appears in committed files or video frames.
- [ ] Submit before the deadline shown on the official HackerEarth challenge page.

# Five-minute solution video script

Target length: 4 minutes 45 seconds. Record the terminal at a readable zoom. Use prepared public targets during recording so downloads do not consume the video.

## 0:00-0:35 - Problem and user

On screen: [README - Problem and intended user](README.md#problem-and-intended-user).

Say:

> Local MCP servers run with the user's privileges and may touch files, credentials, networks and subprocesses. A developer considering a third-party server cannot learn enough from its README or tool list, and manually reviewing unfamiliar code is slow and inconsistent. MCP Audit Lab gives that developer an evidence-backed pre-install report before the server reaches a real MCP client.

## 0:35-1:05 - Simple baseline

On screen:

```bash
npm run baseline -- fixtures/case-05-secret-env case-05-secret-env
```

Open the [baseline report](reports/baseline.md).

Say:

> The fair baseline reads documentation and tool-catalog text without executing the server. Across ten predefined cases it detects zero of seven high-risk behaviors. It is safe and inexpensive, but it cannot see hidden runtime behavior.

## 1:05-1:45 - Agent workflow and safety

On screen: [README architecture diagram](README.md#what-the-audit-agent-does), then the Docker command in a JSON report.

Say:

> The audit agent first inventories source capabilities. It then refuses to run the target unless Docker is available. Inside Docker the target has no network, a read-only mount, no credentials, dropped capabilities and strict resource limits. The agent initializes MCP, discovers tools, calls each with synthetic inputs, records behavior and verifies every finding against policy. This project uses one audit agent; the scanners and probe are its tools.

## 1:45-2:50 - Realistic vulnerable execution

On screen:

```bash
npm run audit -- \
  /tmp/mcp-quarantine-k8s-v249/source \
  kubernetes-v249 \
  --allow-executable kubectl \
  --command node dist/index.js
```

Open the [v2.4.9 audit report](reports/kubernetes-v249-audit.md) and show one static `execSync` line and one runtime trace.

Say:

> This is version 2.4.9 of a public Kubernetes MCP server. The protocol initializes and exposes 21 tools. Direct kubectl execution is expected and explicitly allowed, but shell execution is not. The auditor finds 23 shell-based source sites and confirms 14 shell command attempts during probing. Here is the evidence: execSync receives a complete command string containing schema-derived tool input. There are no real credentials, kubectl binary or cluster connection in the sandbox.

## 2:50-3:35 - Patched comparison

Open the [vulnerable/patched comparison](reports/kubernetes-version-comparison.md), then the [v2.5.0 audit report](reports/kubernetes-v250-audit.md) for runtime evidence.

Say:

> Against patched version 2.5.0, the same policy, tools and probe produce zero static shell sites and zero runtime shell attempts. The trace now shows execFileSync with the executable separated from its argument array. Kubectl is low-severity approved evidence. Helm remains a medium review item because I did not allowlist it. The project therefore distinguishes this remediation without claiming the entire patched server is safe.

## 3:35-4:10 - Measured improvement

On screen: the [evaluation report](reports/evaluation.md).

Say:

> The primary metric is high-risk finding recall. Expectations are fixed in advance and matched within each fixture. The baseline scores zero of seven. The final workflow scores seven of seven with zero unexpected high-risk findings, including a difficult case with a hidden conditional write. The complete results, failures and evidence are included.

## 4:10-4:40 - Changelog and learning

On screen: the [improvement changelog](CHANGELOG.md), showing the runtime refinement and removed experiment rows.

Say:

> The largest improvement was policy-aware runtime verification. An earlier version called every subprocess critical, so it could not distinguish expected kubectl behavior from shell injection. Recording the executable, arguments and shell status fixed that. I also rejected unrestricted host execution: an audit agent must fail closed when isolation is unavailable.

## 4:40-4:55 - Hot take and close

On screen: the [README hot take](README.md#hot-take) and report links.

Say:

> My hot take is that an MCP risk score is less valuable than the shortest reproducible path from a claim to evidence. This MVP does not certify arbitrary servers, but it gives a reviewer a concrete, repeatable basis for the next decision.

## Recording checklist

- Keep the video at or below five minutes.
- Show one realistic run from command to usable report.
- Show the baseline/final table and vulnerable/patched comparison.
- Mention the most valuable change and the removed host-execution experiment.
- Do not show the host username, private paths, credentials, notifications or unrelated applications.
- Add the final video URL to `SUBMISSION_CHECKLIST.md` and the submission form.

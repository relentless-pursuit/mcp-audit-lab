# Evaluation report

## Objective

Measure whether MCP Audit Lab finds known high-risk behavior with reproducible evidence, and whether it distinguishes a documented vulnerable implementation from its patched replacement.

## Synthetic fixture evaluation

Both methods were evaluated against the same ten local fixtures. Seven high-risk findings were defined in advance in `fixtures/manifest.json`.

| Method | High-risk findings detected | Recall | High-risk false positives |
|---|---:|---:|---:|
| Documentation/tool-catalog baseline | 0/7 | 0% | 0 |
| Static analysis plus sandboxed runtime probe | 7/7 | 100% | 0 |

Expected findings are matched only within their own fixture; a finding from one case cannot satisfy another case. Every safe fixture produced zero unexpected high-risk findings. The final method retained trace or file evidence for every reported signal. Detailed machine-readable results, including every per-case result, are in `reports/evaluation.json`.

## Public vulnerable/patched evaluation

Target: `Flux159/mcp-server-kubernetes`, using pinned tags and commits.

Policy: direct invocation of `kubectl` was approved because it is part of the server's documented purpose. Shell interpretation was prohibited. `helm` was not allowlisted.

| Version | Static shell sites | Confirmed runtime shell attempts | Direct runtime classification | Command-injection result |
|---|---:|---:|---|---|
| `v2.4.9` | 23 | 14 | One approved `kubectl` call | Fail |
| `v2.5.0` | 0 | 0 | One approved `kubectl` call; one medium `helm` review item | Pass |

The vulnerable version used shell-interpreted `execSync` command strings. The patched version used direct `execFileSync` calls with argument arrays. This is the behavior the evaluation intended to distinguish.

## Safety conditions

- Source acquisition and dependency installation occurred in disposable preparation containers.
- Lifecycle scripts were disabled during dependency installation.
- The build ran without network access.
- Runtime probes ran with no network, a read-only target mount, dropped Linux capabilities and no real credentials.
- The preload guard records Node process, filesystem and network calls; it is not a kernel-level monitor.

## Interpretation

The results show detection of the tested behaviors, not proof that arbitrary MCP servers are safe. The fixture set is synthetic and small, static rules can over-report capabilities, and the runtime probe cannot exercise every input-dependent branch.

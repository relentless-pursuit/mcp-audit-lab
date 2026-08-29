# Reproduction guide

This guide assumes a clean machine and no access to the original developer's filesystem.

## Requirements

- Node.js 20 or newer. The recorded run used Node.js `22.9.0`.
- npm. The recorded run used npm `10.8.3`.
- Docker Desktop or Docker Engine with a running daemon. The recorded run used Docker `28.3.2`.
- Internet access for initial npm installation, Docker image pulls and public repository acquisition.
- Approximately 2 GB of free disk space for Docker images and two prepared repository copies.
- Enough Docker memory for a preparation container with a 1 GB `/tmp` limit.

No API key, Kubernetes credential, kubeconfig or paid service is required. The measured monetary cost is `$0`; runtime varies with Docker image and npm download speed.

## 1. Install and verify the project

After downloading or cloning the submission, open the project directory:

```bash
git clone https://github.com/relentless-pursuit/mcp-audit-lab.git
cd mcp-audit-lab
npm ci
npm test
```

Expected result: four tests pass. Docker is not required for compilation and unit tests.

## 2. Reproduce the baseline and fixture evaluation

Run one baseline example:

```bash
npm run baseline -- fixtures/case-05-secret-env case-05-secret-env
```

Expected result: the baseline does not execute the target and records that limitation in `reports/baseline.md` and `reports/baseline.json`.

Run the complete evaluation:

```bash
npm run evaluate
```

Expected result on the included ten fixtures:

- baseline high-risk recall: `0/7`;
- final high-risk recall: `7/7`;
- final high-risk false positives: `0`;
- safe fixtures: no unexpected high-risk findings.

The recorded evaluation took approximately 12 seconds after Docker images were available. Results are written to `reports/evaluation.json`.

## 3. Reproduce the public vulnerable/patched comparison

The following directories must not already exist. They contain only disposable public-repository copies.

Prepare the documented vulnerable version:

```bash
npm run prepare-repo -- \
  https://github.com/Flux159/mcp-server-kubernetes.git \
  v2.4.9 \
  /tmp/mcp-audit-repro-v249
```

Prepare the patched version:

```bash
npm run prepare-repo -- \
  https://github.com/Flux159/mcp-server-kubernetes.git \
  v2.5.0 \
  /tmp/mcp-audit-repro-v250
```

Preparation uses network only for clone and dependency download, disables npm lifecycle scripts and builds without network. Each prepared directory was approximately 145 MB in the recorded run. Preparation typically takes one to several minutes depending on cache and network speed.

Audit the vulnerable version:

```bash
npm run audit -- \
  /tmp/mcp-audit-repro-v249/source \
  kubernetes-v249 \
  --allow-executable kubectl \
  --command node dist/index.js

cp reports/audit.json reports/kubernetes-v249-audit.json
cp reports/audit.md reports/kubernetes-v249-audit.md
```

Audit the patched version:

```bash
npm run audit -- \
  /tmp/mcp-audit-repro-v250/source \
  kubernetes-v250 \
  --allow-executable kubectl \
  --command node dist/index.js

cp reports/audit.json reports/kubernetes-v250-audit.json
cp reports/audit.md reports/kubernetes-v250-audit.md
```

Expected comparison:

| Version | MCP tools discovered | Static shell sites | Confirmed runtime shell attempts |
|---|---:|---:|---:|
| `v2.4.9` | 21 | 23 | 14 |
| `v2.5.0` | 21 | 0 | 0 |

The patched version should also record a low-severity approved direct `kubectl` call and a medium-severity direct `helm` review item. `helm` is intentionally not allowlisted.

## 4. Inspect the evidence

Open:

- `reports/evaluation.md` for the benchmark summary;
- `reports/kubernetes-version-comparison.md` for the public comparison;
- `reports/kubernetes-v249-audit.md` for vulnerable source lines and runtime shell strings;
- `reports/kubernetes-v250-audit.md` for direct executable/argument-array evidence;
- the corresponding JSON files for machine-readable results and raw traces.

## Safety notes

The runtime target is mounted read-only and runs with no network, no credentials, dropped capabilities and resource limits. The Node preload observer records calls but is not a kernel-level security monitor. The audit image intentionally lacks `kubectl`, `helm` and a kubeconfig, so public test probes cannot affect a cluster.

Do not adapt these commands to mount a home directory, credential directory, Docker socket or production configuration. A human must review the evidence before any real installation decision.

## Known reproduction limits

- Exact preparation time depends on the network and Docker cache.
- Public tags are pinned to commits in the generated preparation metadata, but a future repository outage can prevent a fresh clone.
- The synthetic probe may not reach behavior requiring specific domain inputs.
- The result demonstrates the tested command-injection distinction; it does not certify either repository version as otherwise safe.

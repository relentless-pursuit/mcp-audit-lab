# Sanitized agent trajectory: Kubernetes MCP comparison

This is the representative trajectory for the project's single audit workflow agent. Docker preparation, static scanning, the MCP client probe and the verifier are tools used by this agent, not additional agents.

No credentials, kubeconfig, personal data or host home path is included. Local paths are replaced with `$QUARANTINE_ROOT` and `$PROJECT_ROOT`.

## Agent instruction

Audit the public TypeScript/Node MCP server at a pinned version. Do not run untrusted repository code directly on the host. Use no real credentials or external network during the target audit. Discover its MCP tools, probe with synthetic inputs, verify observed behavior against policy and produce evidence a human can reproduce.

Policy for this comparison:

- reads allowed only from the target and harness mounts;
- writes allowed only under the container's `/tmp`;
- target network disabled;
- no private environment variables;
- direct `kubectl` execution allowed;
- shell-interpreted execution disallowed;
- `helm` not allowlisted.

## Trajectory

### 1. Scope and human checkpoint

Decision: accept `Flux159/mcp-server-kubernetes` because it is public, its TypeScript/Node source is available and tagged versions `v2.4.9` and `v2.5.0` provide a documented before/after comparison.

Human checkpoint: the user selected local `stdio` MCP servers as the scope and approved this public repository for sandboxed testing. No production cluster or credentials were supplied.

### 2. Quarantine preparation

Tool request:

```text
prepare(repository, pinned_tag, disposable_directory)
```

First response:

```text
dependency installation failed: ENOSPC in preparation container /tmp
```

Feedback and retry: inspection showed Docker storage was available but the preparation container limited `/tmp` to 128 MB. The agent increased only that disposable preparation limit to 1 GB and restarted from a fresh quarantine directory.

Successful response:

```text
v2.4.9 commit: e4a68628c53a408dc8b94de415cf935855979662
v2.5.0 commit: 8a2ef4e5fdfbcd852e080b3fd822821434682735
dependencies installed with lifecycle scripts disabled
build completed with network disabled
```

### 3. Static inventory

Agent decision: classify a source reference as a capability signal unless the code uses a shell-interpreting primitive. Generic direct process, filesystem, environment and network capabilities remain review-level. `execSync` command construction is critical under the comparison policy.

Tool response:

```text
v2.4.9: 23 shell-interpreted process-execution sites
v2.5.0: 0 shell-interpreted process-execution sites
```

Representative vulnerable evidence:

```text
operation: execSync
command shape: kubectl scale ... --namespace=<tool input>
```

Representative patched shape:

```text
operation: execFileSync
executable: kubectl
arguments: ["scale", ..., "--namespace", <tool input>]
```

### 4. Sandbox selection

Agent decision: use Docker because the target is untrusted; refuse any host fallback.

Tool response, sanitized:

```text
network: none
target mount: read-only
capabilities: all dropped
no-new-privileges: enabled
memory: 256 MB
CPU: 1
process limit: 64
temporary filesystem: 64 MB, noexec, nosuid
credentials: none
```

### 5. MCP protocol probe

Tool request:

```text
initialize -> tools/list -> one schema-derived synthetic call per tool
```

Tool response for both versions:

```text
protocol initialized: yes
tools discovered: 21
cleanup, kubectl_get, kubectl_describe, kubectl_apply,
kubectl_delete, kubectl_create, kubectl_logs, kubectl_scale,
kubectl_patch, kubectl_rollout, kubectl_context, explain_resource,
install_helm_chart, upgrade_helm_chart, uninstall_helm_chart,
port_forward, stop_port_forward, exec_in_pod, list_api_resources,
kubectl_generic, ping
```

The probe used values such as `audit`, numeric value `1`, `/app/sample.txt` and a localhost URL. Tool failures were retained; the probe continued where possible.

### 6. Runtime verification

v2.4.9 tool response:

```json
{
  "operation": "execSync",
  "executable": "kubectl scale audit audit --replicas=1 --namespace=audit",
  "arguments": [],
  "shell": true
}
```

Verifier feedback:

```text
critical: shell-interpreted process execution
14 distinct runtime shell attempts retained with trace evidence
```

v2.5.0 tool response:

```json
{
  "operation": "execFileSync",
  "executable": "kubectl",
  "arguments": ["get", "audit", "audit", "-n", "audit"],
  "shell": false
}
```

Verifier feedback:

```text
low: approved direct process execution for kubectl
medium: direct helm execution requires review because helm is not allowlisted
0 runtime shell attempts
```

### 7. Final decision

For the tested command-injection issue:

- `v2.4.9`: fail, supported by 23 static sites and 14 confirmed runtime shell attempts.
- `v2.5.0`: pass this specific check, supported by zero static sites and zero runtime shell attempts.

Human checkpoint: a qualified reviewer must still decide whether `helm` should be allowed and whether the server is acceptable overall. The agent does not install either version or call a real Kubernetes cluster.

## What changed after feedback

The first runtime classifier labeled every subprocess call critical, causing the patched version's expected direct `kubectl` call to look equivalent to the vulnerable shell command. The verifier was revised to capture the operation, executable, arguments and shell status, and to apply an explicit executable allowlist. The final comparison preserved the vulnerable finding while removing that misleading equivalence.

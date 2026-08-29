# Kubernetes MCP vulnerable/patched comparison

## Scope

The source was acquired and prepared in disposable Docker containers from the public `Flux159/mcp-server-kubernetes` repository. Both versions were then launched in a no-network, read-only audit container with no credentials. The preload guard records process calls. Container isolation, absent credentials and absent `kubectl`/`helm` binaries prevent the probes from affecting a real cluster or the host.

## Results

| Version | Pinned commit | Static shell sites | Confirmed runtime shell attempts | Direct runtime attempts | Command-injection result |
|---|---|---:|---:|---:|---|
| `v2.4.9` | `e4a68628c53a408dc8b94de415cf935855979662` | 23 | 14 | 1 approved `kubectl` call | Fail |
| `v2.5.0` | `8a2ef4e5fdfbcd852e080b3fd822821434682735` | 0 | 0 | 1 approved `kubectl` call; 1 unapproved `helm` review item | Pass |

The vulnerable version builds commands such as `kubectl scale ... --namespace=${namespace}` and passes the resulting string to `execSync`. The patched version passes an argument array to `execFileSync`.

The vulnerable version produced runtime traces containing complete shell command strings. The patched version produced structured direct calls, including `execFileSync("kubectl", ["get", ...])`, with no shell interpretation. `kubectl` was explicitly approved because invoking it is part of this server's documented job. `helm` was not approved and remains a medium-severity review item.

This result demonstrates that the auditor can distinguish this documented command-injection remediation. It does not prove that either version is otherwise safe.

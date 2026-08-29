# MCP Audit Report

- Target: `/tmp/mcp-quarantine-k8s-v250/source`
- Case: `kubernetes-v250`
- Generated: 2026-08-29T14:12:05.632Z
- Sandbox: **docker**
- Protocol initialized: **yes**
- Tools discovered: `cleanup`, `kubectl_get`, `kubectl_describe`, `kubectl_apply`, `kubectl_delete`, `kubectl_create`, `kubectl_logs`, `kubectl_scale`, `kubectl_patch`, `kubectl_rollout`, `kubectl_context`, `explain_resource`, `install_helm_chart`, `upgrade_helm_chart`, `uninstall_helm_chart`, `port_forward`, `stop_port_forward`, `exec_in_pod`, `list_api_resources`, `kubectl_generic`, `ping`

## Findings

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: ADVANCED_README.md:5

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/config/max-buffer.ts:2

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/index.ts:65

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/index.ts:66

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/index.ts:68

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/index.ts:495

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/helm-operations.ts:1

### MEDIUM: Filesystem mutation capability

The source references a filesystem mutation primitive; runtime policy must verify the path.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/helm-operations.ts:2

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/helm-operations.ts:100

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/helm-operations.ts:104

### MEDIUM: Filesystem mutation capability

The source references a filesystem mutation primitive; runtime policy must verify the path.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/helm-operations.ts:147

### MEDIUM: Filesystem mutation capability

The source references a filesystem mutation primitive; runtime policy must verify the path.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/helm-operations.ts:200

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-apply.ts:2

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-apply.ts:97

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-apply.ts:100

### MEDIUM: Filesystem mutation capability

The source references a filesystem mutation primitive; runtime policy must verify the path.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-apply.ts:106

### MEDIUM: Filesystem mutation capability

The source references a filesystem mutation primitive; runtime policy must verify the path.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-apply.ts:124

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:2

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:74

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:77

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:114

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:117

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:127

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:130

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:135

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:141

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:236

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:242

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:271

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:274

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-create.ts:2

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-create.ts:428

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-create.ts:431

### MEDIUM: Filesystem mutation capability

The source references a filesystem mutation primitive; runtime policy must verify the path.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-create.ts:437

### MEDIUM: Filesystem mutation capability

The source references a filesystem mutation primitive; runtime policy must verify the path.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-create.ts:455

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-delete.ts:2

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-delete.ts:149

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-delete.ts:152

### MEDIUM: Filesystem mutation capability

The source references a filesystem mutation primitive; runtime policy must verify the path.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-delete.ts:158

### MEDIUM: Filesystem mutation capability

The source references a filesystem mutation primitive; runtime policy must verify the path.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-delete.ts:176

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-describe.ts:2

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-describe.ts:66

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-describe.ts:69

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-generic.ts:2

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-generic.ts:119

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-generic.ts:122

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-get.ts:2

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-get.ts:148

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-get.ts:151

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-logs.ts:2

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-logs.ts:105

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-logs.ts:108

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-logs.ts:147

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-logs.ts:150

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-logs.ts:213

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-logs.ts:216

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-logs.ts:313

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-logs.ts:316

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-logs.ts:356

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-logs.ts:359

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-operations.ts:1

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-operations.ts:72

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-operations.ts:75

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-patch.ts:2

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-patch.ts:117

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-patch.ts:120

### MEDIUM: Filesystem mutation capability

The source references a filesystem mutation primitive; runtime policy must verify the path.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-patch.ts:126

### MEDIUM: Filesystem mutation capability

The source references a filesystem mutation primitive; runtime policy must verify the path.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-patch.ts:144

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-rollout.ts:2

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-rollout.ts:106

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-rollout.ts:110

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-rollout.ts:124

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-rollout.ts:127

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-scale.ts:2

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-scale.ts:60

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-scale.ts:63

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/port_forward.ts:1

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/port_forward.ts:5

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/port_forward.ts:11

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:25

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:69

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:79

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:86

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:88

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:91

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:122

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:131

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:140

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:141

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:142

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:143

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:151

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:158

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:163

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:170

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:178

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:186

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:187

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:192

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:216

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:221

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:332

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:360

### MEDIUM: Filesystem mutation capability

The source references a filesystem mutation primitive; runtime policy must verify the path.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/kubernetes-manager.ts:366

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/sse.ts:34

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/utils/sse.ts:41

### LOW: Approved direct process execution

The server directly invoked the policy-approved executable kubectl without shell interpretation.

Source: dynamic; confidence: confirmed

Evidence:
- trace: {"type":"process_exec","operation":"execFileSync","executable":"kubectl","arguments":["get","audit","audit","-n","audit","-l","audit","--field-selector=audit"],"shell":false}

### MEDIUM: Direct process execution requires review

The server directly invoked helm without shell interpretation, but that executable was not explicitly approved by policy.

Source: dynamic; confidence: confirmed

Evidence:
- trace: {"type":"process_exec","operation":"execFileSync","executable":"helm","arguments":["repo","add","audit","audit"],"shell":false}

## Agent trajectory

- **inventory**: Collected 106 static signals before execution. (evidence: Process execution capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Process execution capability; Filesystem mutation capability; Process execution capability; Environment-variable access capability; Filesystem mutation capability; Filesystem mutation capability; Process execution capability; Process execution capability; Environment-variable access capability; Filesystem mutation capability; Filesystem mutation capability; Process execution capability; Process execution capability; Environment-variable access capability; Process execution capability; Environment-variable access capability; Process execution capability; Environment-variable access capability; Process execution capability; Environment-variable access capability; Process execution capability; Environment-variable access capability; Process execution capability; Environment-variable access capability; Process execution capability; Process execution capability; Environment-variable access capability; Filesystem mutation capability; Filesystem mutation capability; Process execution capability; Process execution capability; Environment-variable access capability; Filesystem mutation capability; Filesystem mutation capability; Process execution capability; Process execution capability; Environment-variable access capability; Process execution capability; Process execution capability; Environment-variable access capability; Process execution capability; Process execution capability; Environment-variable access capability; Process execution capability; Process execution capability; Environment-variable access capability; Process execution capability; Environment-variable access capability; Process execution capability; Environment-variable access capability; Process execution capability; Environment-variable access capability; Process execution capability; Environment-variable access capability; Process execution capability; Process execution capability; Environment-variable access capability; Process execution capability; Process execution capability; Environment-variable access capability; Filesystem mutation capability; Filesystem mutation capability; Process execution capability; Process execution capability; Environment-variable access capability; Process execution capability; Environment-variable access capability; Process execution capability; Process execution capability; Environment-variable access capability; Process execution capability; Process execution capability; Process execution capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Filesystem mutation capability; Environment-variable access capability; Environment-variable access capability)
- **sandbox**: Selected Docker sandbox because the target is untrusted. (evidence: docker run --rm --network none --read-only --cap-drop ALL --security-opt no-new-privileges --pids-limit 64 --memory 256m --cpus 1 --tmpfs /tmp:rw,noexec,nosuid,size=64m -v $TARGET_ROOT:/app:ro -v $HARNESS_ROOT:/harness:ro -w /app -e AUDIT_CASE_ID -e MCP_RUNTIME_PATH=/harness/mcp-runtime.cjs -e MCP_SERVER_COMMAND -e PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin node:24-alpine node /harness/probe.cjs /app)
- **probe**: Probed 21 discovered MCP tools with safe example arguments. (evidence: cleanup, kubectl_get, kubectl_describe, kubectl_apply, kubectl_delete, kubectl_create, kubectl_logs, kubectl_scale, kubectl_patch, kubectl_rollout, kubectl_context, explain_resource, install_helm_chart, upgrade_helm_chart, uninstall_helm_chart, port_forward, stop_port_forward, exec_in_pod, list_api_resources, kubectl_generic, ping)
- **verify**: Retained 2 runtime findings with trace evidence. (evidence: Approved direct process execution; Direct process execution requires review)

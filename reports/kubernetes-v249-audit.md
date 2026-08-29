# MCP Audit Report

- Target: `/tmp/mcp-quarantine-k8s-v249/source`
- Case: `kubernetes-v249`
- Generated: 2026-08-29T14:12:02.838Z
- Sandbox: **docker**
- Protocol initialized: **yes**
- Tools discovered: `cleanup`, `kubectl_get`, `kubectl_describe`, `kubectl_apply`, `kubectl_delete`, `kubectl_create`, `kubectl_logs`, `kubectl_scale`, `kubectl_patch`, `kubectl_rollout`, `kubectl_context`, `explain_resource`, `install_helm_chart`, `upgrade_helm_chart`, `uninstall_helm_chart`, `port_forward`, `stop_port_forward`, `exec_in_pod`, `list_api_resources`, `kubectl_generic`, `ping`

## Findings

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/index.ts:66

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/index.ts:474

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

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/helm-operations.ts:94

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/helm-operations.ts:97

### MEDIUM: Filesystem mutation capability

The source references a filesystem mutation primitive; runtime policy must verify the path.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/helm-operations.ts:130

### MEDIUM: Filesystem mutation capability

The source references a filesystem mutation primitive; runtime policy must verify the path.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/helm-operations.ts:174

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-apply.ts:2

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-apply.ts:93

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-apply.ts:93

### MEDIUM: Filesystem mutation capability

The source references a filesystem mutation primitive; runtime policy must verify the path.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-apply.ts:98

### MEDIUM: Filesystem mutation capability

The source references a filesystem mutation primitive; runtime policy must verify the path.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-apply.ts:116

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:2

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:69

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:69

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:105

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:105

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:114

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:114

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:118

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:118

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:204

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:204

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:228

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-context.ts:228

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-create.ts:2

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-create.ts:395

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-create.ts:395

### MEDIUM: Filesystem mutation capability

The source references a filesystem mutation primitive; runtime policy must verify the path.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-create.ts:400

### MEDIUM: Filesystem mutation capability

The source references a filesystem mutation primitive; runtime policy must verify the path.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-create.ts:418

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-delete.ts:2

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-delete.ts:137

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-delete.ts:137

### MEDIUM: Filesystem mutation capability

The source references a filesystem mutation primitive; runtime policy must verify the path.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-delete.ts:142

### MEDIUM: Filesystem mutation capability

The source references a filesystem mutation primitive; runtime policy must verify the path.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-delete.ts:160

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-describe.ts:2

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-describe.ts:67

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-describe.ts:67

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-generic.ts:2

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-generic.ts:112

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-generic.ts:116

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-generic.ts:116

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-get.ts:2

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-get.ts:143

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-get.ts:145

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-logs.ts:2

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-logs.ts:104

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-logs.ts:104

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-logs.ts:122

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-logs.ts:122

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-logs.ts:178

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-logs.ts:178

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-logs.ts:267

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-logs.ts:267

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-logs.ts:304

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-logs.ts:304

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-operations.ts:1

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-operations.ts:71

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-operations.ts:71

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-patch.ts:2

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-patch.ts:112

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-patch.ts:112

### MEDIUM: Filesystem mutation capability

The source references a filesystem mutation primitive; runtime policy must verify the path.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-patch.ts:117

### MEDIUM: Filesystem mutation capability

The source references a filesystem mutation primitive; runtime policy must verify the path.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-patch.ts:135

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-rollout.ts:2

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-rollout.ts:97

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-rollout.ts:100

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-rollout.ts:112

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-rollout.ts:112

### MEDIUM: Process execution capability

The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-scale.ts:2

### CRITICAL: Shell-interpreted process execution

The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-scale.ts:52

### MEDIUM: Environment-variable access capability

The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.

Source: static; confidence: confirmed

Evidence:
- file: src/tools/kubectl-scale.ts:52

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

### CRITICAL: Shell-interpreted process execution

The server attempted execSync with a shell-interpreted command string while shell execution was disallowed.

Source: dynamic; confidence: confirmed

Evidence:
- trace: {"type":"process_exec","operation":"execSync","executable":"kubectl get audit audit -n audit -l audit --field-selector=audit","arguments":[],"shell":true}

### CRITICAL: Shell-interpreted process execution

The server attempted execSync with a shell-interpreted command string while shell execution was disallowed.

Source: dynamic; confidence: confirmed

Evidence:
- trace: {"type":"process_exec","operation":"execSync","executable":"kubectl describe audit audit -n audit","arguments":[],"shell":true}

### CRITICAL: Shell-interpreted process execution

The server attempted execSync with a shell-interpreted command string while shell execution was disallowed.

Source: dynamic; confidence: confirmed

Evidence:
- trace: {"type":"process_exec","operation":"execSync","executable":"kubectl apply -f /tmp/manifest-1788012722359.yaml -n audit","arguments":[],"shell":true}

### CRITICAL: Shell-interpreted process execution

The server attempted execSync with a shell-interpreted command string while shell execution was disallowed.

Source: dynamic; confidence: confirmed

Evidence:
- trace: {"type":"process_exec","operation":"execSync","executable":"kubectl delete -f /tmp/delete-manifest-1788012722361.yaml -n audit --grace-period=1","arguments":[],"shell":true}

### CRITICAL: Shell-interpreted process execution

The server attempted execSync with a shell-interpreted command string while shell execution was disallowed.

Source: dynamic; confidence: confirmed

Evidence:
- trace: {"type":"process_exec","operation":"execSync","executable":"kubectl create -f /tmp/create-manifest-1788012722363.yaml -n audit --validate=false -o audit","arguments":[],"shell":true}

### CRITICAL: Shell-interpreted process execution

The server attempted execSync with a shell-interpreted command string while shell execution was disallowed.

Source: dynamic; confidence: confirmed

Evidence:
- trace: {"type":"process_exec","operation":"execSync","executable":"kubectl -n audit get pods --selector=audit -o jsonpath='{.items[*].metadata.name}'","arguments":[],"shell":true}

### CRITICAL: Shell-interpreted process execution

The server attempted execSync with a shell-interpreted command string while shell execution was disallowed.

Source: dynamic; confidence: confirmed

Evidence:
- trace: {"type":"process_exec","operation":"execSync","executable":"kubectl scale audit audit --replicas=1 --namespace=audit","arguments":[],"shell":true}

### CRITICAL: Shell-interpreted process execution

The server attempted execSync with a shell-interpreted command string while shell execution was disallowed.

Source: dynamic; confidence: confirmed

Evidence:
- trace: {"type":"process_exec","operation":"execSync","executable":"kubectl patch audit audit -n audit --type strategic --patch-file /tmp/patch-1788012722373.json","arguments":[],"shell":true}

### CRITICAL: Shell-interpreted process execution

The server attempted execSync with a shell-interpreted command string while shell execution was disallowed.

Source: dynamic; confidence: confirmed

Evidence:
- trace: {"type":"process_exec","operation":"execSync","executable":"kubectl rollout echo audit audit/audit -n audit --timeout=audit","arguments":[],"shell":true}

### CRITICAL: Shell-interpreted process execution

The server attempted execSync with a shell-interpreted command string while shell execution was disallowed.

Source: dynamic; confidence: confirmed

Evidence:
- trace: {"type":"process_exec","operation":"execSync","executable":"kubectl explain --api-version=audit --output=audit audit","arguments":[],"shell":true}

### CRITICAL: Shell-interpreted process execution

The server attempted execSync with a shell-interpreted command string while shell execution was disallowed.

Source: dynamic; confidence: confirmed

Evidence:
- trace: {"type":"process_exec","operation":"execSync","executable":"helm repo add audit audit","arguments":[],"shell":true}

### CRITICAL: Shell-interpreted process execution

The server attempted execSync with a shell-interpreted command string while shell execution was disallowed.

Source: dynamic; confidence: confirmed

Evidence:
- trace: {"type":"process_exec","operation":"execSync","executable":"helm uninstall audit --namespace audit","arguments":[],"shell":true}

### LOW: Approved direct process execution

The server directly invoked the policy-approved executable kubectl without shell interpretation.

Source: dynamic; confidence: confirmed

Evidence:
- trace: {"type":"process_exec","operation":"spawn","executable":"kubectl","arguments":["port-forward","-n","audit","audit/audit","1:1"],"shell":false}

### CRITICAL: Shell-interpreted process execution

The server attempted execSync with a shell-interpreted command string while shell execution was disallowed.

Source: dynamic; confidence: confirmed

Evidence:
- trace: {"type":"process_exec","operation":"execSync","executable":"kubectl api-resources --api-group=audit --namespaced=false -o audit","arguments":[],"shell":true}

### CRITICAL: Shell-interpreted process execution

The server attempted execSync with a shell-interpreted command string while shell execution was disallowed.

Source: dynamic; confidence: confirmed

Evidence:
- trace: {"type":"process_exec","operation":"execSync","executable":"kubectl echo audit echo audit audit audit --namespace=audit -o=audit","arguments":[],"shell":true}

## Agent trajectory

- **inventory**: Collected 103 static signals before execution. (evidence: Environment-variable access capability; Environment-variable access capability; Process execution capability; Filesystem mutation capability; Shell-interpreted process execution; Environment-variable access capability; Filesystem mutation capability; Filesystem mutation capability; Process execution capability; Shell-interpreted process execution; Environment-variable access capability; Filesystem mutation capability; Filesystem mutation capability; Process execution capability; Shell-interpreted process execution; Environment-variable access capability; Shell-interpreted process execution; Environment-variable access capability; Shell-interpreted process execution; Environment-variable access capability; Shell-interpreted process execution; Environment-variable access capability; Shell-interpreted process execution; Environment-variable access capability; Shell-interpreted process execution; Environment-variable access capability; Process execution capability; Shell-interpreted process execution; Environment-variable access capability; Filesystem mutation capability; Filesystem mutation capability; Process execution capability; Shell-interpreted process execution; Environment-variable access capability; Filesystem mutation capability; Filesystem mutation capability; Process execution capability; Shell-interpreted process execution; Environment-variable access capability; Process execution capability; Process execution capability; Shell-interpreted process execution; Environment-variable access capability; Process execution capability; Shell-interpreted process execution; Environment-variable access capability; Process execution capability; Shell-interpreted process execution; Environment-variable access capability; Shell-interpreted process execution; Environment-variable access capability; Shell-interpreted process execution; Environment-variable access capability; Shell-interpreted process execution; Environment-variable access capability; Shell-interpreted process execution; Environment-variable access capability; Process execution capability; Shell-interpreted process execution; Environment-variable access capability; Process execution capability; Shell-interpreted process execution; Environment-variable access capability; Filesystem mutation capability; Filesystem mutation capability; Process execution capability; Shell-interpreted process execution; Environment-variable access capability; Shell-interpreted process execution; Environment-variable access capability; Process execution capability; Shell-interpreted process execution; Environment-variable access capability; Process execution capability; Process execution capability; Process execution capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Environment-variable access capability; Filesystem mutation capability; Environment-variable access capability; Environment-variable access capability)
- **sandbox**: Selected Docker sandbox because the target is untrusted. (evidence: docker run --rm --network none --read-only --cap-drop ALL --security-opt no-new-privileges --pids-limit 64 --memory 256m --cpus 1 --tmpfs /tmp:rw,noexec,nosuid,size=64m -v $TARGET_ROOT:/app:ro -v $HARNESS_ROOT:/harness:ro -w /app -e AUDIT_CASE_ID -e MCP_RUNTIME_PATH=/harness/mcp-runtime.cjs -e MCP_SERVER_COMMAND -e PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin node:24-alpine node /harness/probe.cjs /app)
- **probe**: Probed 21 discovered MCP tools with safe example arguments. (evidence: cleanup, kubectl_get, kubectl_describe, kubectl_apply, kubectl_delete, kubectl_create, kubectl_logs, kubectl_scale, kubectl_patch, kubectl_rollout, kubectl_context, explain_resource, install_helm_chart, upgrade_helm_chart, uninstall_helm_chart, port_forward, stop_port_forward, exec_in_pod, list_api_resources, kubectl_generic, ping)
- **verify**: Retained 15 runtime findings with trace evidence. (evidence: Shell-interpreted process execution; Shell-interpreted process execution; Shell-interpreted process execution; Shell-interpreted process execution; Shell-interpreted process execution; Shell-interpreted process execution; Shell-interpreted process execution; Shell-interpreted process execution; Shell-interpreted process execution; Shell-interpreted process execution; Shell-interpreted process execution; Shell-interpreted process execution; Approved direct process execution; Shell-interpreted process execution; Shell-interpreted process execution)

# MCP Audit Report

- Target: `/tmp/mcp-real-audit.7YqtkW/repo/weather-server-typescript`
- Case: `real-weather-server`
- Generated: 2026-08-29T11:26:54.469Z
- Sandbox: **docker**
- Protocol initialized: **yes**
- Tools discovered: `get-alerts`, `get-forecast`

## Findings

### HIGH: Network capability

The source references an outbound network primitive.

Source: static; confidence: confirmed

Evidence:
- file: build/index.js:13

### HIGH: Network capability

The source references an outbound network primitive.

Source: static; confidence: confirmed

Evidence:
- file: src/index.ts:16

### HIGH: Unexpected network connection

The server attempted to connect to api.weather.gov.

Source: dynamic; confidence: confirmed

Evidence:
- trace: {"type":"network_connect","host":"api.weather.gov","via":"fetch"}

## Agent trajectory

- **inventory**: Collected 2 static signals before execution. (evidence: Network capability; Network capability)
- **sandbox**: Selected Docker sandbox because the target is untrusted. (evidence: docker run --rm --network none --read-only --cap-drop ALL --security-opt no-new-privileges --pids-limit 64 --memory 256m --cpus 1 --tmpfs /tmp:rw,noexec,nosuid,size=64m -v /tmp/mcp-real-audit.7YqtkW/repo/weather-server-typescript:/app:ro -v $HARNESS_ROOT:/harness:ro -w /app -e AUDIT_CASE_ID -e MCP_RUNTIME_PATH=/harness/mcp-runtime.cjs -e MCP_SERVER_COMMAND -e PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin node:24-alpine node /harness/probe.cjs /app)
- **probe**: Probed 2 discovered MCP tools with safe example arguments. (evidence: get-alerts, get-forecast)
- **verify**: Retained 1 runtime findings with trace evidence. (evidence: Unexpected network connection)

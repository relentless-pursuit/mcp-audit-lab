# Agent trajectories

This MVP uses one audit workflow agent, plus deterministic preparation, scanning, probing and verification tools. Its representative sanitized trace is in `kubernetes-comparison.md`.

A complete trace contains:

- The audit policy and target metadata
- The agent’s selected checks
- MCP discovery results
- Static findings and their file locations
- Sandbox probe calls and tool responses
- Runtime events and verifier feedback
- Any retry or human checkpoint
- The final report

The submitted trajectory removes API keys, credentials, personal data, private paths and unrelated logs while retaining enough evidence for a reviewer to follow the path from instructions to result.

const { execSync } = require("node:child_process");
const { startMcpServer } = require(process.env.MCP_RUNTIME_PATH || "../mcp-runtime.cjs");
startMcpServer([{ name: "run_task", description: "Run a task command.", inputSchema: { type: "object", properties: { command: { type: "string" } } }, run: ({ command = "echo audit" }) => ({ content: [{ type: "text", text: execSync(command, { encoding: "utf8" }) }] }) }]);

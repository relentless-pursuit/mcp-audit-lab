const fs = require("node:fs");
const { startMcpServer } = require(process.env.MCP_RUNTIME_PATH || "../mcp-runtime.cjs");
startMcpServer([{ name: "read_sample", description: "Read the supplied sample file only.", inputSchema: { type: "object", properties: { path: { type: "string" } } }, run: () => ({ content: [{ type: "text", text: fs.readFileSync("/app/sample.txt", "utf8") }] }) }]);

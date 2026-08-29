const { startMcpServer } = require(process.env.MCP_RUNTIME_PATH || "../mcp-runtime.cjs");
startMcpServer([{ name: "status", description: "Return status.", inputSchema: { type: "object", properties: {} }, run: () => ({ content: [{ type: "text", text: "ok" }] }) }]);

const { startMcpServer } = require(process.env.MCP_RUNTIME_PATH || "../mcp-runtime.cjs");
startMcpServer([{ name: "add", description: "Add two numbers without side effects.", inputSchema: { type: "object", properties: { a: { type: "number" }, b: { type: "number" } } }, run: ({ a = 1, b = 1 }) => ({ content: [{ type: "text", text: String(Number(a) + Number(b)) }] }) }]);

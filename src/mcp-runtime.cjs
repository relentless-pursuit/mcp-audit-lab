const readline = require("node:readline");
function startMcpServer(tools) {
  const byName = new Map(tools.map((tool) => [tool.name, tool]));
  const rl = readline.createInterface({ input: process.stdin });
  rl.on("line", async (line) => {
    let message; try { message = JSON.parse(line); } catch { return; }
    if (message.id === undefined) return;
    try {
      let result;
      if (message.method === "initialize") result = { protocolVersion: message.params?.protocolVersion || "2025-06-18", capabilities: { tools: {} }, serverInfo: { name: "fixture-mcp", version: "0.1.0" } };
      else if (message.method === "tools/list") result = { tools: tools.map(({ name, description, inputSchema }) => ({ name, description, inputSchema })) };
      else if (message.method === "tools/call") { const tool = byName.get(message.params?.name); if (!tool) throw new Error(`unknown tool: ${message.params?.name}`); result = await tool.run(message.params?.arguments || {}); }
      else if (message.method === "ping") result = {};
      else throw new Error(`unsupported method: ${message.method}`);
      process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id: message.id, result }) + "\n");
    } catch (error) { process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id: message.id, error: { code: -32000, message: String(error.message || error) } }) + "\n"); }
  });
}
module.exports = { startMcpServer };

const { spawn } = require("node:child_process");
const { createInterface } = require("node:readline");
const path = require("node:path");

const target = process.argv[2] || "/target";
const harness = "/harness/preload.cjs";
const commandSpec = JSON.parse(process.env.MCP_SERVER_COMMAND || JSON.stringify(["node", "server.cjs"]));
const command = commandSpec[0];
const commandArgs = commandSpec.slice(1).map((value) => String(value).replace(/^\$TARGET\//, `${target}/`));
const child = spawn(command, commandArgs, {
  cwd: target,
  env: { PATH: process.env.PATH, AUDIT_CASE_ID: process.env.AUDIT_CASE_ID, MCP_RUNTIME_PATH: process.env.MCP_RUNTIME_PATH, MCP_SERVER_COMMAND: process.env.MCP_SERVER_COMMAND, NODE_OPTIONS: `--require=${harness}` },
  stdio: ["pipe", "pipe", "pipe"]
});
const lines = createInterface({ input: child.stdout });
const stderr = [];
child.stderr.on("data", (chunk) => stderr.push(String(chunk)));
const pending = new Map();
let id = 0;
lines.on("line", (line) => {
  try {
    const msg = JSON.parse(line);
    if (pending.has(msg.id)) pending.get(msg.id)(msg);
  } catch {}
});

function request(method, params) {
  return new Promise((resolve, reject) => {
    const requestId = ++id;
    const timer = setTimeout(() => { pending.delete(requestId); reject(new Error(`timeout: ${method}`)); }, 4_000);
    pending.set(requestId, (msg) => {
      clearTimeout(timer); pending.delete(requestId);
      if (msg.error) reject(new Error(JSON.stringify(msg.error))); else resolve(msg.result);
    });
    child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id: requestId, method, params }) + "\n");
  });
}

function exampleValue(schema, key = "") {
  if (!schema) return undefined;
  if (schema.type === "object" || schema.properties) {
    const result = {};
    for (const [name, childSchema] of Object.entries(schema.properties || {})) result[name] = exampleValue(childSchema, name);
    return result;
  }
  if (schema.type === "array") return [];
  if (schema.type === "boolean") return false;
  if (schema.type === "number" || schema.type === "integer") return 1;
  if (/path|file/i.test(key)) return "/app/sample.txt";
  if (/url|uri|endpoint/i.test(key)) return "http://127.0.0.1:9/audit";
  if (/command|cmd|shell/i.test(key)) return "echo audit";
  return "audit";
}

(async () => {
  const calls = [];
  try {
    const initialize = await request("initialize", { protocolVersion: "2026-07-28", capabilities: {}, clientInfo: { name: "mcp-audit-probe", version: "0.1.0" } });
    const listed = await request("tools/list", {});
    for (const tool of listed?.tools || []) {
      try {
        const args = exampleValue(tool.inputSchema || { type: "object", properties: {} });
        const result = await request("tools/call", { name: tool.name, arguments: args });
        calls.push({ tool: tool.name, arguments: args, ok: true, result });
      } catch (error) {
        calls.push({ tool: tool.name, ok: false, error: String(error) });
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
    process.stdout.write(`PROBE_RESULT ${JSON.stringify({ initialize, tools: listed?.tools || [], calls, serverStderr: stderr.join("") })}\n`);
  } catch (error) {
    process.stdout.write(`PROBE_RESULT ${JSON.stringify({ error: String(error), calls, serverStderr: stderr.join("") })}\n`);
  } finally {
    child.kill("SIGTERM");
    lines.close();
  }
})();

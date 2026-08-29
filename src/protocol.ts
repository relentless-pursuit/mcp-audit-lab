import { spawn } from "node:child_process";
import { createInterface } from "node:readline";

export interface RpcResponse { jsonrpc: "2.0"; id: number; result?: any; error?: any }

export async function mcpHandshake(command: string, args: string[], env: NodeJS.ProcessEnv, timeoutMs = 8_000) {
  const child = spawn(command, args, { env, stdio: ["pipe", "pipe", "pipe"] });
  const stderr: string[] = [];
  child.stderr.on("data", (chunk) => stderr.push(String(chunk)));
  const lines = createInterface({ input: child.stdout });
  const pending = new Map<number, (response: RpcResponse) => void>();
  lines.on("line", (line) => {
    try {
      const parsed = JSON.parse(line) as RpcResponse;
      if (typeof parsed.id === "number") pending.get(parsed.id)?.(parsed);
    } catch { /* server logs are ignored; JSON-RPC lines are retained */ }
  });
  let id = 0;
  const request = (method: string, params: unknown) => new Promise<any>((resolve, reject) => {
    const requestId = ++id;
    const timer = setTimeout(() => { pending.delete(requestId); reject(new Error(`timeout waiting for ${method}`)); }, timeoutMs);
    pending.set(requestId, (response) => {
      clearTimeout(timer);
      pending.delete(requestId);
      if (response.error) reject(new Error(JSON.stringify(response.error)));
      else resolve(response.result);
    });
    child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id: requestId, method, params }) + "\n");
  });
  try {
    const initialize = await request("initialize", {
      protocolVersion: "2026-07-28",
      capabilities: {},
      clientInfo: { name: "mcp-audit-lab", version: "0.1.0" }
    });
    const tools = await request("tools/list", {});
    return { initialized: true, tools: tools?.tools ?? [], initialize, stderr: stderr.join("") };
  } finally {
    child.kill("SIGTERM");
    lines.close();
  }
}

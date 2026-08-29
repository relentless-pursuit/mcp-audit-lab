import { readFile } from "node:fs/promises";

export async function targetCommand(root: string): Promise<[string, string[]]> {
  try {
    const config = JSON.parse(await readFile(`${root}/mcp-audit.json`, "utf8"));
    if (Array.isArray(config.command) && typeof config.command[0] === "string") return [config.command[0], config.command.slice(1).map(String)];
  } catch { /* default entrypoint */ }
  return ["node", ["server.cjs"]];
}

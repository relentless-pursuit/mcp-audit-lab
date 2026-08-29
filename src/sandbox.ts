import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { resolve } from "node:path";
const execFileAsync = promisify(execFile);

export interface SandboxRun { mode: "docker" | "unavailable"; stdout: string; stderr: string; command?: string; error?: string }

export async function dockerAvailable(): Promise<boolean> {
  try { await execFileAsync("docker", ["info"], { timeout: 5_000 }); return true; } catch { return false; }
}

export async function runInDocker(targetRoot: string, harnessRoot: string, command: string, args: string[], env: Record<string, string>): Promise<SandboxRun> {
  if (!(await dockerAvailable())) return { mode: "unavailable", stdout: "", stderr: "", error: "Docker daemon is unavailable; refusing unsandboxed execution." };
  const targetMount = resolve(targetRoot);
  const harnessMount = resolve(harnessRoot);
  const dockerArgs = [
    "run", "--rm", "--network", "none", "--read-only", "--cap-drop", "ALL",
    "--security-opt", "no-new-privileges", "--pids-limit", "64", "--memory", "256m", "--cpus", "1",
    "--tmpfs", "/tmp:rw,noexec,nosuid,size=64m", "-v", `${targetMount}:/app:ro`, "-v", `${harnessMount}:/harness:ro`, "-w", "/app",
    "-e", "AUDIT_CASE_ID", "-e", "MCP_RUNTIME_PATH=/harness/mcp-runtime.cjs", "-e", "MCP_SERVER_COMMAND", "-e", "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
    "node:24-alpine", command, ...args
  ];
  const reportCommand = `docker ${dockerArgs.join(" ")}`
    .replaceAll(targetMount, "$TARGET_ROOT")
    .replaceAll(harnessMount, "$HARNESS_ROOT");
  try {
    const result = await execFileAsync("docker", dockerArgs, { env: { ...process.env, ...env }, timeout: 15_000, maxBuffer: 2_000_000 });
    return { mode: "docker", stdout: result.stdout, stderr: result.stderr, command: reportCommand };
  } catch (error: any) {
    return { mode: "docker", stdout: error.stdout ?? "", stderr: error.stderr ?? "", command: reportCommand, error: error.message };
  }
}

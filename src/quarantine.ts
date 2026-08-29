import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export interface QuarantineStep {
  name: string;
  network: "none" | "bridge";
  command: string;
  ok: boolean;
  output?: string;
}

export interface QuarantineResult {
  ok: boolean;
  repository: string;
  ref: string;
  quarantineRoot: string;
  sourceRoot: string;
  steps: QuarantineStep[];
  error?: string;
}

function dockerBase(network: "none" | "bridge", mount: string, image: string): string[] {
  return [
    "run", "--rm", "--network", network, "--read-only", "--cap-drop", "ALL",
    "--security-opt", "no-new-privileges", "--pids-limit", "128", "--memory", "768m", "--cpus", "1",
    "--tmpfs", "/tmp:rw,noexec,nosuid,size=1g", "-v", `${mount}:/work:rw`, "-w", "/work", image,
  ];
}

async function runDocker(args: string[], timeout = 120_000): Promise<{ ok: boolean; output: string; command: string }> {
  const command = `docker ${args.join(" ")}`;
  try {
    const result = await execFileAsync("docker", args, { timeout, maxBuffer: 2_000_000 });
    return { ok: true, output: `${result.stdout}${result.stderr}`.trim(), command };
  } catch (error: any) {
    return { ok: false, output: `${error.stdout ?? ""}${error.stderr ?? ""}${error.message ?? ""}`.trim(), command };
  }
}

/**
 * Fetch and prepare a public repository without running its code on the host.
 * Network is enabled only for source/dependency acquisition. The build is
 * offline and the later MCP audit is always network-isolated.
 */
export async function quarantineRepository(repository: string, ref: string, quarantineRoot: string): Promise<QuarantineResult> {
  if (!/^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\.git)?$/.test(repository)) {
    throw new Error("Only https://github.com/OWNER/REPO(.git) repositories are accepted by the quarantine fetcher.");
  }
  if (!/^[A-Za-z0-9._\/-]+$/.test(ref)) throw new Error("The git ref contains unsupported characters.");
  const root = resolve(quarantineRoot);
  await mkdir(root, { recursive: true });
  const sourceRoot = resolve(root, "source");
  const steps: QuarantineStep[] = [];

  const cloneArgs = [...dockerBase("bridge", root, "alpine/git:latest"), "clone", "--depth", "1", "--branch", ref, repository, "/work/source"];
  const clone = await runDocker(cloneArgs);
  steps.push({ name: "clone", network: "bridge", command: clone.command, ok: clone.ok, output: clone.output });
  if (!clone.ok) return { ok: false, repository, ref, quarantineRoot: root, sourceRoot, steps, error: "Repository clone failed." };

  // Some older vulnerable repositories do not commit a lockfile. `npm install`
  // is used here instead of `npm ci`, but lifecycle scripts remain disabled.
  const installArgs = dockerBase("bridge", root, "node:24-alpine");
  installArgs.splice(installArgs.length - 1, 0, "-e", "npm_config_cache=/tmp/npm-cache");
  installArgs.push("npm", "install", "--ignore-scripts", "--no-audit", "--no-fund", "--prefix", "/work/source");
  const install = await runDocker(installArgs);
  steps.push({ name: "dependency-install", network: "bridge", command: install.command, ok: install.ok, output: install.output });
  if (!install.ok) return { ok: false, repository, ref, quarantineRoot: root, sourceRoot, steps, error: "Dependency installation failed." };

  const buildArgs = [...dockerBase("none", root, "node:24-alpine"), "npm", "run", "build", "--prefix", "/work/source"];
  const build = await runDocker(buildArgs);
  steps.push({ name: "build", network: "none", command: build.command, ok: build.ok, output: build.output });
  if (!build.ok) return { ok: false, repository, ref, quarantineRoot: root, sourceRoot, steps, error: "Offline build failed." };

  const shaArgs = [...dockerBase("none", root, "alpine/git:latest"), "-C", "/work/source", "rev-parse", "HEAD"];
  const sha = await runDocker(shaArgs, 30_000);
  steps.push({ name: "pin-commit", network: "none", command: sha.command, ok: sha.ok, output: sha.output });
  if (!sha.ok) return { ok: false, repository, ref, quarantineRoot: root, sourceRoot, steps, error: "Could not record the fetched commit." };

  return { ok: true, repository, ref, quarantineRoot: root, sourceRoot, steps };
}

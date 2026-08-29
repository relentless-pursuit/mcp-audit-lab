import { readFile, readdir, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import type { Finding } from "./types.js";

async function filesUnder(root: string): Promise<string[]> {
  const out: string[] = [];
  const ignoredDirectories = new Set(["node_modules", ".git", "dist", "coverage", ".cache", ".next", ".github", "docs", "documentation", "test", "tests", "__tests__"]);
  const ignoredFiles = new Set([".gitignore", ".dxtignore", "package-lock.json", "npm-shrinkwrap.json", "yarn.lock", "pnpm-lock.yaml", "bun.lockb"]);
  async function walk(dir: string) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.isFile() && !ignoredFiles.has(entry.name) && !/\.(test|spec)\.[cm]?[jt]sx?$/.test(entry.name)) out.push(full);
    }
  }
  await walk(root);
  return out;
}

function finding(id: string, category: Finding["category"], severity: Finding["severity"], title: string, description: string, file: string, line: number): Finding {
  return { id, category, severity, title, description, source: "static", confidence: "confirmed", evidence: [{ kind: "file", value: `${file}:${line}`, location: file }] };
}

export async function runStaticAudit(root: string): Promise<Finding[]> {
  const findings: Finding[] = [];
  const files = await filesUnder(root);
  for (const file of files) {
    const relativeFile = relative(root, file);
    let text = "";
    try { text = await readFile(file, "utf8"); } catch { continue; }
    const lines = text.split(/\r?\n/);
    lines.forEach((line, index) => {
      const n = index + 1;
      const shellExecution = /\bexecSync\s*\(/.test(line) || /\bshell:\s*true\b/.test(line);
      const processExecution = /\b(child_process|execSync|execFileSync|execFile|spawnSync|spawn)\b/.test(line);
      if (shellExecution) {
        findings.push(finding(`static-shell-${relativeFile}-${n}`, "process_execution", "critical", "Shell-interpreted process execution", "The source invokes a shell-interpreting process primitive; interpolated tool input may become command injection.", relativeFile, n));
      } else if (processExecution) {
        findings.push(finding(`static-process-${relativeFile}-${n}`, "process_execution", "medium", "Process execution capability", "The source references a direct process execution primitive; the runtime audit must check its executable, arguments and policy scope.", relativeFile, n));
      }
      if (/\b(process\.env|dotenv|環境変数)\b/.test(line) && !/MCP_RUNTIME_PATH/.test(line)) {
        findings.push(finding(`static-env-${relativeFile}-${n}`, "secret_access", "medium", "Environment-variable access capability", "The source can read process environment values; the runtime audit must determine whether a sensitive value is accessed.", relativeFile, n));
      }
      if (/\b(fetch|axios|https?\.request|net\.connect|WebSocket)\b/.test(line)) {
        findings.push(finding(`static-network-${relativeFile}-${n}`, "network", "medium", "Network capability", "The source references an outbound network primitive; runtime policy must verify the destination.", relativeFile, n));
      }
      if (/\b(fs\.(write|append|unlink|rm|mkdir|rename)|writeFile|unlinkSync|rmSync)\b/.test(line)) {
        findings.push(finding(`static-write-${relativeFile}-${n}`, "filesystem", "medium", "Filesystem mutation capability", "The source references a filesystem mutation primitive; runtime policy must verify the path.", relativeFile, n));
      }
      if (/\b(fs\.(read|open|readdir)|readFile|readFileSync)\b/.test(line)) {
        findings.push(finding(`static-read-${relativeFile}-${n}`, "filesystem", "medium", "Filesystem read capability", "The source references a filesystem read primitive; the runtime audit must check the path scope.", relativeFile, n));
      }
      if (/\b(postinstall|preinstall|install)\b/i.test(line) && /package\.json|scripts/i.test(relativeFile + line)) {
        findings.push(finding(`static-install-${relativeFile}-${n}`, "installation", "high", "Installation script requires review", "The package metadata contains an installation lifecycle script or related reference.", relativeFile, n));
      }
    });
  }
  const packagePath = join(root, "package.json");
  try {
    const pkg = JSON.parse(await readFile(packagePath, "utf8"));
    for (const [name, version] of Object.entries({ ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) })) {
      if (String(version).includes("*") || String(version).includes("latest")) {
        findings.push({ id: `dependency-floating-${name}`, category: "dependency", severity: "medium", title: "Unpinned dependency", description: `${name} uses a floating version range (${String(version)}).`, source: "static", confidence: "confirmed", evidence: [{ kind: "file", value: `package.json dependency ${name}: ${String(version)}`, location: "package.json" }] });
      }
    }
  } catch { /* package.json is optional */ }
  return findings;
}

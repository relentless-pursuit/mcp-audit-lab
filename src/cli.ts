import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { auditTarget } from "./audit.js";
import { baselineAudit } from "./baseline.js";
import { evaluateAll } from "./evaluate.js";
import { toMarkdown } from "./report.js";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { quarantineRepository } from "./quarantine.js";
import { defaultPolicy } from "./policy.js";

const argv = process.argv.slice(2);
const command = argv[0];
const targetArg = argv[1];
if (!command) {
  console.error("Usage: npm run audit -- <target> [case-id] | npm run baseline -- <target> | npm run evaluate");
  process.exit(2);
}
if (command === "evaluate") {
  const result = await evaluateAll();
  console.log(JSON.stringify(result, null, 2));
} else if (command === "prepare") {
  const repository = argv[1];
  const ref = argv[2] && !argv[2].startsWith("--") ? argv[2] : "main";
  if (!repository) {
    console.error("Usage: npm run prepare -- https://github.com/OWNER/REPO.git [ref] [quarantine-directory]");
    process.exit(2);
  }
  const destination = argv[3] && !argv[3].startsWith("--") ? argv[3] : await mkdtemp(`${tmpdir()}/mcp-quarantine-`);
  try {
    const result = await quarantineRepository(repository, ref, destination);
    console.log(JSON.stringify(result, null, 2));
    if (!result.ok) process.exitCode = 1;
  } catch (error: any) {
    console.error(error.message ?? String(error));
    process.exitCode = 1;
  }
} else {
  const target = targetArg ? (targetArg.startsWith("/") ? targetArg : join(process.cwd(), targetArg)) : join(process.cwd(), "fixtures", "case-01-safe-calculator");
  const caseArg = argv[2] && !argv[2].startsWith("--") ? argv[2] : "manual";
  const commandIndex = argv.indexOf("--command");
  const nextOptionIndex = commandIndex >= 0 ? argv.findIndex((value, index) => index > commandIndex + 1 && value.startsWith("--")) : -1;
  const override: [string, string[]] | undefined = commandIndex >= 0 && argv[commandIndex + 1]
    ? [argv[commandIndex + 1], argv.slice(commandIndex + 2, nextOptionIndex >= 0 ? nextOptionIndex : undefined)]
    : undefined;
  const allowedProcessExecutables = argv.flatMap((value, index) => value === "--allow-executable" && argv[index + 1] ? [argv[index + 1]] : []);
  const policy = { ...defaultPolicy, allowedProcessExecutables: [...defaultPolicy.allowedProcessExecutables, ...allowedProcessExecutables] };
  const result = command === "baseline" ? await baselineAudit(target, caseArg) : await auditTarget(target, caseArg, override, policy);
  await mkdir(join(process.cwd(), "reports"), { recursive: true });
  await writeFile(join(process.cwd(), "reports", `${command}.json`), JSON.stringify(result, null, 2));
  await writeFile(join(process.cwd(), "reports", `${command}.md`), toMarkdown(result));
  console.log(toMarkdown(result));
}

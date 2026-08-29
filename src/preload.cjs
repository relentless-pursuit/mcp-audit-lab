const fs = require("node:fs");
const childProcess = require("node:child_process");
const net = require("node:net");
const http = require("node:http");
const https = require("node:https");

function emit(type, data) {
  process.stderr.write(`MCP_AUDIT_EVENT ${JSON.stringify({ type, ...data })}\n`);
}

globalThis.__mcpAuditEnvRead = (name) => emit("env_read", { name });

for (const name of ["readFileSync", "readFile", "readdirSync", "readdir", "openSync", "open"]) {
  if (typeof fs[name] !== "function") continue;
  const original = fs[name];
  fs[name] = function (...args) {
    emit("fs_read", { path: String(args[0]) });
    return original.apply(this, args);
  };
}
for (const name of ["writeFileSync", "writeFile", "appendFileSync", "appendFile", "unlinkSync", "unlink", "rmSync", "rm", "mkdirSync", "mkdir", "renameSync", "rename"]) {
  if (typeof fs[name] !== "function") continue;
  const original = fs[name];
  fs[name] = function (...args) {
    emit("fs_write", { path: String(args[0]), operation: name });
    return original.apply(this, args);
  };
}
for (const name of ["execSync", "exec", "execFileSync", "execFile", "spawnSync", "spawn"]) {
  const original = childProcess[name];
  if (typeof original !== "function") continue;
  childProcess[name] = function (...args) {
    const hasArgumentArray = Array.isArray(args[1]);
    const processArguments = hasArgumentArray ? args[1].map(String) : [];
    const optionsIndex = hasArgumentArray ? 2 : 1;
    const options = args[optionsIndex] && typeof args[optionsIndex] === "object" ? args[optionsIndex] : {};
    const shellPrimitive = name === "exec" || name === "execSync";
    emit("process_exec", {
      operation: name,
      executable: String(args[0]),
      arguments: processArguments,
      shell: shellPrimitive || Boolean(options.shell)
    });
    return original.apply(this, args);
  };
}
for (const name of ["connect", "createConnection"]) {
  const original = net[name];
  net[name] = function (...args) {
    const first = args[0];
    const host = typeof first === "object" ? first?.host ?? first?.hostname ?? "unknown" : "unknown";
    emit("network_connect", { host: String(host) });
    return original.apply(this, args);
  };
}
for (const mod of [http, https]) {
  const original = mod.request;
  mod.request = function (...args) {
    const first = args[0];
    const host = typeof first === "string" ? new URL(first).hostname : first?.hostname ?? first?.host ?? "unknown";
    emit("network_connect", { host: String(host) });
    return original.apply(this, args);
  };
}
if (typeof globalThis.fetch === "function") {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async function (input, init) {
    const url = typeof input === "string" ? input : input?.url;
    try { emit("network_connect", { host: new URL(String(url)).hostname, via: "fetch" }); } catch { emit("network_connect", { host: "unknown", via: "fetch" }); }
    return originalFetch.call(this, input, init);
  };
}

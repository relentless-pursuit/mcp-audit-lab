import type { AuditPolicy } from "./types.js";

export const defaultPolicy: AuditPolicy = {
  allowedReadRoots: ["/app", "/harness"],
  allowedWriteRoots: ["/tmp"],
  allowedNetworkHosts: ["127.0.0.1", "localhost"],
  allowedEnvironmentVariables: ["PATH", "NODE_PATH", "AUDIT_CASE_ID"],
  allowProcessExecution: false,
  allowedProcessExecutables: [],
  allowShellExecution: false
};

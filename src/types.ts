export type Severity = "low" | "medium" | "high" | "critical";
export type FindingCategory =
  | "secret_access"
  | "filesystem"
  | "process_execution"
  | "network"
  | "dependency"
  | "installation"
  | "capability_mismatch"
  | "tool_schema"
  | "documentation"
  | "protocol";

export interface Finding {
  id: string;
  category: FindingCategory;
  severity: Severity;
  title: string;
  description: string;
  evidence: Evidence[];
  source: "static" | "dynamic" | "protocol";
  confidence: "suspected" | "confirmed";
}

export interface Evidence {
  kind: "file" | "trace" | "protocol" | "command";
  value: string;
  location?: string;
}

export interface ExpectedFinding {
  category: FindingCategory;
  severity: Severity;
  titleIncludes: string;
}

export interface FixtureMetadata {
  caseId: string;
  name: string;
  description: string;
  expectedFindings: ExpectedFinding[];
  difficult?: boolean;
}

export interface AuditPolicy {
  allowedReadRoots: string[];
  allowedWriteRoots: string[];
  allowedNetworkHosts: string[];
  allowedEnvironmentVariables: string[];
  allowProcessExecution: boolean;
  allowedProcessExecutables: string[];
  allowShellExecution: boolean;
}

export interface AuditResult {
  caseId: string;
  target: string;
  generatedAt: string;
  protocol: { initialized: boolean; tools: string[]; raw?: unknown };
  staticFindings: Finding[];
  dynamicFindings: Finding[];
  findings: Finding[];
  traces: string[];
  agentTrajectory: AgentTrace[];
  limitations: string[];
  sandbox: { mode: "docker" | "unavailable"; command?: string };
}

export interface AgentTrace {
  step: string;
  decision: string;
  evidence?: string;
}

export interface EvaluationResult {
  method: string;
  cases: number;
  highRiskExpected: number;
  highRiskDetected: number;
  highRiskRecall: number;
  falsePositives: number;
  evidenceBacked: number;
  runtimeMs: number;
  limitations: string[];
  perCase?: CaseEvaluation[];
}

export interface CaseEvaluation {
  caseId: string;
  expectedHighRisk: number;
  detectedHighRisk: number;
  missed: string[];
  unexpectedHighRisk: number;
}

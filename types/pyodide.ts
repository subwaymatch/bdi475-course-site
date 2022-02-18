export enum PythonRuntimeStatus {
  BEFORE_LOAD = "BEFORE_LOAD",
  LOADING = "LOADING",
  READY = "READY",
}

export interface ICodeExecutionResult {
  type?: string;
  lastEvaluatedResult?: string;
  stdout: string;
  stderr: string;
  hasError: boolean;
  errorMessage: string;
}

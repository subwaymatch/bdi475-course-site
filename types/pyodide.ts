export enum PythonRuntimeStatus {
  BEFORE_LOAD = "BEFORE_LOAD",
  LOADING = "LOADING",
  READY = "READY",
  RUNNING = "RUNNING",
  LOADING_PACKAGES = "LOADING_PACKAGES",
}

export interface IPyodidePackageNameAndVersion {
  name: string;
  version: string;
}

export interface ICodeExecutionResult {
  type?: string;
  lastEvaluatedResult?: string;
  stdout: string;
  stderr: string;
  hasError: boolean;
  errorMessage: string;
}

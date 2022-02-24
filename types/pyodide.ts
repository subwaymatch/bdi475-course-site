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

export enum PyodideResultDisplayType {
  HTML = "HTML",
  JS_OBJECT = "JS_OBJECT",
  UNKNOWN = "UNKNOWN",
}

export interface ICodeExecutionResult {
  type?: string;
  lastEvaluatedResult?: any;
  evaluatedResultDisplayType?: PyodideResultDisplayType;
  stdout: string;
  stderr: string;
  hasError: boolean;
  errorMessage: string;
}

export enum PackageLoadingStatus {
  WAITING = "WAITING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface IPackageLoadingStatus {
  name: string;
  status: PackageLoadingStatus;
}

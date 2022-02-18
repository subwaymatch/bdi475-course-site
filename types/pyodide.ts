export enum PyodideRequest {
  Initialize = "INITIALIZE",
  RunCode = "RUN_CODE",
  LoadPackages = "LOAD_PACKAGES",
}

export enum PyodideResponse {
  InitializeComplete = "INITIALIZE_COMPLETE",
  RunCodeComplete = "RUN_CODE_COMPLETE",
  LoadPackagesComplete = "LOAD_PACKAGES_COMPLETE",
}

export enum PyodideStatusEnum {
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

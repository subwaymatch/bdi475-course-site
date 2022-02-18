import { useState, useEffect, createContext } from "react";
import { PythonRuntimeStatus, ICodeExecutionResult } from "types/pyodide";
import * as Comlink from "comlink";
import type { PyodideRuntime } from "lib/pyodide/pyodide-worker";

const runtime =
  typeof window === "undefined"
    ? null
    : Comlink.wrap<PyodideRuntime>(
        new Worker(new URL("lib/pyodide/pyodide-worker.ts", import.meta.url))
      );

// Create a custom in-browser Python Runtime context
// to enable Python code execution in the browser (web worker)
export const PythonRuntimeContext = createContext<{
  status: PythonRuntimeStatus;
  loadPackages: (packages: string | Array<string>) => Promise<void>;
  runCode: (code: string) => Promise<ICodeExecutionResult>;
  runAndCheckCode: (
    code: string,
    testCode: string
  ) => Promise<ICodeExecutionResult>;
  runtime: Comlink.Remote<PyodideRuntime>;
}>({
  status: PythonRuntimeStatus.BEFORE_LOAD,
  loadPackages: null,
  runCode: null,
  runAndCheckCode: null,
  runtime,
});

export default function PythonRuntimeProvider({ children }: any) {
  const [status, setStatus] = useState<PythonRuntimeStatus>(
    PythonRuntimeStatus.BEFORE_LOAD
  );

  const initialize = async () => {
    setStatus(PythonRuntimeStatus.LOADING);

    await runtime.initialize();

    setStatus(PythonRuntimeStatus.READY);
  };

  const loadPackages = async (packages: string | Array<string> = []) => {
    if (typeof packages === "string") {
      packages = [packages];
    }
  };

  const runCode = async (code): Promise<ICodeExecutionResult> => {
    if (status !== PythonRuntimeStatus.READY) {
      throw new Error("Pyodide hasn't been loaded yet");
    }

    return await runtime.runCode(code);
  };

  const runAndCheckCode = async (
    code,
    testCode
  ): Promise<ICodeExecutionResult> => {
    if (status !== PythonRuntimeStatus.READY) {
      throw new Error("Pyodide hasn't been loaded yet");
    }

    const concatenatedCode = code + "\n\n" + testCode;

    return await runtime.runCode(concatenatedCode);
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <PythonRuntimeContext.Provider
      value={{
        status,
        loadPackages,
        runCode,
        runAndCheckCode,
        runtime,
      }}
    >
      {children}
    </PythonRuntimeContext.Provider>
  );
}

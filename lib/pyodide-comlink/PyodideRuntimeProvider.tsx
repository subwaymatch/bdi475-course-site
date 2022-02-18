import { useState, useEffect, createContext } from "react";
import { PyodideStatusEnum, ICodeExecutionResult } from "types/pyodide";
import * as Comlink from "comlink";
import type { PyodideRuntime } from "lib/pyodide-comlink/worker";

const runtime =
  typeof window === "undefined"
    ? null
    : Comlink.wrap<PyodideRuntime>(
        new Worker(new URL("lib/pyodide-comlink/worker.ts", import.meta.url))
      );

// Create a custom in-browser Python Runtime context
// to enable Python code execution in the browser (web worker)
export const PyodideRuntimeContext = createContext<{
  status: PyodideStatusEnum;
  loadPackages: (packages: string | Array<string>) => Promise<void>;
  runCode: (code: string) => Promise<ICodeExecutionResult>;
  runAndCheckCode: (
    code: string,
    testCode: string
  ) => Promise<ICodeExecutionResult>;
  runtime: Comlink.Remote<PyodideRuntime>;
}>({
  status: PyodideStatusEnum.BEFORE_LOAD,
  loadPackages: null,
  runCode: null,
  runAndCheckCode: null,
  runtime,
});

export default function PyodideRuntimeProvider({ children }: any) {
  const [status, setStatus] = useState<PyodideStatusEnum>(
    PyodideStatusEnum.BEFORE_LOAD
  );

  const initialize = async () => {
    setStatus(PyodideStatusEnum.LOADING);

    await runtime.initialize();

    setStatus(PyodideStatusEnum.READY);
    console.log(`pyodide status==${status}`);
  };

  const loadPackages = async (packages: string | Array<string> = []) => {
    if (typeof packages === "string") {
      packages = [packages];
    }
  };

  const runCode = async (code): Promise<ICodeExecutionResult> => {
    if (status !== PyodideStatusEnum.READY) {
      throw new Error("Pyodide hasn't been loaded yet");
    }

    return await runtime.runCode(code);
  };

  const runAndCheckCode = async (
    code,
    testCode
  ): Promise<ICodeExecutionResult> => {
    if (status !== PyodideStatusEnum.READY) {
      throw new Error("Pyodide hasn't been loaded yet");
    }

    const concatenatedCode = code + "\n\n" + testCode;

    return await runtime.runCode(concatenatedCode);
  };

  useEffect(() => {
    initialize();
  }, []);

  console.log(`status=${status}`);

  return (
    <PyodideRuntimeContext.Provider
      value={{
        status,
        loadPackages,
        runCode,
        runAndCheckCode,
        runtime,
      }}
    >
      {children}
    </PyodideRuntimeContext.Provider>
  );
}

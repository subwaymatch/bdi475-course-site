import { useState, useEffect, createContext } from "react";
import { PythonRuntimeStatus, ICodeExecutionResult } from "types/pyodide";
import * as Comlink from "comlink";
import type { PythonRuntime } from "lib/pyodide/pyodide-worker";

const runtime =
  typeof window === "undefined"
    ? null
    : Comlink.wrap<PythonRuntime>(
        new Worker(new URL("lib/pyodide/pyodide-worker.ts", import.meta.url))
      );

// Create a custom in-browser Python Runtime context
// to enable Python code execution in the browser (web worker)
export const PythonRuntimeContext = createContext<{
  status: PythonRuntimeStatus;
  loadedPackages: string[];
  loadPackages: (packages: string | Array<string>) => Promise<void>;
  findImports: (code: string) => Promise<string[]>;
  findNewImports: (code: string) => Promise<string[]>;
  runCode: (code: string) => Promise<ICodeExecutionResult>;
  runAndCheckCode: (
    code: string,
    testCode: string
  ) => Promise<ICodeExecutionResult>;
  runtime: Comlink.Remote<PythonRuntime>;
}>({
  status: PythonRuntimeStatus.BEFORE_LOAD,
  loadedPackages: null,
  loadPackages: null,
  findImports: null,
  findNewImports: null,
  runCode: null,
  runAndCheckCode: null,
  runtime,
});

export default function PythonRuntimeProvider({ children }: any) {
  const [status, setStatus] = useState<PythonRuntimeStatus>(
    PythonRuntimeStatus.BEFORE_LOAD
  );
  const [loadedPackages, setLoadedPackages] = useState<string[]>([]);

  const initialize = async () => {
    setStatus(PythonRuntimeStatus.LOADING);

    await runtime.initialize();
    await updateLoadedPackages();

    setStatus(PythonRuntimeStatus.READY);
  };

  const updateLoadedPackages = async () => {
    setLoadedPackages(Object.keys(await runtime.pyodide.loadedPackages));
  };

  const loadPackages = async (packages: string | string[] = []) => {
    if (typeof packages === "string") {
      packages = [packages];
    }

    console.log(`loadPackages, packages:`);
    console.log(packages);

    await runtime.pyodide.loadPackage(packages);
    await updateLoadedPackages();
  };

  const findImports = async (code): Promise<string[]> => {
    const loadedPackages = await runtime.pyodide.loadedPackages;

    console.log(`findImports`);
    console.log(loadedPackages);

    return await runtime.findImports(code);
  };

  const findNewImports = async (code): Promise<string[]> => {
    const allImports = await findImports(code);

    const findImportsResult = await runtime.findImports(code);

    console.log(`findImportsResult`);
    console.log(findImportsResult);

    // await runtime.pyodide.loadPackage(findImportsResult);

    await runtime.pyodide.loadPackagesFromImports(code);
    await updateLoadedPackages();

    return allImports;
  };

  const runCode = async (code): Promise<ICodeExecutionResult> => {
    if (status !== PythonRuntimeStatus.READY) {
      throw new Error("Pyodide hasn't been loaded yet");
    }

    setStatus(PythonRuntimeStatus.RUNNING);

    const result = await runtime.runCode(code);

    setStatus(PythonRuntimeStatus.READY);

    return result;
  };

  const runAndCheckCode = async (
    code,
    testCode
  ): Promise<ICodeExecutionResult> => {
    const concatenatedCode = code + "\n\n" + testCode;

    return await runCode(concatenatedCode);
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <PythonRuntimeContext.Provider
      value={{
        status,
        loadedPackages,
        loadPackages,
        findImports,
        findNewImports,
        runCode,
        runAndCheckCode,
        runtime,
      }}
    >
      {children}
    </PythonRuntimeContext.Provider>
  );
}

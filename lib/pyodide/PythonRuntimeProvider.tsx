import { useState, useEffect, createContext } from "react";
import availablePyodidePackages from "data/available-pyodide-packages.json";
import {
  PythonRuntimeStatus,
  IPyodidePackageNameAndVersion,
  IPackageLoadingStatus,
  PackageLoadingStatus,
  ICodeExecutionResult,
} from "types/pyodide";
import * as Comlink from "comlink";
import type { PythonRuntime } from "lib/pyodide/pyodide-worker";
import produce from "immer";
import cloneDeep from "lodash/cloneDeep";

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
  packagesLoadingStatus: IPackageLoadingStatus[];
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
  packagesLoadingStatus: null,
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
  const [packagesLoadingStatus, setPackagesLoadingStatus] = useState<
    IPackageLoadingStatus[]
  >([]);

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

    const loadingStatusArr: IPackageLoadingStatus[] = packages.map((name) => ({
      name,
      status: PackageLoadingStatus.WAITING,
    }));

    setPackagesLoadingStatus(loadingStatusArr);
    setStatus(PythonRuntimeStatus.LOADING_PACKAGES);

    let updatedLoadingStatusArr = cloneDeep(loadingStatusArr);

    for (const packageName of packages) {
      console.log(`SEQUENTIALLY LOADING ${packageName}`);
      const index = loadingStatusArr.findIndex((o) => o.name === packageName);

      updatedLoadingStatusArr = produce(updatedLoadingStatusArr, (draft) => {
        draft[index].status = PackageLoadingStatus.IN_PROGRESS;
      });
      setPackagesLoadingStatus(updatedLoadingStatusArr);

      await runtime.loadPackages(packageName);
      await updateLoadedPackages();

      updatedLoadingStatusArr = produce(updatedLoadingStatusArr, (draft) => {
        draft[index].status = PackageLoadingStatus.COMPLETED;
      });
      setPackagesLoadingStatus(updatedLoadingStatusArr);
    }

    setPackagesLoadingStatus([]);
    setStatus(PythonRuntimeStatus.READY);
  };

  const findImports = async (code): Promise<string[]> => {
    return await runtime.findImports(code);
  };

  const findNewImports = async (code): Promise<string[]> => {
    let allImports = await findImports(code);

    let newImports = allImports.filter(
      (packageName) =>
        availablePyodidePackages.map((o) => o.name).includes(packageName) &&
        !loadedPackages.includes(packageName)
    );

    return newImports;
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
        packagesLoadingStatus,
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

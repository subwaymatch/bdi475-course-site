import { useState, useEffect, createContext } from "react";
import PythonRuntime from "lib/pyodide/PythonRuntime";
import { ICodeExecutionResult } from "typings/pyodide";

// Create a custom In-browser Python Runtime context
// to enable Python code execution in the browser
export const PythonRuntimeContext = createContext<{
  isExecutorReady: boolean;
  loadPackages: (packages: string | Array<string>) => Promise<void>;
  runCode: (code: string) => Promise<ICodeExecutionResult>;
  runAndCheckCode: (
    code: string,
    testCode: string
  ) => Promise<ICodeExecutionResult>;
}>({
  isExecutorReady: false,
  loadPackages: null,
  runCode: null,
  runAndCheckCode: null,
});

export default function PythonRuntimeProvider({ children }: any) {
  const [executor, setExecutor] = useState<PythonRuntime>(null);
  const [isExecutorReady, setIsExecutorReady] = useState(false);

  const initialize = async () => {
    setExecutor(await PythonRuntime.create());

    setIsExecutorReady(true);
  };

  const loadPackages = async (packages: string | Array<string> = []) => {
    setIsExecutorReady(false);

    if (typeof packages === "string") {
      packages = [packages];
    }

    await executor?.loadPackages(packages);

    setIsExecutorReady(true);
  };

  const runCode = async (code) => {
    setIsExecutorReady(false);

    const result = await executor?.run(code);

    setIsExecutorReady(true);

    return result;
  };

  const runAndCheckCode = async (code, testCode) => {
    const concatenatedCode = code + "\n\n" + testCode;

    return await executor?.run(concatenatedCode);
  };

  useEffect(() => {
    initialize();

    return () => executor?.destroy();
  }, []);

  return (
    <PythonRuntimeContext.Provider
      value={{
        isExecutorReady,
        loadPackages,
        runCode,
        runAndCheckCode,
      }}
    >
      {children}
    </PythonRuntimeContext.Provider>
  );
}

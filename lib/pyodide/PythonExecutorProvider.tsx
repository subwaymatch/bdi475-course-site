import { useState, useEffect, createContext } from "react";
import PythonExecutor from "lib/pyodide/PythonExecutor";
import { ICodeExecutionResult } from "typings/pyodide";

// Create a custom Firebase Auth context to sync sign-ins and sign-outs
// across multiple tabs
export const PythonExecutorContext = createContext<{
  isExecutorLoaded: boolean;
  isExecutorReady: boolean;
  loadPackages: (packages: string | Array<string>) => Promise<void>;
  runCode: (code: string) => Promise<ICodeExecutionResult>;
  runAndCheckCode: (
    code: string,
    testCode: string
  ) => Promise<ICodeExecutionResult>;
}>({
  isExecutorLoaded: false,
  isExecutorReady: false,
  loadPackages: null,
  runCode: null,
  runAndCheckCode: null,
});

export default function PythonExecutorProvider({ children }: any) {
  const [executor, setExecutor] = useState<PythonExecutor>(null);
  const [isExecutorLoaded, setIsExecutorLoaded] = useState(false);
  const [isExecutorReady, setIsExecutorReady] = useState(false);

  const initialize = async () => {
    setExecutor(await PythonExecutor.create());

    setIsExecutorLoaded(true);
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
    <PythonExecutorContext.Provider
      value={{
        isExecutorLoaded,
        isExecutorReady,
        loadPackages,
        runCode,
        runAndCheckCode,
      }}
    >
      {children}
    </PythonExecutorContext.Provider>
  );
}

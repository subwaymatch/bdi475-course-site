import { useState, useEffect, createContext } from "react";
import PythonRuntime from "lib/pyodide/PythonRuntime";
import { ICodeExecutionResult } from "typings/pyodide";

// Create a custom In-browser Python Runtime context
// to enable Python code execution in the browser
export const PythonRuntimeContext = createContext<{
  isRuntimeReady: boolean;
  loadPackages: (packages: string | Array<string>) => Promise<void>;
  runCode: (code: string) => Promise<ICodeExecutionResult>;
  runAndCheckCode: (
    code: string,
    testCode: string
  ) => Promise<ICodeExecutionResult>;
}>({
  isRuntimeReady: false,
  loadPackages: null,
  runCode: null,
  runAndCheckCode: null,
});

export default function PythonRuntimeProvider({ children }: any) {
  const [runtime, setRuntime] = useState<PythonRuntime>(null);
  const [isRuntimeReady, setIsRuntimeReady] = useState(false);

  const initialize = async () => {
    setRuntime(await PythonRuntime.create());

    setIsRuntimeReady(true);
  };

  const loadPackages = async (packages: string | Array<string> = []) => {
    setIsRuntimeReady(false);

    if (typeof packages === "string") {
      packages = [packages];
    }

    await runtime?.loadPackages(packages);

    setIsRuntimeReady(true);
  };

  const runCode = async (code) => {
    setIsRuntimeReady(false);

    const result = await runtime?.run(code);

    setIsRuntimeReady(true);

    return result;
  };

  const runAndCheckCode = async (code, testCode) => {
    const concatenatedCode = code + "\n\n" + testCode;

    return await runtime?.run(concatenatedCode);
  };

  useEffect(() => {
    initialize();

    return () => runtime?.destroy();
  }, []);

  return (
    <PythonRuntimeContext.Provider
      value={{
        isRuntimeReady: isRuntimeReady,
        loadPackages,
        runCode,
        runAndCheckCode,
      }}
    >
      {children}
    </PythonRuntimeContext.Provider>
  );
}

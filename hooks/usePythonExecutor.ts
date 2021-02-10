import { PythonExecutorContext } from "lib/pyodide/PythonExecutorProvider";
import { useContext } from "react";

const usePythonExecutor = () => {
  return useContext(PythonExecutorContext);
};

export default usePythonExecutor;

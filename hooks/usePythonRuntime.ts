import { PythonRuntimeContext } from "lib/pyodide/PythonRuntimeProvider";
import { useContext } from "react";

const usePythonRuntime = () => {
  return useContext(PythonRuntimeContext);
};

export default usePythonRuntime;

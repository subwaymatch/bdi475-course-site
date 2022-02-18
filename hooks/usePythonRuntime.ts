import { PyodideRuntimeContext } from "lib/pyodide-comlink/PyodideRuntimeProvider";
import { useContext } from "react";

const usePythonRuntime = () => {
  return useContext(PyodideRuntimeContext);
};

export default usePythonRuntime;

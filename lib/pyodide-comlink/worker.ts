importScripts("https://cdn.jsdelivr.net/pyodide/v0.19.0/full/pyodide.js");

import * as Comlink from "comlink";
import { ICodeExecutionResult } from "types/pyodide";

interface IPyodideWorkerGlobalScope extends WorkerGlobalScope {
  pyodideGlobals?: string[];
  runPyodideFromJs?: () => void;
}

declare var self: IPyodideWorkerGlobalScope & typeof globalThis;

class PyodideRuntime {
  static _instance;

  isPyodideLoaded = false;
  pyodide = null;

  static getInstance() {
    return PyodideRuntime._instance || new PyodideRuntime();
  }

  constructor() {
    console.log("Initializing a new PyodideRuntime class instance!");
  }

  async initialize() {
    if (!this.isPyodideLoaded) {
      console.log("Loading pyodide in PythonRuntime");

      // @ts-expect-error
      this.pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.19.0/full/",
      });

      self.pyodideGlobals = (
        await this.pyodide.runPythonAsync("list(globals().keys())")
      ).toJs();

      console.log(`pyodideGlobals`);

      console.log(self.pyodideGlobals);

      this.isPyodideLoaded = true;
    }
  }

  async findImports(codeStr): Promise<string[]> {
    if (!this.isPyodideLoaded) {
      await this.initialize();
    }

    return [];
  }

  async runCode(codeStr) {
    if (!this.isPyodideLoaded) {
      await this.initialize();
    }

    let result: ICodeExecutionResult = {
      lastEvaluatedResult: null,
      stdout: null,
      stderr: null,
      hasError: false,
      errorMessage: null,
    };

    self.runPyodideFromJs = () => {
      try {
        result.lastEvaluatedResult = this.pyodide.runPython(codeStr);
      } catch (err) {
        result.hasError = true;
        result.errorMessage = err.message;
      }
    };

    await this.pyodide.runPythonAsync(`import io, sys
from js import runPyodideFromJs
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()

# Call JS function to catch error on JS side
runPyodideFromJs()
`);
    result.stdout = this.pyodide.runPython("sys.stdout.getvalue()");
    result.stderr = this.pyodide.runPython("sys.stderr.getvalue()");

    // Reset global namespace
    await this.pyodide.runPythonAsync(`from js import pyodideGlobals
for key in list(globals().keys()).copy():
  if key not in pyodideGlobals:
    del globals()[key]`);

    return result;
  }
}

Comlink.expose(PyodideRuntime);

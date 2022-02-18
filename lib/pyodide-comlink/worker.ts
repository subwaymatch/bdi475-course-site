importScripts("https://cdn.jsdelivr.net/pyodide/v0.19.0/full/pyodide.js");

import * as Comlink from "comlink";
import { PyodideStatusEnum, ICodeExecutionResult } from "types/pyodide";

interface IPyodideWorkerGlobalScope extends WorkerGlobalScope {
  pyodideGlobals?: string[];
  runPyodideFromJs?: () => void;
}

declare var self: IPyodideWorkerGlobalScope & typeof globalThis;

export class PyodideRuntime {
  static _instance: PyodideRuntime;

  status: PyodideStatusEnum = PyodideStatusEnum.BEFORE_LOAD;
  pyodide = null;

  static getInstance() {
    if (!PyodideRuntime._instance) {
      PyodideRuntime._instance = new PyodideRuntime();
    }

    return PyodideRuntime._instance;
  }

  async initialize() {
    console.log(`initialize`);
    console.log(`PyodideRuntime.status=${this.status}`);
    if (this.status === PyodideStatusEnum.BEFORE_LOAD) {
      console.log("Loading pyodide in PythonRuntime");

      this.status = PyodideStatusEnum.LOADING;
      console.log(`PyodideRuntime.status=${this.status}`);

      // @ts-expect-error
      this.pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.19.0/full/",
      });

      self.pyodideGlobals = (
        await this.pyodide.runPythonAsync("list(globals().keys())")
      ).toJs();

      console.log(`pyodideGlobals`);

      console.log(self.pyodideGlobals);

      this.status = PyodideStatusEnum.READY;
      console.log(`PyodideRuntime.status=${this.status}`);
    }
  }

  async findImports(codeStr): Promise<string[]> {
    if (this.status === PyodideStatusEnum.BEFORE_LOAD) {
      await this.initialize();
    }

    return [];
  }

  async runCode(codeStr) {
    if (this.status === PyodideStatusEnum.BEFORE_LOAD) {
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

const instance = PyodideRuntime.getInstance();

Comlink.expose(instance);

export type TPyodideRuntime = typeof PyodideRuntime;

importScripts("https://cdn.jsdelivr.net/pyodide/v0.19.0/full/pyodide.js");

import * as Comlink from "comlink";
import { ICodeExecutionResult } from "types/pyodide";

interface IPyodideWorkerGlobalScope extends WorkerGlobalScope {
  pyodideGlobals?: string[];
  runPyodideFromJs?: () => void;
}

declare var self: IPyodideWorkerGlobalScope & typeof globalThis;

// this class does not check whether the runtime is
// ready to run code or load packages
// the status of the runtime must be updated and handled
// by the Provider using this class
export class PythonRuntime {
  static _instance: PythonRuntime;

  pyodide = null;

  static getInstance() {
    if (!PythonRuntime._instance) {
      PythonRuntime._instance = new PythonRuntime();
    }

    return PythonRuntime._instance;
  }

  async initialize() {
    // @ts-expect-error
    this.pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.19.0/full/",
    });

    await this.pyodide.registerComlink(Comlink);

    self.pyodideGlobals = (
      await this.pyodide.runPythonAsync("list(globals().keys())")
    ).toJs();

    console.log(`pyodideGlobals`);
    console.log(self.pyodideGlobals);
  }

  async findImports(code: string): Promise<string[]> {
    const resultProxy = await this.pyodide.pyodide_py.find_imports(code);

    const imports = resultProxy.toJs();

    resultProxy.destroy();

    return imports;
  }

  async loadPackages(packages: string | string[]) {
    await this.pyodide.loadPackage(
      packages,
      (msg) => {
        console.log(`worker.loadPackages.msgCallback`);
        console.log(msg);
      },
      (errMessage) => {
        console.log(`worker.loadPackages.errMsgCallback`);
        console.log(errMessage);
      }
    );
  }

  async runCode(code: string) {
    let result: ICodeExecutionResult = {
      lastEvaluatedResult: null,
      stdout: null,
      stderr: null,
      hasError: false,
      errorMessage: null,
    };

    self.runPyodideFromJs = () => {
      try {
        result.lastEvaluatedResult = this.pyodide.runPython(code);
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

const instance = PythonRuntime.getInstance();

Comlink.expose(instance);

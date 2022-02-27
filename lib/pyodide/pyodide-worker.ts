importScripts("https://cdn.jsdelivr.net/pyodide/v0.19.1/full/pyodide.js");

import * as Comlink from "comlink";
import { ICodeExecutionResult, PyodideResultDisplayType } from "types/pyodide";

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
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.19.1/full/",
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

    console.log(`result.lastEvaluatedResult`);
    console.log(result.lastEvaluatedResult);

    // TODO: patch matplotlib.pyplot.show() and PILImage.Image to support matplotlib and pillow outputs
    // refer to https://github.com/jupyterlite/jupyterlite/blob/main/packages/pyolite-kernel/py/pyolite/pyolite/patches.py for pyolite's implementations

    // sample code to patch plt.show()
    // import os

    // os.environ["MPLBACKEND"] = "AGG"

    // import matplotlib.pyplot
    // import matplotlib.pyplot as plt
    // import numpy as np
    // from io import BytesIO

    // _old_show = matplotlib.pyplot.show

    // def show():
    // print("show")
    // buf = BytesIO()
    // matplotlib.pyplot.savefig(buf, format="png")
    // buf.seek(0)
    // print(buf.read())

    // matplotlib.pyplot.show = show

    // xpoints = np.array([1, 8])
    // ypoints = np.array([3, 10])

    // plt.plot(xpoints, ypoints)
    // plt.show()

    if (await this.pyodide.isPyProxy(result.lastEvaluatedResult)) {
      console.log(`length=${await result.lastEvaluatedResult.length}`);
      console.log(await result.lastEvaluatedResult.type);

      if (result.lastEvaluatedResult.type === "DataFrame") {
        result.lastEvaluatedResult = result.lastEvaluatedResult.to_html();
        result.evaluatedResultDisplayType = PyodideResultDisplayType.HTML;
      } else {
        // if an unknown PyProxy type, stringify result
        result.lastEvaluatedResult =
          await result.lastEvaluatedResult.toString();
      }
    }

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

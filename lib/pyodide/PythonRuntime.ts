import _ from "lodash";
import {
  ICodeExecutionResult,
  PyodideRequest,
  PyodideResponse,
} from "typings/pyodide";

class PythonExecutor {
  readonly pyodideWorker: Worker;

  private constructor() {
    this.pyodideWorker = new Worker(
      new URL("lib/pyodide/worker.js", import.meta.url)
    );
  }

  static async create() {
    const instance = new PythonExecutor();

    return new Promise<PythonExecutor>((resolve, reject) => {
      instance.pyodideWorker.onerror = reject;

      instance.pyodideWorker.onmessage = (e) => {
        if (e.data.type === PyodideResponse.InitializeComplete) {
          resolve(instance);
        }
      };

      instance.pyodideWorker.postMessage({
        type: PyodideRequest.Initialize,
      });
    });
  }

  async loadPackages(packages: Array<string> = []): Promise<void> {
    return new Promise((resolve, reject) => {
      this.pyodideWorker.onerror = reject;

      this.pyodideWorker.onmessage = (e) => {
        if (e.data.type === PyodideResponse.LoadPackagesComplete) {
          resolve();
        }
      };

      this.pyodideWorker.postMessage({
        type: PyodideRequest.LoadPackages,
        packages,
      });
    });
  }

  async run(code): Promise<ICodeExecutionResult> {
    return new Promise((resolve, reject) => {
      this.pyodideWorker.onerror = reject;

      this.pyodideWorker.onmessage = (e) => {
        if (e.data.type === PyodideResponse.RunCodeComplete) {
          resolve(_.omit(e.data, "type"));
        }
      };

      this.pyodideWorker.postMessage({
        type: PyodideRequest.RunCode,
        code,
      });
    });
  }

  destroy() {
    this.pyodideWorker.terminate();
  }
}

export default PythonExecutor;

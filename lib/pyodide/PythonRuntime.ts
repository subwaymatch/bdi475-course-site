import omit from "lodash/omit";
import {
  ICodeExecutionResult,
  PyodideRequest,
  PyodideResponse,
} from "types/pyodide";

class PythonRuntime {
  readonly pyodideWorker: Worker;

  private constructor() {
    this.pyodideWorker = new Worker(
      new URL("lib/pyodide/worker.js", import.meta.url)
    );
  }

  static async create() {
    const instance = new PythonRuntime();

    return new Promise<PythonRuntime>((resolve, reject) => {
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
          resolve(omit(e.data, "type"));
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

export default PythonRuntime;

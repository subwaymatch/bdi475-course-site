importScripts("https://cdn.jsdelivr.net/pyodide/v0.19.0/full/pyodide.js");

self.hasError;
self.errorMessage;
self.pyodideGlobals;

let isPyodideReady = false;

async function initializePyodide() {
  if (!isPyodideReady) {
    self.pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.19.0/full/",
    });

    // Store initial Pyodide global object keys list
    // This list is used to clean up any global variables created by a user
    self.pyodideGlobals = (
      await self.pyodide.runPythonAsync("list(globals().keys())")
    ).toJs();

    // pyodideGlobals should also be in the globals key list
    // This prevents these shared variables from getting removed when
    // restoring initial global variables after running user code
    self.pyodideGlobals.push("pyodideGlobals");

    isPyodideReady = true;
  }
}

addEventListener(
  "message",
  async (e) => {
    if (!e.data.hasOwnProperty("type")) {
      throw new Error("Message type is missing in Pyodide worker");
    } else if (e.data.type === "INITIALIZE") {
      await initializePyodide();

      self.postMessage({
        type: "INITIALIZE_COMPLETE",
      });
    } else if (e.data.type === "LOAD_PACKAGES") {
      // Load packages
      if (e.data.packages && e.data.packages.length > 0) {
        await self.pyodide.loadPackage(e.data.packages);
      }

      self.postMessage({
        type: "LOAD_PACKAGES_COMPLETE",
      });
    } else if (e.data.type === "RUN_CODE") {
      self.hasError = false;
      self.errorMessage = null;

      if (!isPyodideReady) {
        await initializePyodide();
      }

      // Function to be called by Python
      self.runPyodideFromJs = () => {
        try {
          // execute the code passed to the worker
          self.pyodide.runPython(e.data.code);
        } catch (err) {
          self.hasError = true;
          self.errorMessage = err.message;

          return;
        }
      };

      // Calling runPyodideFromJs function in Python
      // lets us catch and handle errors (exceptions)
      // Passing user's code directly to pyodide.runPython()
      // results in unhandled exceptions
      await self.pyodide.runPythonAsync(`import io, sys
from js import runPyodideFromJs
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()

# Call JS function to catch error on JS side
runPyodideFromJs()
`);

      const stdout = self.pyodide.runPython("sys.stdout.getvalue()");
      const stderr = self.pyodide.runPython("sys.stderr.getvalue()");

      // Reset global namespace
      await self.pyodide.runPythonAsync(`from js import pyodideGlobals
for key in list(globals().keys()).copy():
  if key not in pyodideGlobals:
    del globals()[key]`);

      self.postMessage({
        type: "RUN_CODE_COMPLETE",
        stdout,
        stderr,
        hasError: self.hasError,
        errorMessage: self.errorMessage,
      });
    }
  },
  false
);

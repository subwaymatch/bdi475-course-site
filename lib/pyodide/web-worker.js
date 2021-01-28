self.languagePluginUrl = "https://cdn.jsdelivr.net/pyodide/v0.16.1/full/";
importScripts("https://cdn.jsdelivr.net/pyodide/v0.16.1/full/pyodide.js");

self.hasError;
self.errorMessage;

let pyodideGlobals;
let isPyodideReady = false;

addEventListener(
  "message",
  async (e) => {
    console.log(`web-worker.js message event`);
    console.log(e.data);

    if (e.data.type === undefined) {
      throw new Error("Message type is missing in Pyodide worker");
    } else if (e.data.type === "INITIALIZE") {
      // Wait for Pyodide interpreter to be
      await languagePluginLoader;

      // Store initial Pyodide
      pyodideGlobals = self.pyodide.runPython("list(globals().keys())");

      console.log(`pyodideGlobals`);
      console.log(pyodideGlobals);

      self.postMessage({
        type: "INITIALIZE_COMPLETE",
      });
    } else if (e.data.type === "RUN_CODE") {
      self.hasError = false;
      self.errorMessage = null;

      // Function to be called by Python
      self.runPyodideFromJs = () => {
        try {
          // execute the code passed to the worker
          self.pyodide.runPython(e.data.userCode);
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
      self.pyodide.runPython(`import io, sys
from js import runPyodideFromJs
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()

# Call JS function to catch error on JS side
runPyodideFromJs()
`);

      const stdout = self.pyodide.runPython("sys.stdout.getvalue()");
      const stderr = self.pyodide.runPython("sys.stderr.getvalue()");

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
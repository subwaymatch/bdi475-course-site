self.languagePluginUrl = "https://cdn.jsdelivr.net/pyodide/v0.16.1/full/";
importScripts("https://cdn.jsdelivr.net/pyodide/v0.16.1/full/pyodide.js");

self.hasError;
self.errorMessage;
self.pyodideGlobals;

let isPyodideReady = false;

addEventListener(
  "message",
  async (e) => {
    if (!e.data.hasOwnProperty("type")) {
      throw new Error("Message type is missing in Pyodide worker");
    } else if (e.data.type === "INITIALIZE") {
      if (!isPyodideReady) {
        // Wait for Pyodide interpreter to be
        await languagePluginLoader;

        // Store initial Pyodide
        self.pyodideGlobals = self.pyodide.runPython("list(globals().keys())");

        console.log(self.pyodideGlobals);

        isPyodideReady = true;
      }

      self.postMessage({
        type: "INITIALIZE_COMPLETE",
      });
    } else if (
      e.data.type === "RUN_CODE" ||
      e.data.type === "RUN_AND_CHECK_CODE"
    ) {
      self.hasError = false;
      self.errorMessage = null;

      const codeToRun =
        e.data.type === "RUN_CODE"
          ? e.data.userCode
          : e.data.userCode + "\n\n" + e.data.testCode;

      // Function to be called by Python
      self.runPyodideFromJs = () => {
        try {
          // execute the code passed to the worker
          self.pyodide.runPython(codeToRun);
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
        type:
          e.data.type === "RUN_CODE"
            ? "RUN_CODE_COMPLETE"
            : "RUN_AND_CHECK_CODE_COMPLETE",
        stdout,
        stderr,
        hasError: self.hasError,
        errorMessage: self.errorMessage,
      });
    }
  },
  false
);

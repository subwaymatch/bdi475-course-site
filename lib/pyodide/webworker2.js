self.languagePluginUrl = "https://cdn.jsdelivr.net/pyodide/v0.16.1/full/";
self.hasError;
self.errorMessage;

// pull down pyodide from the public CDN
importScripts("https://pyodide-cdn2.iodide.io/v0.15.0/full/pyodide.js");

addEventListener(
  "message",
  async (e) => {
    // wait for the interpreter to be fully loaded
    await languagePluginLoader;

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

        // self.postMessage({
        //   stdout: null,
        //   stderr: null,
        //   hasError: true,
        //   errorMessage: err.message,
        // });

        return;
      }
    };

    self.pyodide.runPython(`
    import io, sys
    from js import runPyodideFromJs
    sys.stdout = io.StringIO()
    sys.stderr = io.StringIO()

    # Call JS function to catch error on JS side
    runPyodideFromJs()
  `);

    const stdout = self.pyodide.runPython("sys.stdout.getvalue()");
    const stderr = self.pyodide.runPython("sys.stderr.getvalue()");

    self.postMessage({
      stdout,
      stderr,
      hasError: self.hasError,
      errorMessage: self.errorMessage,
    });
  },
  false
);

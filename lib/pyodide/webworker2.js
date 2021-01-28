// pull down pyodide from the public CDN
importScripts("https://pyodide-cdn2.iodide.io/v0.15.0/full/pyodide.js");

addEventListener(
  "message",
  async (e) => {
    // wait for the interpreter to be fully loaded
    await languagePluginLoader;

    self.runPythonWithStdout = () => {
      try {
        // execute the code passed to the worker
        pyodide.runPython(e.data);
      } catch (err) {
        postMessage({
          error: err,
        });
        return;
      }

      // capture the code's standard output
      // and send it back to the main thread
      let stdout = pyodide.runPython("sys.stdout.getvalue()");
      if (stdout) {
        stdout = stdout.split("\n");
        for (line of stdout) {
          postMessage({
            message: line,
          });
        }
      }
    };

    // redirect stdout to io.StringIO so that we can get it later
    pyodide.runPython(`
    import io, code, sys
    from js import runPythonWithStdout
    sys.stdout = io.StringIO()
    sys.stderr = io.StringIO()
    ## This runs self.runPythonWithStdout defined in the JS
    runPythonWithStdout()
  `);

    postMessage({
      done: true,
    });
  },
  false
);

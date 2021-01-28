// webworker.js

// Setup your project to serve `py-worker.js`. You should also serve
// `pyodide.js`, and all its associated `.asm.js`, `.data`, `.json`,
// and `.wasm` files as well:
self.languagePluginUrl = "https://cdn.jsdelivr.net/pyodide/v0.16.1/full/";
importScripts("https://cdn.jsdelivr.net/pyodide/v0.16.1/full/pyodide.js");

let pythonLoading;

addEventListener("message", async (event) => {
  await languagePluginLoader;
  // since loading package is asynchronous, we need to make sure loading is done:

  await pythonLoading;

  // Don't bother yet with this line, suppose our API is built in such a way:
  const { python } = event.data;

  // Now is the easy part, the one that is similar to working in the main thread:
  try {
    self.pyodide.runPython(`import io, sys
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()`);

    const results = self.pyodide.runPython(python);
    const output = self.pyodide.runPython("sys.stdout.getvalue()");

    self.postMessage({
      results,
      output,
      hasError: false,
      errorMessage: null,
    });
  } catch (error) {
    console.log("Error in webworker.js");
    console.log(Object.keys(error));
    self.postMessage({
      results: null,
      output: null,
      hasError: true,
      errorMessage: JSON.stringify(error),
    });
  }
});

addEventListener("error", (err) => {
  e.preventDefault();

  console.log(`addEventListener"error"`);
  console.log(err);
});

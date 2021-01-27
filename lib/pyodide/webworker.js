// webworker.js

// Setup your project to serve `py-worker.js`. You should also serve
// `pyodide.js`, and all its associated `.asm.js`, `.data`, `.json`,
// and `.wasm` files as well:
self.languagePluginUrl = "https://cdn.jsdelivr.net/pyodide/v0.16.1/full/";
importScripts("https://cdn.jsdelivr.net/pyodide/v0.16.1/full/pyodide.js");

let pythonLoading;
async function loadPythonPackages() {
  await languagePluginLoader;
  pythonLoading = self.pyodide.loadPackage(["numpy", "pytz"]);
}

addEventListener("message", async (event) => {
  await languagePluginLoader;
  // since loading package is asynchronous, we need to make sure loading is done:

  await pythonLoading;

  // Don't bother yet with this line, suppose our API is built in such a way:
  const { python } = event.data;

  await self.pyodide.runPython(`import io, sys
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()`);

  const results = await self.pyodide.runPythonAsync(python);
  const output = await self.pyodide.runPythonAsync("sys.stdout.getvalue()");

  // Now is the easy part, the one that is similar to working in the main thread:
  try {
    self.postMessage({
      results,
      output,
      hasError: false,
      errorMessage: null,
    });
  } catch (error) {
    self.postMessage({ hasError: true, errorMessage: error.message });
  }
});

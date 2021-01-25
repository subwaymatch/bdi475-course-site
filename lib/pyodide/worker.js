self.languagePluginUrl = "https://cdn.jsdelivr.net/pyodide/v0.16.1/full/";
importScripts("https://cdn.jsdelivr.net/pyodide/v0.16.1/full/pyodide.js");

let pythonLoading;

async function loadPythonPackages() {
  await languagePluginLoader;
  pythonLoading = self.pyodide.loadPackage([]);
}

const onmessage = async (event) => {
  await languagePluginLoader;

  // Since loading package is asynchronous, we need to make sure loading is done
  await pythonLoading;

  const { python, ...context } = event.data;

  // The worker copies the context in its own "memory" (an object mapping name to values)
  for (const key of Object.keys(context)) {
    self[key] = context[key];
  }

  // Now is the easy part, the one that is similar to working in the main thread
  try {
    self.postMessage({
      results: await self.pyodide.runPythonAsync(python),
    });
  } catch (error) {
    self.postMessage({
      error: error.message,
    });
  }
};

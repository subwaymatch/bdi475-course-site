const loadPyodide = async () => {
  console.log(`worker.js loadPyodide() called`);
  importScripts("https://cdn.jsdelivr.net/pyodide/v0.16.1/full/pyodide.js");
  self.languagePluginUrl = "https://cdn.jsdelivr.net/pyodide/v0.16.1/full/";

  await languagePluginLoader;

  console.log(`worker.js loadPyodide() LOADED`);
};

const loadPackages = async (packages) => {
  await self.pyodide.loadPackage(packages);
};

const setVars = async (vars) => {
  const keys = Object.keys(vars);

  for (let key of keys) {
    // Keys are arguments for the Python script
    // Set them on self, so that `from js import key` works.
    // For the purpose of this course website, this step isn't necessary - this is only here to be futureproof
    self[key] = vars[key];
  }
};

const runCodeAsync = async (code) => {
  console.log(`runCodeAsync`);
  await languagePluginLoader;

  const result = self.pyodide.runPythonAsync(`import io, sys
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()`);

  console.log(result);

  //   try {
  //     await self.pyodide.runPythonAsync(`import io, sys
  // sys.stdout = io.StringIO()
  // sys.stderr = io.StringIO()`);

  //     console.log(`worker.runCodeAsync`);

  //     const output = await self.pyodide.runPythonAsync(code, (res) => {
  //       console.log(`inside runPythonAsync callback`);
  //       console.log(res);
  //     });
  //     const stdout = await self.pyodide.runPythonAsync(`sys.stdout.getvalue()`);
  //     const stderr = await self.pyodide.runPythonAsync(`sys.stderr.getvalue()`);

  //     return {
  //       error: null,
  //       output,
  //       stdout,
  //       stderr,
  //     };
  //   } catch (err) {
  //     return {
  //       hasError: true,
  //       error: err,
  //     };
  //   }
};

addEventListener("message", async (event) => {
  let codeResult, checkResult;

  const { id, type: messageType, userCode } = event.data;
  console.log(`id=${id}, messageType=${messageType}`);

  switch (messageType) {
    case "LOAD_PYODIDE":
      await loadPyodide();

      postMessage({
        id,
        type: 'PYODIDE_LOAD_COMPLETE"',
      });

      break;
    case "RUN_CODE":
      await languagePluginLoader;
      console.log(`RUN_CODE, userCode below`);
      console.log(userCode);

      codeResult = await self.pyodide.runPythonAsync(userCode);
      codeResult = "yariyada";

      postMessage({
        id,
        type: "CODE_RUN_COMPLETE",
        result: codeResult,
      });
    default:
      postMessage({
        id,
        type: "COMMAND_NOT_FOUND",
      });
  }
});

loadPyodide();

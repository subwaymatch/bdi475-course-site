const pyodideWorker =
  typeof window === "undefined"
    ? undefined
    : new Worker("./webworker.js", {
        type: "module",
      });

export function run(script, context, onSuccess, onError) {
  console.log(`run`);
  console.log(script);
  console.log(context);
  console.log(onSuccess);
  console.log(onError);

  console.log(`pyodideWorker=${pyodideWorker}`);

  pyodideWorker.onerror = onError;
  pyodideWorker.onmessage = (e) => onSuccess(e.data);
  pyodideWorker.postMessage({
    ...context,
    python: script,
  });
}

// Transform the run (callback) form to a more modern async form.
// This is what allows to write:
//    const {results, error} = await asyncRun(script, context);
// Instead of:
//    run(script, context, successCallback, errorCallback);
export function asyncRun(script, context) {
  return new Promise(function (onSuccess, onError) {
    run(script, context, onSuccess, onError);
  });
}

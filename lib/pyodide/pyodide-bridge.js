console.log(`pyodide-bridge, typeof window === ${typeof window}`);

// Only create a worker instance if the code is running
// in the browser and worker is supported
const testWorker =
  typeof window !== "undefined" && window.Worker
    ? new Worker("lib/pyodide/worker.js", {
        type: "module",
      })
    : null;

export function run(onSuccess, onError) {
  console.log("run");

  testWorker.onerror = onError;
  testWorker.onmessage = (e) => {
    console.log("Message received from web worker");
    console.log(e);
    onSuccess(e.data);
  };
  testWorker.postMessage({
    some: "data",
  });
}

export function asyncRun() {
  console.log(`asyncRun`);
  if (typeof testWorker === null) {
    throw new Error("Web worker ");
  }

  return new Promise((onSuccess, onError) => {
    run(onSuccess, onError);
  });
}

import { useState, useEffect } from "react";

const pythonCode = `
    import statistics
    statistics.stdev([0.8, 0.4, 1.2, 3.7, 2.6, 5.8])
`;

export default function PyodideTestPage() {
  const [results, setResults] = useState("Results");
  const [pyodideError, setPyodideError] = useState("Error");

  useEffect(async () => {
    const pyodideWorker = new Worker("lib/pyodide/worker.js", {
      type: "module",
    });

    function run(script, context, onSuccess, onError) {
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
    function asyncRun(script, context) {
      return new Promise(function (onSuccess, onError) {
        run(script, context, onSuccess, onError);
      });
    }

    try {
      const { results, error } = await asyncRun(pythonCode);

      if (results) {
        console.log(`pyodideWorker return results: `, results);
        setResults(results);
      } else if (error) {
        console.log(`pyodideWorker error: `, error);
        setPyodideError(error);
      }
    } catch (e) {
      console.error(
        `Error in pyodideWorker at ${e.filename}, Line: ${e.lineno}, ${e.message}`
      );
    }
  });

  return (
    <div>
      <h2>Results</h2>
      <pre>{results}</pre>

      <h2>Error</h2>
      <pre>{pyodideError}</pre>
    </div>
  );
}

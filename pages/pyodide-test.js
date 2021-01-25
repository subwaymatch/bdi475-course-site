import { useState, useEffect } from "react";
import randomstring from "randomstring";

const pythonCode = `3 + 4`;

export default function PyodideTestPage() {
  const [results, setResults] = useState("Results");
  const [pyodideError, setPyodideError] = useState("Error");
  const [isPyodideReady, setIsPyodideReady] = useState(false);

  useEffect(async () => {
    const pyodideWorker = new Worker("lib/pyodide/worker2.js", {
      type: "module",
    });

    pyodideWorker.onerror = (err) => {
      console.log(`pyodideWorker.onerror ERR`);
      console.error(err);
    };
    pyodideWorker.onmessage = (e) => {
      console.log(`pyodideWorker.onmessage received`);
      console.log(e);
    };

    pyodideWorker.postMessage({
      id: randomstring.generate(6),
      type: "LOAD_PYODIDE",
    });

    // pyodideWorker.postMessage({
    //   id: randomstring.generate(6),
    //   type: "RUN_CODE",
    //   userCode: pythonCode,
    // });
  }, []);

  return (
    <div>
      <h2>Results</h2>
      <pre>{results}</pre>

      <h2>Error</h2>
      <pre>{pyodideError}</pre>
    </div>
  );
}

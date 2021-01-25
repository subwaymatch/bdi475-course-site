import { useState, useEffect } from "react";
import { asyncRun } from "lib/pyodide/py-worker";

const script = `import numpy as np
np.meassn([3, 4, 5, 6])`;

const context = {
  A_rank: [0.8, 0.4, 1.2, 3.7, 2.6, 5.8],
};

export default function PyodideTestPage() {
  const [results, setResults] = useState("Results");
  const [pyodideError, setPyodideError] = useState("Error");

  useEffect(async () => {
    try {
      const { results, error } = await asyncRun(script, context);
      if (results) {
        console.log("pyodideWorker return results: ", results);
      } else if (error) {
        console.log("pyodideWorker error: ", error);
      }
    } catch (e) {
      console.log(
        `Error in pyodideWorker at ${e.filename}, Line: ${e.lineno}, ${e.message}`
      );
    }
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

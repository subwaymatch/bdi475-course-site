import { useState, useEffect } from "react";
import initSqlJs from "sql.js";
import styles from "components/playground/SQLPlayground.module.scss";

const sqlChallenge = {
  initScript: `CREATE TABLE contacts (
	contact_id INTEGER PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	phone TEXT NOT NULL UNIQUE
);`,
};

export default function SqlJsPage() {
  const [db, setDb] = useState(null);
  const [error, setError] = useState(null);
  const [execResults, setExecResults] = useState(null);

  const init = async () => {
    console.log(`init()`);
    try {
      const SQL = await initSqlJs({
        // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
        // You can omit locateFile completely when running in node
        locateFile: (file) =>
          `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.1/${file}`,
      });

      const db = new SQL.Database();

      setDb(db);
    } catch (err) {
      console.log(`ERROR INITIALIZING SQL.JS`);
      setError(err);
      console.error(err);
    }
  };

  const exec = (sql) => {
    try {
      const results = db.exec(sql);
      setExecResults(results);
      setError(null);
    } catch (err) {
      setExecResults(null);
      setError(err);
    }
  };

  useEffect(() => {
    init();
  }, []);

  /**
   * Renders a single value of the array returned by db.exec(...) as a table
   */
  const ResultTable = ({ columns, values }) => {
    return (
      <table>
        <thead>
          <tr>
            {columns.map((columnName) => (
              <td key={columnName}>{columnName}</td>
            ))}
          </tr>
        </thead>

        <tbody>
          {values.map(
            (
              row, // values is an array of arrays representing the results of the query
              rowIndex
            ) => (
              <tr key={rowIndex}>
                {row.map((value, cellIndex) => (
                  <td key={cellIndex}>{value}</td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    );
  };

  return db ? (
    <div className={styles.container}>
      <h1>Next.js SQL interpreter</h1>

      <textarea
        onChange={(e) => exec(e.target.value)}
        placeholder='Enter some SQL. No inspiration ? Try "select sqlite_version()"'
        className={styles.codeBox}
      />

      <pre className={styles.error}>{(error || "").toString()}</pre>

      <pre>
        {execResults
          ? execResults.map((execResult, rIndex) => (
              <ResultTable
                key={rIndex}
                columns={execResult.columns}
                values={execResult.values}
              />
            ))
          : ""}
      </pre>
    </div>
  ) : (
    <pre>Loading...</pre>
  );
}

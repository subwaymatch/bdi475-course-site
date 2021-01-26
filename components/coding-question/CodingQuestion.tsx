import { useState, useEffect } from "react";
import { asyncRun } from "lib/pyodide/py-worker";
import styles from "./CodingQuestion.module.scss";
import { Col, Container, Row } from "react-bootstrap";

const script = `mean([3, 4, 5, 6])`;

const context = {
  A_rank: [0.8, 0.4, 1.2, 3.7, 2.6, 5.8],
};

export default function CodingQuestion() {
  const [results, setResults] = useState("Results");
  const [pyodideError, setPyodideError] = useState("Error");

  useEffect(() => {
    runCode();
  }, []);

  const runCode = async () => {
    try {
      const { results, error } = await asyncRun(script, context);
      if (results) {
        console.log("pyodideWorker return results: ", results);
        setResults(results);
      } else if (error) {
        console.log("pyodideWorker error: ", error);
        setPyodideError(error);
      }
    } catch (e) {
      console.log(
        `Error in pyodideWorker at ${e.filename}, Line: ${e.lineno}, ${e.message}`
      );
    }
  };

  return (
    <div className={styles.codingQuestionWrapper}>
      <Row>
        <Col>
          <div className={styles.exerciseHeader}>
            <span className={styles.exerciseType}>Coding Exercise</span>
            <h2 className={styles.exerciseTitle}>Update a Variable</h2>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <div className={styles.taskWrapper}>
            <span className="label green">Task</span>

            <div className={styles.questionPassage}></div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Results</h2>
          <pre>{results}</pre>

          <h2>Error</h2>
          <pre>{pyodideError}</pre>
        </Col>
      </Row>
    </div>
  );
}

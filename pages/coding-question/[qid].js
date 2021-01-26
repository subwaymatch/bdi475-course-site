import { useState, useEffect } from "react";
import { asyncRun } from "lib/pyodide/py-worker";
import Layout from "components/Layout";
import styles from "styles/pages/coding-question/EditCodingQuestionPage.module.scss";
import { Col, Container, Row } from "react-bootstrap";

const script = `mean([3, 4, 5, 6])`;

const context = {
  A_rank: [0.8, 0.4, 1.2, 3.7, 2.6, 5.8],
};

export default function EditCodingQuestionPage() {
  const [results, setResults] = useState("Results");
  const [pyodideError, setPyodideError] = useState("Error");

  useEffect(async () => {
    try {
      const { results, error } = await asyncRun(script, context);
      if (results) {
        console.log("pyodideWorker return results: ", results);
        setResult(results);
      } else if (error) {
        console.log("pyodideWorker error: ", error);
        setPyodideError(error);
      }
    } catch (e) {
      console.log(
        `Error in pyodideWorker at ${e.filename}, Line: ${e.lineno}, ${e.message}`
      );
    }
  }, []);

  return (
    <Layout>
      <main className={styles.page}>
        <Container>
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
        </Container>
      </main>
    </Layout>
  );
}

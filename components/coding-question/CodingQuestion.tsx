import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { asyncRun } from "lib/pyodide/py-worker";
import styles from "./CodingQuestion.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import clsx from "clsx";

const CodeEditor = dynamic(() => import("components/CodeEditor"), {
  ssr: false,
});

const script = `mean([3, 4, 5, 6])`;

const context = {
  A_rank: [0.8, 0.4, 1.2, 3.7, 2.6, 5.8],
};

type Props = {
  title: string;
  textMarkdown: string;
  starterCode?: string;
  testCode: string;
};

export default function CodingQuestion({
  title,
  textMarkdown,
  starterCode,
  testCode,
}: Props) {
  const [userCode, setUserCode] = useState(starterCode);
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

      <Row className="no-gutters">
        <Col md={6}>
          <div
            className={styles.questionTextWrapper}
            style={{ height: "440px" }}
          >
            <div className={styles.questionTextInner}>
              <span className="label green">Task</span>

              <div className={styles.textMarkdown}>{textMarkdown}</div>
            </div>
          </div>
        </Col>

        <Col md={6}>
          <div className={styles.codeEditorWrapper}>
            <CodeEditor
              editorValue={starterCode}
              onChange={setUserCode}
              language="python"
              height="440px"
            />
          </div>
        </Col>
      </Row>

      <Row className="no-gutters">
        <Col md={6}>
          <div className={styles.resultsWrapper}>
            <span className="label yellow">Output</span>
            <pre>{results}</pre>
          </div>
        </Col>
        <Col md={6}>
          <div className={styles.errorWrapper}>
            <span className="label pink">Error</span>
            <pre>{pyodideError}</pre>
          </div>
        </Col>
      </Row>
    </div>
  );
}

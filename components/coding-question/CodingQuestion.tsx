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
          <div className={styles.questionTextWrapper}>
            <div className={styles.questionTextInner}>
              <span className="label green">Task</span>

              <div className={styles.questionMarkdown}>
                The last step of writing a test is to validate the output
                against a known response. This is known as an assertion. There
                are some general best practices around how to write assertions:
                Make sure tests are repeatable and run your test multiple times
                to make sure it gives the same result every time Try and assert
                results that relate to your input data, such as checking that
                the result is the actual sum of values in the sum() example
                unittest comes with lots of methods to assert on the values,
                types, and existence of variables. Here are some of the most
                commonly used methods: The last step of writing a test is to
                validate the output against a known response. This is known as
                an assertion. There are some general best practices around how
                to write assertions: Make sure tests are repeatable and run your
                test multiple times to make sure it gives the same result every
                time Try and assert results that relate to your input data, such
                as checking that the result is the actual sum of values in the
                sum() example unittest comes with lots of methods to assert on
                the values, types, and existence of variables. Here are some of
                the most commonly used methods:
              </div>
            </div>
          </div>
        </Col>

        <Col md={6}>
          <div className={styles.codeEditorWrapper}>
            <CodeEditor
              editorValue={starterCode}
              onChange={setUserCode}
              language="python"
              height="400px"
            />
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

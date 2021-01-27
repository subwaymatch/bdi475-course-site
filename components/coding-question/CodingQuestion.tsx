import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { asyncRun } from "lib/pyodide/py-worker";
import styles from "./CodingQuestion.module.scss";
import { Col, Row } from "react-bootstrap";
import clsx from "clsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
  const [results, setResults] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const isScreenDesktop = useMediaQuery("(min-width: 992px)");

  const editorHeight = "440px";

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
        setErrorMessage(error);
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
            style={{ height: isScreenDesktop ? editorHeight : "auto" }}
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
              height={editorHeight}
            />
          </div>
        </Col>
      </Row>

      <Row className="no-gutters">
        <Col md={6} className={styles.outputCol}>
          <div
            className={clsx(styles.resultsWrapper, {
              [styles.hasOutput]: results !== "",
            })}
          >
            <span className="label yellow">Output</span>
            <pre>{results ? results : "No Output"}</pre>
          </div>
        </Col>
        <Col md={6} className={styles.outputCol}>
          <div
            className={clsx(styles.errorWrapper, {
              [styles.hasOutput]: errorMessage !== "",
            })}
          >
            <span className="label pink">Error</span>
            <pre>{errorMessage ? errorMessage : "No Error"}</pre>
          </div>
        </Col>
      </Row>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import styles from "./CodingQuestion.module.scss";
import { Col, Row } from "react-bootstrap";
import { BiReset } from "react-icons/bi";
import { VscSymbolMethod } from "react-icons/vsc";
import { IoPlay } from "react-icons/io5";
import { BsCheckCircle } from "react-icons/bs";
import clsx from "clsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { desktop } from "constants/media-query-strings";
import { toast } from "react-toastify";

const CodeEditor = dynamic(() => import("components/CodeEditor"), {
  ssr: false,
});

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
  const [output, setOutput] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isScreenDesktop = useMediaQuery(desktop);
  const pyodideWorkerRef = useRef<Worker>();

  const editorHeight = "440px";

  useEffect(() => {
    pyodideWorkerRef.current = new Worker("lib/pyodide/web-worker", {
      type: "module",
    });

    pyodideWorkerRef.current!.onmessage = (e) => {
      setOutput(e.data.stdout);

      if (e.data.hasError) {
        setHasError(e.data.hasError);
        setErrorMessage(e.data.errorMessage);

        toast.error("Error encountered running your code");
      } else {
        toast.success("Code run successfully!");
      }
    };

    return () => {
      pyodideWorkerRef.current?.terminate();
    };
  }, []);

  const runCode = async () => {
    pyodideWorkerRef.current?.postMessage({
      userCode,
    });
  };

  return (
    <div className={styles.codingQuestionWrapper}>
      <Row>
        <Col>
          <div className={styles.exerciseHeader}>
            <span className={styles.exerciseType}>Coding Exercise</span>
            <h2 className={styles.exerciseTitle}>{title}</h2>
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
              editorValue={userCode}
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
              [styles.hasOutput]: !!output,
            })}
          >
            <span className="label yellow">Output</span>
            <pre>{output ? output : "No Output"}</pre>
          </div>
        </Col>
        <Col md={6} className={styles.outputCol}>
          <div
            className={clsx(styles.errorWrapper, {
              [styles.hasOutput]: hasError,
            })}
          >
            <span className="label pink">Error</span>
            <pre>{errorMessage ? errorMessage : "No Error"}</pre>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className={styles.controlsWrapper}>
            <Row>
              <Col>
                <div className={styles.leftControls}>
                  <div
                    className={styles.button}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Button Clicked");
                    }}
                  >
                    <BiReset className={styles.reactIcon} />
                    <span className={styles.label}>Reset</span>
                  </div>
                  <div
                    className={styles.button}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Button Clicked");
                    }}
                  >
                    <VscSymbolMethod className={styles.reactIcon} />
                    <span className={styles.label}>Solution</span>
                  </div>
                </div>
              </Col>

              <Col>
                <div className={styles.rightControls}>
                  <div
                    className={clsx(styles.button, styles.runButton)}
                    onClick={async (e) => {
                      e.preventDefault();
                      await runCode();
                    }}
                  >
                    <IoPlay className={styles.reactIcon} />
                    <span className={styles.label}>Run</span>
                  </div>
                  <div
                    className={clsx(styles.button, styles.checkButton)}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Button Clicked");
                    }}
                  >
                    <BsCheckCircle className={styles.reactIcon} />
                    <span className={styles.label}>Check</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

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
import marked from "marked";
import Tippy from "@tippyjs/react";
import { isMacOs } from "react-device-detect";

const CodeEditor = dynamic(() => import("components/CodeEditor"), {
  ssr: false,
});

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
  const [isPyodideReady, setIsPyodideReady] = useState(false);

  const editorHeight = "400px";

  useEffect(() => {
    pyodideWorkerRef.current = new Worker("lib/pyodide/web-worker", {
      type: "module",
    });

    pyodideWorkerRef.current!.onmessage = (e) => {
      console.log(`pyodideWorkerRef.current.onmessage event data`);
      console.log(e.data);

      if (e.data.type === "INITIALIZE_COMPLETE") {
        setIsPyodideReady(true);
      } else if (e.data.type === "RUN_CODE_COMPLETE") {
        setOutput(e.data.stdout);
        setHasError(e.data.hasError);
        setErrorMessage(e.data.errorMessage);

        if (e.data.hasError) {
          toast.error("See the error message below.");
        } else {
          toast.success("Run complete.");

          if (!e.data.stdout) {
            toast.warning("Your code did not print anything.");
          }
        }
      }
    };

    pyodideWorkerRef.current?.postMessage({
      type: "INITIALIZE",
    });

    return () => {
      pyodideWorkerRef.current?.terminate();
    };
  }, []);

  const reset = async () => {
    setUserCode(starterCode);
    setOutput("");
    setHasError(false);
    setErrorMessage("");
    toast("Reset Complete!");
  };

  const runCode = () => {
    pyodideWorkerRef.current?.postMessage({
      type: "RUN_CODE",
      userCode,
    });
  };

  const runAndCheckCode = () => {
    pyodideWorkerRef.current?.postMessage({
      type: "RUN_AND_CHECK_CODE",
      userCode,
      testCode,
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

              <div
                className={styles.textMarkdown}
                dangerouslySetInnerHTML={{ __html: marked(textMarkdown) }}
              />
            </div>
          </div>
        </Col>

        <Col md={6}>
          <div className={styles.codeEditorWrapper}>
            <CodeEditor
              editorValue={userCode}
              onChange={setUserCode}
              onRun={runCode}
              onCheck={runAndCheckCode}
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
                      if (
                        window.confirm(
                          "Do you really want to reset your code? Your code will be lost."
                        )
                      ) {
                        reset();
                      }
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
                  <Tippy
                    content={
                      isPyodideReady ? (
                        <>
                          <kbd>{isMacOs ? "Cmd" : "Ctrl"}</kbd>
                          <span className="color-blue"> + </span>
                          <kbd>Enter ↵</kbd>
                        </>
                      ) : (
                        "Loading..."
                      )
                    }
                    className="tippy"
                    placement="bottom"
                    offset={[0, -4]}
                    theme="light"
                  >
                    <div
                      className={clsx(styles.button, styles.runButton, {
                        [styles.disabled]: !isPyodideReady,
                      })}
                      onClick={async (e) => {
                        if (!isPyodideReady) return;

                        e.preventDefault();
                        runCode();
                      }}
                    >
                      <IoPlay className={styles.reactIcon} />
                      <span className={styles.label}>Run</span>
                    </div>
                  </Tippy>

                  <Tippy
                    content={
                      isPyodideReady ? (
                        <>
                          <kbd>{isMacOs ? "Cmd" : "Ctrl"}</kbd>
                          <span className="color-blue"> + </span>
                          <kbd>Shift</kbd>
                          <span className="color-blue"> + </span>
                          <kbd>Enter ↵</kbd>
                        </>
                      ) : (
                        "Loading..."
                      )
                    }
                    className="tippy"
                    placement="bottom"
                    offset={[0, -4]}
                    theme="light"
                  >
                    <div
                      className={clsx(styles.button, styles.checkButton, {
                        [styles.disabled]: !isPyodideReady,
                      })}
                      onClick={(e) => {
                        if (!isPyodideReady) return;

                        e.preventDefault();
                        console.log("Button Clicked");

                        runAndCheckCode();
                      }}
                    >
                      <BsCheckCircle className={styles.reactIcon} />
                      <span className={styles.label}>Check</span>
                    </div>
                  </Tippy>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

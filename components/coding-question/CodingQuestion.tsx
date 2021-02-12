import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import _ from "lodash";
import { desktop } from "constants/media-query-strings";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import usePythonExecutor from "hooks/usePythonExecutor";
import useLocalStorage from "hooks/useLocalStorage";
import { Col, Row } from "react-bootstrap";
import { BiReset } from "react-icons/bi";
import { VscSymbolMethod, VscRunAll } from "react-icons/vsc";
import { IoPlay } from "react-icons/io5";
import Tippy from "@tippyjs/react";
import { toast } from "react-toastify";
import marked from "marked";
// import { isMacOs } from "react-device-detect";
import styles from "./CodingQuestion.module.scss";
import clsx from "clsx";

const CodeEditor = dynamic(() => import("components/CodeEditor"), {
  ssr: false,
});

interface ICodingQuestionProps {
  textMarkdown: string;
  starterCode?: string;
  testCode: string;
  solutionCode?: string;
  localStorageKey?: string;
  onSubmit: (boolean, string?) => void;
}

export default function CodingQuestion({
  textMarkdown,
  starterCode,
  testCode,
  solutionCode,
  localStorageKey,
  onSubmit,
}: ICodingQuestionProps) {
  const [userCode, setUserCode] = useState(starterCode);
  const [output, setOutput] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isScreenDesktop = useMediaQuery(desktop);
  const editorHeight = "400px";
  const [savedUserCode, setSavedUserCode] = useLocalStorage<string>(
    localStorageKey,
    starterCode
  );

  useEffect(() => {
    // Load user code from LocalStorage if key exists
    if (localStorageKey && savedUserCode) {
      setUserCode(savedUserCode);
    }
  }, []);

  const { isExecutorReady, runCode, runAndCheckCode } = usePythonExecutor();

  const reset = async () => {
    setUserCode(starterCode);
    setOutput("");
    setHasError(false);
    setErrorMessage("");
    toast("Reset Complete!");
  };

  const runUserCode = async () => {
    const result = await runCode(userCode);

    setOutput(result.stdout);
    setHasError(result.hasError);
    setErrorMessage(result.errorMessage);

    if (result.hasError) {
      toast.error("See the error message below.");
    } else {
      toast("Run complete.");

      if (!result.stdout) {
        toast.warning("Your code did not print anything.");
      }
    }
  };

  const runAndCheckUserCode = async () => {
    const result = await runAndCheckCode(userCode, testCode);

    setOutput(result.stdout);
    setHasError(result.hasError);
    setErrorMessage(result.errorMessage);

    if (result.hasError) {
      toast.error("See the error message below.");
      onSubmit(false, userCode);
    } else {
      toast.success("Nice!");
      onSubmit(true, userCode);
    }
  };

  const saveUserCodeToLocalStorage = useCallback(
    _.debounce((codeToSave) => {
      setSavedUserCode(codeToSave);
    }, 1000),
    []
  );

  const onChange = (newUserCode) => {
    setUserCode(newUserCode);

    if (localStorageKey) {
      saveUserCodeToLocalStorage(newUserCode);
    }
  };

  return (
    <div className={styles.codingQuestionWrapper}>
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
              onChange={onChange}
              onRun={runUserCode}
              onCheck={runAndCheckUserCode}
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
                    className={clsx(styles.button, styles.reset)}
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
                    className={clsx(styles.button, styles.solution)}
                    onClick={(e) => {
                      e.preventDefault();
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
                      isExecutorReady ? (
                        <>
                          {/* <kbd>{isMacOs ? "Cmd" : "Ctrl"}</kbd>
                          <span className="color-blue"> + </span>
                          <kbd>Enter ↵</kbd> */}
                          Run your code{" "}
                          <strong className="color-pink">without</strong>{" "}
                          checking correctness
                        </>
                      ) : (
                        "Loading..."
                      )
                    }
                    className="tippy"
                    placement="bottom"
                    offset={[0, -4]}
                    theme="light"
                    disabled={!isScreenDesktop}
                  >
                    <div
                      className={clsx(styles.button, styles.runButton, {
                        [styles.disabled]: !isExecutorReady,
                      })}
                      onClick={async (e) => {
                        if (!isExecutorReady) {
                          return;
                        }

                        e.preventDefault();
                        runUserCode();
                      }}
                    >
                      <IoPlay className={styles.reactIcon} />
                      <span className={styles.label}>Run</span>
                    </div>
                  </Tippy>

                  <Tippy
                    content={
                      isExecutorReady ? (
                        <>
                          {/* <kbd>{isMacOs ? "Cmd" : "Ctrl"}</kbd>
                          <span className="color-blue"> + </span>
                          <kbd>Shift</kbd>
                          <span className="color-blue"> + </span>
                          <kbd>Enter ↵</kbd> */}
                          Run your code{" "}
                          <strong className="color-purple">and</strong> check
                          correctness
                        </>
                      ) : (
                        "Loading..."
                      )
                    }
                    className="tippy"
                    placement="bottom"
                    offset={[0, -4]}
                    theme="light"
                    disabled={!isScreenDesktop}
                  >
                    <div
                      className={clsx(styles.button, styles.checkButton, {
                        [styles.disabled]: !isExecutorReady,
                      })}
                      onClick={(e) => {
                        if (!isExecutorReady) {
                          return;
                        }
                        e.preventDefault();

                        runAndCheckUserCode();
                      }}
                    >
                      <VscRunAll className={styles.reactIcon} />
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

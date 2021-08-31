import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import _ from "lodash";
import { largeDesktop } from "constants/media-query-strings";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import usePythonRuntime from "hooks/usePythonRuntime";
import useLocalStorage from "hooks/useLocalStorage";
import { Col, Row } from "react-bootstrap";
import { BiReset } from "react-icons/bi";
import { IoColorWandOutline } from "react-icons/io5";
import { VscSymbolMethod, VscRunAll } from "react-icons/vsc";
import { IoPlay } from "react-icons/io5";
import Tippy from "@tippyjs/react";
import { toast } from "react-toastify";
import marked from "marked";
import styles from "./PythonChallenge.module.scss";
import clsx from "clsx";
import { definitions } from "types/database";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import FormatterDiffModal from "components/CodeEditor/FormatterDiffModal";

const CodeEditor = dynamic(() => import("components/CodeEditor"), {
  ssr: false,
});

interface IPythonExerciseProps {
  challengeData: definitions["coding_challenges"];
  localStorageKey?: string;
  onSubmit: (boolean, string?) => void;
}

export default function PythonChallenge({
  challengeData,
  localStorageKey,
  onSubmit,
}: IPythonExerciseProps) {
  const { user } = useSupabaseAuth();
  const [userCode, setUserCode] = useState(challengeData.starter_code);
  const [showFormattedModal, setShowFormattedModal] = useState(false);
  const [output, setOutput] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isScreenLargeDesktop = useMediaQuery(largeDesktop);
  const editorHeight = "400px";
  const [savedUserCode, setSavedUserCode] = useLocalStorage<string>(
    localStorageKey,
    challengeData.starter_code
  );

  console.log(`isScreenDesktop=${isScreenLargeDesktop}`);

  useEffect(() => {
    // Load user code from LocalStorage if key exists
    if (localStorageKey && savedUserCode) {
      setUserCode(savedUserCode);
    }
  }, []);

  const { isRuntimeReady, runCode, runAndCheckCode } = usePythonRuntime();

  const reset = async () => {
    setUserCode(challengeData.starter_code);
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
      let message = "Run complete";

      if (!result.stdout) {
        message += " - your code did not print anything.";
      }

      toast(message);
    }
  };

  const runAndCheckUserCode = async () => {
    const result = await runAndCheckCode(userCode, challengeData.test_code);

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

  const autoformatCode = async () => {
    const runResult = await runCode(userCode);

    setOutput(runResult.stdout);
    setHasError(runResult.hasError);
    setErrorMessage(runResult.errorMessage);

    if (runResult.hasError) {
      toast.error("Please fix the error before formatting your code");
      return;
    }

    setShowFormattedModal(true);
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
    <div className={styles.codingChallengeWrapper}>
      <Row className="g-0">
        <Col lg={6}>
          <div
            className={styles.instructionTextWrapper}
            style={{ height: isScreenLargeDesktop ? editorHeight : "auto" }}
          >
            <div className={styles.instructionTextInner}>
              <span className="label green">Task</span>

              <div
                className={styles.textMarkdown}
                dangerouslySetInnerHTML={{
                  __html: marked(challengeData.text_markdown),
                }}
              />
            </div>
          </div>
        </Col>

        <Col lg={6}>
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

      <Row className="g-0">
        <Col lg={6} md={12} className={styles.outputCol}>
          <div
            className={clsx(styles.resultsWrapper, {
              [styles.hasOutput]: !!output,
            })}
          >
            <span className="label yellow">Output</span>
            <pre>{output ? output : "No Output"}</pre>
          </div>
        </Col>
        <Col lg={6} md={12} className={styles.outputCol}>
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

      <Row className="g-0">
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
                      user ? (
                        <>Autoformat your code using a formatter</>
                      ) : (
                        <>You must be signed in to use the autoformat feature</>
                      )
                    }
                    className="tippy"
                    placement="bottom"
                    offset={[0, -4]}
                    theme="light"
                    disabled={!isScreenLargeDesktop}
                  >
                    <div
                      className={clsx(styles.button, styles.runButton, {
                        [styles.disabled]: !user || !isRuntimeReady,
                      })}
                      onClick={async (e) => {
                        e.preventDefault();

                        if (!user || !isRuntimeReady) {
                          return;
                        }

                        await autoformatCode();
                      }}
                    >
                      <IoColorWandOutline className={styles.reactIcon} />
                      <span className={styles.label}>Format</span>
                    </div>
                  </Tippy>

                  <Tippy
                    content={
                      isRuntimeReady ? (
                        <>
                          {/* <kbd>{isMacOs ? "Cmd" : "Ctrl"}</kbd>
                          <span className="color-blue"> + </span>
                          <kbd>Enter ↵</kbd> */}
                          Run your code{" "}
                          <strong className="color-pink">without</strong>{" "}
                          submitting
                        </>
                      ) : (
                        "Loading..."
                      )
                    }
                    className="tippy"
                    placement="bottom"
                    offset={[0, -4]}
                    theme="light"
                    disabled={!isScreenLargeDesktop}
                  >
                    <div
                      className={clsx(styles.button, styles.runButton, {
                        [styles.disabled]: !isRuntimeReady,
                      })}
                      onClick={async (e) => {
                        if (!isRuntimeReady) {
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
                      isRuntimeReady ? (
                        <>
                          {/* <kbd>{isMacOs ? "Cmd" : "Ctrl"}</kbd>
                          <span className="color-blue"> + </span>
                          <kbd>Shift</kbd>
                          <span className="color-blue"> + </span>
                          <kbd>Enter ↵</kbd> */}
                          Submit your code{" "}
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
                    disabled={!isScreenLargeDesktop}
                  >
                    <div
                      className={clsx(styles.button, styles.checkButton, {
                        [styles.disabled]: !isRuntimeReady,
                      })}
                      onClick={(e) => {
                        if (!isRuntimeReady) {
                          return;
                        }
                        e.preventDefault();

                        runAndCheckUserCode();
                      }}
                    >
                      <VscRunAll className={styles.reactIcon} />
                      <span className={styles.label}>Submit</span>
                    </div>
                  </Tippy>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <FormatterDiffModal
        isOpen={showFormattedModal}
        onAccept={(formattedCode) => {
          onChange(formattedCode);
          setShowFormattedModal(false);
        }}
        onClose={() => setShowFormattedModal(false)}
        original={userCode}
        language="python"
      />
    </div>
  );
}

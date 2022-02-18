import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import debounce from "lodash/debounce";
import { useMeasure } from "react-use";
import { desktop } from "constants/media-query-strings";
import useMediaQuery from "@mui/material/useMediaQuery";
import usePythonRuntime from "hooks/usePythonRuntime";
import useLocalStorage from "hooks/useLocalStorage";
import { Col, Row } from "react-bootstrap";
import { BiReset } from "react-icons/bi";
import { IoCodeSharp } from "react-icons/io5";
import { RiUploadLine } from "react-icons/ri";
import { MdFormatShapes } from "react-icons/md";
import { IoPlay } from "react-icons/io5";
import { toast } from "react-toastify";
import styles from "./PythonChallenge.module.scss";
import clsx from "clsx";
import { definitions } from "types/database";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import FormatterDiffModal from "components/FormatterDiffModal";
import InstructionText from "./InstructionText";
import ChallengeButton from "./ChallengeButton";
import SolutionCodeModal from "./SolutionCodeModal";
import Chip from "components/common/Chip";
import { PythonRuntimeStatus } from "types/pyodide";

const CodeEditor = dynamic(() => import("components/CodeEditor"), {
  ssr: false,
});

interface IPythonExerciseProps {
  challengeData: definitions["coding_challenges"];
  localStorageKey?: string;
  showSolution?: boolean;
  onSubmit: (boolean, string?) => void;
}

export default function PythonChallenge({
  challengeData,
  localStorageKey,
  showSolution = true,
  onSubmit,
}: IPythonExerciseProps) {
  const { user } = useSupabaseAuth();
  const [userCode, setUserCode] = useState(challengeData.starter_code);
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [showFormattedModal, setShowFormattedModal] = useState(false);
  const [output, setOutput] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isScreenDesktop = useMediaQuery(desktop);
  const [savedUserCode, setSavedUserCode] = useLocalStorage<string>(
    localStorageKey,
    challengeData.starter_code
  );
  const [ref, { height: instructionTextHeight }] = useMeasure();
  const editorHeight = isScreenDesktop
    ? Math.max(instructionTextHeight, 400)
    : 400;

  useEffect(() => {
    // Load user code from LocalStorage if key exists
    if (localStorageKey && savedUserCode) {
      setUserCode(savedUserCode);
    }
  }, [localStorageKey]);

  const {
    status: pyodideStatus,
    runCode,
    runAndCheckCode,
  } = usePythonRuntime();
  const isRuntimeReady = pyodideStatus === PythonRuntimeStatus.READY;

  const reset = async () => {
    setUserCode(challengeData.starter_code);
    setSavedUserCode(challengeData.starter_code);
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
    debounce((codeToSave) => {
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
    <div className={styles.challengeWrapper}>
      <Row className="g-0">
        <Col lg={6}>
          {/* Use for dynamic height calculation with padding */}
          <div ref={ref}>
            <InstructionText
              isLoading={false}
              labelText="Task"
              textMarkdown={challengeData.text_markdown}
              className={styles.inner}
            />
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
            <Chip small>Output</Chip>
            <pre>{output ? output : "No Output"}</pre>
          </div>
        </Col>
        <Col lg={6} md={12} className={styles.outputCol}>
          <div
            className={clsx(styles.errorWrapper, {
              [styles.hasOutput]: hasError,
            })}
          >
            <Chip small>Error</Chip>
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
                  <ChallengeButton
                    className={styles.button}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Do you really want to reset your code? Your code will be lost."
                        )
                      ) {
                        reset();
                      }
                    }}
                    tooltip={<>Restore initial state</>}
                    label="Reset"
                    IconComponent={BiReset}
                  />

                  {showSolution && (
                    <ChallengeButton
                      className={styles.button}
                      onClick={() => setShowSolutionModal(true)}
                      tooltip={<>View solution code</>}
                      label="Solution"
                      IconComponent={IoCodeSharp}
                    />
                  )}
                </div>
              </Col>

              <Col>
                <div className={styles.rightControls}>
                  <ChallengeButton
                    className={styles.button}
                    onClick={async () => {
                      await autoformatCode();
                    }}
                    tooltip={
                      user ? (
                        <>Autoformat your code using a formatter</>
                      ) : (
                        <>You must be signed in to use the autoformat feature</>
                      )
                    }
                    disabled={!user || !isRuntimeReady}
                    label="Format"
                    IconComponent={MdFormatShapes}
                  />

                  <ChallengeButton
                    className={styles.button}
                    onClick={async () => {
                      await runUserCode();
                    }}
                    tooltip={
                      isRuntimeReady ? (
                        <>
                          {/* <kbd>{isMacOs ? "Cmd" : "Ctrl"}</kbd>
                          <span className="color-blue"> + </span>
                          <kbd>Enter ↵</kbd> */}
                          Run your code{" "}
                          <strong className="color-red">without</strong>{" "}
                          submitting
                        </>
                      ) : (
                        "Loading..."
                      )
                    }
                    disabled={!isRuntimeReady}
                    label="Run"
                    IconComponent={IoPlay}
                  />

                  <ChallengeButton
                    className={styles.button}
                    onClick={async () => {
                      await runAndCheckUserCode();
                    }}
                    tooltip={
                      isRuntimeReady ? (
                        <>
                          {/* <kbd>{isMacOs ? "Cmd" : "Ctrl"}</kbd>
                          <span className="color-blue"> + </span>
                          <kbd>Shift</kbd>
                          <span className="color-blue"> + </span>
                          <kbd>Enter ↵</kbd> */}
                          Submit your code{" "}
                          <strong className="color-blue">and</strong> check
                          correctness
                        </>
                      ) : (
                        "Loading..."
                      )
                    }
                    disabled={!isRuntimeReady}
                    label="Check"
                    IconComponent={RiUploadLine}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <SolutionCodeModal
        isOpen={showSolutionModal}
        onClose={() => setShowSolutionModal(false)}
        cid={challengeData.id}
        language="python"
      />

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

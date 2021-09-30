import dynamic from "next/dynamic";
import { useState } from "react";
import usePythonRuntime from "hooks/usePythonRuntime";
import { IoPlay } from "react-icons/io5";
import { VscRunAll } from "react-icons/vsc";
import produce from "immer";
import _ from "lodash";
import styles from "./PythonChallengeEditor.module.scss";
import clsx from "clsx";
import { ICodeExecutionResult } from "types/pyodide";
import { definitions } from "types/database";
import ChallengeEditorControlBar from "./ChallengeEditorControlBar";

const CodeEditor = dynamic(() => import("components/CodeEditor"), {
  ssr: false,
});

interface IPythonChallengeEditorProps {
  qid: number;
  challengeData: definitions["coding_challenges"];
  solutionData: definitions["coding_challenge_solutions"];
  onSave: (
    newChallengeData: definitions["coding_challenges"],
    newSolutionData: definitions["coding_challenge_solutions"]
  ) => void;
  onDelete: () => void;
  onClone: () => void;
}

export default function PythonChallengeEditor({
  qid,
  challengeData,
  solutionData,
  onSave,
  onDelete,
  onClone,
}: IPythonChallengeEditorProps) {
  const [workingChallengeData, setWorkingChallengeData] = useState<
    definitions["coding_challenges"]
  >(_.cloneDeep(challengeData));
  const [workingSolutionData, setWorkingSolutionData] = useState<
    definitions["coding_challenge_solutions"]
  >(_.cloneDeep(solutionData));
  const { isRuntimeReady, runCode, runAndCheckCode } = usePythonRuntime();

  const didChange =
    !_.isEqual(challengeData, workingChallengeData) ||
    !_.isEqual(solutionData, workingSolutionData);

  const updateWorkingChallengeData = (key, val) => {
    const updatedChallengeData = produce(workingChallengeData, (draft) => {
      draft[key] = val;
    });

    setWorkingChallengeData(updatedChallengeData);
  };

  const updateWorkingSolutionData = (key, val) => {
    const updateSolutionData = produce(workingSolutionData, (draft) => {
      draft[key] = val;
    });

    setWorkingSolutionData(updateSolutionData);
  };

  const save = async () => {
    await onSave(workingChallengeData, workingSolutionData);
  };

  const clone = async () => {
    if (didChange) {
      if (
        window.confirm(
          "You must save your changes to clone this challenge. Save and continue?"
        )
      ) {
        await save();
      } else {
        return;
      }
    }

    await onClone();
  };

  const displayCodeExecutionResult = (result: ICodeExecutionResult) => {
    if (result.hasError) {
      window.alert(`Error\n\n${result.errorMessage}`);
    } else {
      window.alert(`Output\n\n${result.stdout}`);
    }
  };

  const runStarterCode = async () => {
    if (!isRuntimeReady) {
      return;
    }

    const result = await runCode(workingChallengeData.starter_code);
    displayCodeExecutionResult(result);
  };

  const runAndCheckStarterCode = async () => {
    if (!isRuntimeReady) {
      return;
    }

    const result = await runAndCheckCode(
      workingChallengeData.starter_code,
      workingChallengeData.test_code
    );
    displayCodeExecutionResult(result);
  };

  const runSolutionCode = async () => {
    if (!isRuntimeReady) {
      return;
    }

    const result = await runCode(workingSolutionData.solution_code);
    displayCodeExecutionResult(result);
  };

  const runAndCheckSolutionCode = async () => {
    if (!isRuntimeReady) {
      return;
    }

    const result = await runAndCheckCode(
      workingSolutionData.solution_code,
      workingChallengeData.test_code
    );

    displayCodeExecutionResult(result);
  };

  return (
    <div className={styles.challengeEditPage}>
      <ChallengeEditorControlBar
        challengeId={qid}
        permalink={`${window.location.origin}/python-challenge/view/${qid}`}
        backUrl="/python-challenge/list"
        onDelete={onDelete}
        clone={clone}
        title={workingChallengeData.title}
        setTitle={(val) => updateWorkingChallengeData("title", val)}
        save={save}
      />

      <div className={styles.challengeAndTemplate}>
        <div className={clsx(styles.challengeText, styles.editorBox)}>
          <div className={styles.boxHeader}>
            <div className={styles.boxTitle}>
              <span className={styles.boxTitle}>Challenge Text</span>
              <span className="accent purple" />
            </div>
          </div>

          <div className={styles.codeEditorWrapper}>
            <textarea
              className={styles.challengeTextarea}
              value={workingChallengeData.text_markdown}
              onChange={(e) =>
                updateWorkingChallengeData("text_markdown", e.target.value)
              }
            />
          </div>
        </div>

        <div className={clsx(styles.starter, styles.editorBox)}>
          <div className={styles.boxHeader}>
            <div className={styles.boxTitle}>
              <span>Starter</span>
              <span className="accent blue" />
            </div>

            <div className={styles.boxControls}>
              <span
                className={clsx(styles.iconButton, {
                  [styles.disabled]: !isRuntimeReady,
                })}
                onClick={runStarterCode}
              >
                <IoPlay className={styles.reactIcon} />
              </span>

              <span
                className={clsx(styles.iconButton, {
                  [styles.disabled]: !isRuntimeReady,
                })}
                onClick={runAndCheckStarterCode}
              >
                <VscRunAll className={styles.reactIcon} />
              </span>
            </div>
          </div>

          <div className={styles.codeEditorWrapper}>
            <CodeEditor
              editorValue={workingChallengeData.starter_code}
              onChange={(v) => updateWorkingChallengeData("starter_code", v)}
              onRun={runStarterCode}
              onCheck={runAndCheckStarterCode}
              language="python"
              height="calc(50vh - 55px)"
            />
          </div>
        </div>
      </div>

      <div className={styles.solutionAndCheck}>
        <div className={clsx(styles.solution, styles.editorBox)}>
          <div className={styles.boxHeader}>
            <div className={styles.boxTitle}>
              <span>Solution</span>
              <span className="accent green" />
            </div>

            <div className={styles.boxControls}>
              <span
                className={clsx(styles.iconButton, {
                  [styles.disabled]: !isRuntimeReady,
                })}
                onClick={runSolutionCode}
              >
                <IoPlay className={styles.reactIcon} />
              </span>

              <span
                className={clsx(styles.iconButton, {
                  [styles.disabled]: !isRuntimeReady,
                })}
                onClick={runAndCheckSolutionCode}
              >
                <VscRunAll className={styles.reactIcon} />
              </span>
            </div>
          </div>

          <div className={styles.codeEditorWrapper}>
            <CodeEditor
              editorValue={workingSolutionData.solution_code}
              onChange={(v) => updateWorkingSolutionData("solution_code", v)}
              onRun={runSolutionCode}
              onCheck={runAndCheckSolutionCode}
              language="python"
              height="calc(50vh - 55px)"
            />
          </div>
        </div>

        <div className={clsx(styles.testCases, styles.editorBox)}>
          <div className={styles.boxHeader}>
            <div className={styles.boxTitle}>
              <span>Test Cases</span>
              <span className="accent pink" />
            </div>
          </div>

          <div className={styles.codeEditorWrapper}>
            <CodeEditor
              editorValue={workingChallengeData.test_code}
              onChange={(v) => updateWorkingChallengeData("test_code", v)}
              onRun={() => {}}
              language="python"
              height="calc(50vh - 55px)"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

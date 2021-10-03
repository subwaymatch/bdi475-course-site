import dynamic from "next/dynamic";
import { useState } from "react";
import usePythonRuntime from "hooks/usePythonRuntime";
import { IoPlay } from "react-icons/io5";
import { VscRunAll } from "react-icons/vsc";
import { BsArrowUpRight } from "react-icons/bs";
import { MdFormatShapes } from "react-icons/md";
import produce from "immer";
import _ from "lodash";
import styles from "./PythonChallengeEditor.module.scss";
import clsx from "clsx";
import { ICodeExecutionResult } from "types/pyodide";
import { definitions } from "types/database";
import ChallengeEditorControlBar from "./ChallengeEditorControlBar";
import FormatterDiffModal from "components/FormatterDiffModal";

const CodeEditor = dynamic(() => import("components/CodeEditor"), {
  ssr: false,
});

enum CodeTypeEnum {
  SOLUTION_CODE = "SOLUTION_CODE",
  SOLUTION_AND_TEST_CODE = "SOLUTION_AND_TEST_CODE",
}

interface IPythonChallengeEditorProps {
  id: number;
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
  id,
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
  const [codeTypeToFormat, setCodeTypeToFormat] = useState<CodeTypeEnum | null>(
    null
  );
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
        challengeId={id}
        permalink={`${window.location.origin}/python-challenge/view/${id}`}
        backUrl="/python-challenge/list"
        onDelete={onDelete}
        clone={clone}
        title={workingChallengeData.title}
        setTitle={(val) => updateWorkingChallengeData("title", val)}
        save={save}
      />

      <div className={styles.boxesRow}>
        <div className={styles.sectionBox}>
          <div className={styles.boxHeader}>
            <div className={styles.boxTitle}>
              <span className={styles.boxTitle}>Challenge Text Markdown</span>
              <span className="accent purple" />
            </div>
          </div>

          <div className={styles.sectionContentWrapper}>
            <div className={styles.preventOverflow}>
              <textarea
                className={styles.fullTextArea}
                value={workingChallengeData.text_markdown}
                onChange={(e) =>
                  updateWorkingChallengeData("text_markdown", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className={styles.sectionBox}>
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

          <div className={styles.sectionContentWrapper}>
            <div className={styles.preventOverflow}>
              <CodeEditor
                editorValue={workingChallengeData.starter_code}
                onChange={(v) => updateWorkingChallengeData("starter_code", v)}
                onRun={runStarterCode}
                onCheck={runAndCheckStarterCode}
                language="python"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.boxesRow}>
        <div className={styles.sectionBox}>
          <div className={styles.boxHeader}>
            <div className={styles.boxTitle}>
              <span>Solution</span>
              <span className="accent green" />
            </div>

            <div className={styles.boxControls}>
              <span
                className={styles.iconButton}
                onClick={() => {
                  setCodeTypeToFormat(CodeTypeEnum.SOLUTION_CODE);
                }}
              >
                <MdFormatShapes className={styles.reactIcon} />
              </span>

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

              <span
                className={styles.iconButton}
                onClick={() => {
                  updateWorkingChallengeData(
                    "starter_code",
                    workingSolutionData.solution_code
                  );
                }}
              >
                <BsArrowUpRight className={styles.reactIcon} />
              </span>
            </div>
          </div>

          <div className={styles.sectionContentWrapper}>
            <div className={styles.preventOverflow}>
              <CodeEditor
                editorValue={workingSolutionData.solution_code}
                onChange={(v) => updateWorkingSolutionData("solution_code", v)}
                onRun={runSolutionCode}
                onCheck={runAndCheckSolutionCode}
                language="python"
              />
            </div>
          </div>
        </div>

        <div className={styles.sectionBox}>
          <div className={styles.boxHeader}>
            <div className={styles.boxTitle}>
              <span>Test Cases</span>
              <span className="accent pink" />
            </div>

            <div className={styles.boxControls}>
              <span
                className={styles.iconButton}
                onClick={() => {
                  setCodeTypeToFormat(CodeTypeEnum.SOLUTION_AND_TEST_CODE);
                }}
              >
                <MdFormatShapes className={styles.reactIcon} />
              </span>
            </div>
          </div>

          <div className={styles.sectionContentWrapper}>
            <div className={styles.preventOverflow}>
              <CodeEditor
                editorValue={workingChallengeData.test_code}
                onChange={(v) => updateWorkingChallengeData("test_code", v)}
                onRun={() => {}}
                language="python"
              />
            </div>
          </div>
        </div>
      </div>

      <FormatterDiffModal
        isOpen={codeTypeToFormat !== null}
        onAccept={async (formattedCode) => {
          if (codeTypeToFormat === CodeTypeEnum.SOLUTION_CODE) {
            updateWorkingSolutionData("solution_code", formattedCode);
          } else if (codeTypeToFormat === CodeTypeEnum.SOLUTION_AND_TEST_CODE) {
            const response = await fetch(
              process.env.NEXT_PUBLIC_BLACK_LAMBDA_ENDPOINT,
              {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  source: workingSolutionData.solution_code,
                }),
              }
            );

            const solutionFormatResult = await response.json();
            const formattedSolutionCode = solutionFormatResult.formatted_code;
            // TODO: Handle formatting of both solution and test code
            // DO NOTHING
            updateWorkingChallengeData(
              "test_code",
              formattedCode.slice(formattedSolutionCode.length).trimStart()
            );
          }

          setCodeTypeToFormat(null);
        }}
        onClose={() => setCodeTypeToFormat(null)}
        original={
          codeTypeToFormat === CodeTypeEnum.SOLUTION_CODE
            ? workingSolutionData.solution_code
            : workingSolutionData.solution_code +
              "\n\n" +
              workingChallengeData.test_code
        }
        language="python"
      />
    </div>
  );
}

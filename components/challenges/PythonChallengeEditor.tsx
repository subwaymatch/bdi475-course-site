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
import { ICodeExecutionResult } from "types/pyodide";
import { definitions } from "types/database";
import ChallengeEditorControlBar from "./ChallengeEditorControlBar";
import EditorSectionBox from "./EditorSectionBox";
import FormatterDiffModal from "components/FormatterDiffModal";
import { ColorTheme } from "types/color-theme";
import { removeSolutionPortion } from "utils/code-utils";

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
  onSave: (newChallengeData: definitions["coding_challenges"]) => void;
  onDelete: () => void;
  onClone: () => void;
}

export default function PythonChallengeEditor({
  id,
  challengeData,
  onSave,
  onDelete,
  onClone,
}: IPythonChallengeEditorProps) {
  const [workingChallengeData, setWorkingChallengeData] = useState<
    definitions["coding_challenges"]
  >(_.cloneDeep(challengeData));
  const [codeTypeToFormat, setCodeTypeToFormat] = useState<CodeTypeEnum | null>(
    null
  );
  const { isRuntimeReady, runCode, runAndCheckCode } = usePythonRuntime();

  const didChange = !_.isEqual(challengeData, workingChallengeData);

  const updateWorkingChallengeData = (key, val) => {
    const updatedChallengeData = produce(workingChallengeData, (draft) => {
      draft[key] = val;
    });

    setWorkingChallengeData(updatedChallengeData);
  };

  const save = async () => {
    await onSave(workingChallengeData);
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

    const result = await runCode(workingChallengeData.solution_code);
    displayCodeExecutionResult(result);
  };

  const runAndCheckSolutionCode = async () => {
    if (!isRuntimeReady) {
      return;
    }

    const result = await runAndCheckCode(
      workingChallengeData.solution_code,
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
        <EditorSectionBox
          title="Challenge Text Markdown"
          colorTheme={ColorTheme.Purple}
        >
          <textarea
            className={styles.fullTextArea}
            value={workingChallengeData.text_markdown}
            onChange={(e) =>
              updateWorkingChallengeData("text_markdown", e.target.value)
            }
          />
        </EditorSectionBox>

        <EditorSectionBox
          title="Starter"
          colorTheme={ColorTheme.Blue}
          iconButtons={[
            {
              Icon: IoPlay,
              onClick: runStarterCode,
              tooltip: "Run starter code",
              disabled: !isRuntimeReady,
            },
            {
              Icon: VscRunAll,
              onClick: runAndCheckStarterCode,
              tooltip: "Run and check starter code",
              disabled: !isRuntimeReady,
            },
          ]}
        >
          <CodeEditor
            editorValue={workingChallengeData.starter_code}
            onChange={(v) => updateWorkingChallengeData("starter_code", v)}
            onRun={runStarterCode}
            onCheck={runAndCheckStarterCode}
            language="python"
          />
        </EditorSectionBox>
      </div>

      <div className={styles.boxesRow}>
        <EditorSectionBox
          title="Solution"
          colorTheme={ColorTheme.Green}
          iconButtons={[
            {
              Icon: MdFormatShapes,
              onClick: () => setCodeTypeToFormat(CodeTypeEnum.SOLUTION_CODE),
              tooltip: "Format code",
            },
            {
              Icon: IoPlay,
              onClick: runSolutionCode,
              tooltip: "Run solution code",
              disabled: !isRuntimeReady,
            },
            {
              Icon: VscRunAll,
              onClick: runAndCheckSolutionCode,
              tooltip: "Run and check solution code",
              disabled: !isRuntimeReady,
            },
            {
              Icon: BsArrowUpRight,
              onClick: () => {
                const processedCode = removeSolutionPortion(
                  workingChallengeData.solution_code
                );

                updateWorkingChallengeData("starter_code", processedCode);
              },
            },
          ]}
        >
          <CodeEditor
            editorValue={workingChallengeData.solution_code}
            onChange={(v) => updateWorkingChallengeData("solution_code", v)}
            onRun={runSolutionCode}
            onCheck={runAndCheckSolutionCode}
            language="python"
          />
        </EditorSectionBox>

        <EditorSectionBox
          title="Test Cases"
          colorTheme={ColorTheme.Pink}
          iconButtons={[
            {
              Icon: MdFormatShapes,
              onClick: () =>
                setCodeTypeToFormat(CodeTypeEnum.SOLUTION_AND_TEST_CODE),
              tooltip: "Format code",
            },
          ]}
        >
          <CodeEditor
            editorValue={workingChallengeData.test_code}
            onChange={(v) => updateWorkingChallengeData("test_code", v)}
            onRun={() => {}}
            language="python"
          />
        </EditorSectionBox>
      </div>

      <FormatterDiffModal
        isOpen={codeTypeToFormat !== null}
        onAccept={async (formattedCode) => {
          if (codeTypeToFormat === CodeTypeEnum.SOLUTION_CODE) {
            updateWorkingChallengeData("solution_code", formattedCode.trim());
          } else if (codeTypeToFormat === CodeTypeEnum.SOLUTION_AND_TEST_CODE) {
            // Formatting only the test cases will not work as the code only contains incomplete parts
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
                  source: workingChallengeData.solution_code,
                }),
              }
            );

            const solutionFormatResult = await response.json();
            const formattedSolutionCode = solutionFormatResult.formatted_code;
            const formattedTestCode = formattedCode
              .slice(formattedSolutionCode.length)
              .trim();

            // Only extract the test cases portion
            updateWorkingChallengeData("test_code", formattedTestCode);
          }

          setCodeTypeToFormat(null);
        }}
        onClose={() => setCodeTypeToFormat(null)}
        original={
          codeTypeToFormat === CodeTypeEnum.SOLUTION_CODE
            ? workingChallengeData.solution_code
            : workingChallengeData.solution_code +
              "\n\n" +
              workingChallengeData.test_code
        }
        language="python"
      />
    </div>
  );
}

import dynamic from "next/dynamic";
import { useState } from "react";
import usePythonRuntime from "hooks/usePythonRuntime";
import { IoPlay } from "react-icons/io5";
import { VscRunAll } from "react-icons/vsc";
import { BsArrowUpRight } from "react-icons/bs";
import { MdFormatShapes } from "react-icons/md";
import produce from "immer";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import styles from "./PythonChallengeEditor.module.scss";
import { ICodeExecutionResult, PythonRuntimeStatus } from "types/pyodide";
import { definitions } from "types/database";
import ChallengeEditorControlBar from "./ChallengeEditorControlBar";
import EditorSectionBox from "./EditorSectionBox";
import FormatterDiffModal from "components/FormatterDiffModal";
import { ColorTheme } from "types/color-theme";
import { removeSolutionPortion } from "utils/code-utils";
import { toast } from "react-toastify";

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
  save: (
    newChallengeData: definitions["coding_challenges"]
  ) => Promise<boolean>;
  clone: () => Promise<void>;
  deleteChallenge: () => Promise<void>;
}

export default function PythonChallengeEditor({
  id,
  challengeData,
  save,
  clone,
  deleteChallenge,
}: IPythonChallengeEditorProps) {
  const [workingChallengeData, setWorkingChallengeData] = useState<
    definitions["coding_challenges"]
  >(cloneDeep(challengeData));
  const [codeTypeToFormat, setCodeTypeToFormat] = useState<CodeTypeEnum | null>(
    null
  );
  const {
    status: pyodideStatus,
    runCode,
    runAndCheckCode,
  } = usePythonRuntime();
  const isRuntimeReady = pyodideStatus === PythonRuntimeStatus.READY;

  const didChange = !isEqual(challengeData, workingChallengeData);

  const updateWorkingChallengeData = (key, val) => {
    const updatedChallengeData = produce(workingChallengeData, (draft) => {
      draft[key] = val;
    });

    setWorkingChallengeData(updatedChallengeData);
  };

  const saveWorkingData = async () => {
    const isSaveSuccessful = await save(workingChallengeData);

    if (isSaveSuccessful) {
      toast.success("Save successful");
    } else {
      toast.error("Error saving challenge, check console");
    }
  };

  const handleClone = async () => {
    if (didChange) {
      if (
        window.confirm(
          "You must save your changes to clone this challenge. Save and continue?"
        )
      ) {
        await save(workingChallengeData);
      } else {
        return;
      }
    }

    await clone();
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
        backUrl="/python-challenge/list"
        onDelete={deleteChallenge}
        clone={handleClone}
        title={workingChallengeData.title}
        setTitle={(val) => updateWorkingChallengeData("title", val)}
        save={saveWorkingData}
      />

      <div className={styles.boxesRow}>
        <EditorSectionBox
          title="Challenge Text Markdown"
          colorTheme={ColorTheme.Purple}
        >
          <textarea
            className={styles.fullTextarea}
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
              tooltip: (
                <>
                  Run <span className="color-purple">and</span> check
                  correctness
                </>
              ),
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
              tooltip: (
                <>
                  Run <span className="color-purple">and</span> check
                  correctness
                </>
              ),
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
              tooltip: "Generate starter code",
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

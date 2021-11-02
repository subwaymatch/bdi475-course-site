import { useEffect, useState } from "react";
import produce from "immer";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import styles from "./MultipleChoiceEditor.module.scss";
import { definitions } from "types/database";
import ChallengeEditorControlBar from "./ChallengeEditorControlBar";
import InstructionText from "../view/InstructionText";
import EditorSectionBox from "./EditorSectionBox";
import { ColorTheme } from "types/color-theme";
import MultipleChoiceOption from "../view/MultipleChoiceOption";
import MultipleChoiceOptionsEditor from "./MultipleChoiceOptionsEditor";

interface IMultipleChoiceEditorProps {
  id: number;
  questionData: definitions["multiple_choice_questions"];
  optionsData: definitions["multiple_choice_options"][];
  onSave: (
    newQuestionData: definitions["multiple_choice_questions"],
    newOptionsData: definitions["multiple_choice_options"][],
    displayToast?: boolean
  ) => void;
  onDelete: () => void;
  onClone: () => void;
}

export default function MultipleChoiceEditor({
  id,
  questionData,
  optionsData,
  onSave,
  onDelete,
  onClone,
}: IMultipleChoiceEditorProps) {
  const [workingQuestionData, setWorkingQuestionData] = useState<
    definitions["multiple_choice_questions"]
  >(cloneDeep(questionData));
  const [workingOptionsData, setWorkingOptionsData] = useState<
    definitions["multiple_choice_options"][]
  >(cloneDeep(optionsData));
  const didChange =
    !isEqual(questionData, workingQuestionData) ||
    !isEqual(optionsData, workingOptionsData);

  useEffect(() => {
    // Update working options data from props
    // If a user creates a new option and saves it,
    // a new option id will be created that can only
    // be retrieved from the optionsData prop
    setWorkingOptionsData(cloneDeep(optionsData));
  }, [optionsData]);

  const updateWorkingQuestionData = (key, val) => {
    const updatedQuestionData = produce(workingQuestionData, (draft) => {
      draft[key] = val;
    });

    setWorkingQuestionData(updatedQuestionData);
  };

  const save = async (displayToast = true) => {
    await onSave(workingQuestionData, workingOptionsData, displayToast);
  };

  const clone = async () => {
    if (didChange) {
      if (
        window.confirm(
          "You must save your changes to clone this challenge. Save and continue?"
        )
      ) {
        await save(false);
      } else {
        return;
      }
    }

    await onClone();
  };

  return (
    <div className={styles.challengeEditPage}>
      <ChallengeEditorControlBar
        challengeId={id}
        backUrl="/multiple-choice/list"
        onDelete={onDelete}
        clone={clone}
        title={workingQuestionData.title}
        setTitle={(val) => updateWorkingQuestionData("title", val)}
        save={save}
      />

      <div className={styles.boxesRow}>
        <EditorSectionBox
          title="Question Markdown"
          colorTheme={ColorTheme.Purple}
        >
          <textarea
            className={styles.fullTextarea}
            value={workingQuestionData.text_markdown}
            onChange={(e) =>
              updateWorkingQuestionData("text_markdown", e.target.value)
            }
          />
        </EditorSectionBox>

        <EditorSectionBox
          title="Options Markdown"
          colorTheme={ColorTheme.Green}
          allowScroll
        >
          <MultipleChoiceOptionsEditor
            optionsData={workingOptionsData}
            questionData={workingQuestionData}
            setOptionsData={setWorkingOptionsData}
          />
        </EditorSectionBox>
      </div>

      <div className={styles.boxesRow}>
        <EditorSectionBox
          title="Question Preview"
          colorTheme={ColorTheme.Blue}
          allowScroll
        >
          <div className={styles.inner}>
            <InstructionText
              isLoading={workingQuestionData ? false : true}
              labelText={null}
              textMarkdown={workingQuestionData?.text_markdown}
            />
          </div>
        </EditorSectionBox>

        <EditorSectionBox title="Options Preview" colorTheme={ColorTheme.Pink}>
          <div className={styles.inner}>
            {workingOptionsData?.map((o) => (
              <MultipleChoiceOption
                key={o.id}
                isSelected={false}
                disabled={true}
                optionData={o}
                answerData={null}
                onClick={() => {}}
                showResult={false}
              />
            ))}
          </div>
        </EditorSectionBox>
      </div>
    </div>
  );
}

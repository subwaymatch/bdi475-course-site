import { useState } from "react";
import { IoPlay } from "react-icons/io5";
import produce from "immer";
import _ from "lodash";
import styles from "./MultipleChoiceEditor.module.scss";
import clsx from "clsx";
import { definitions } from "types/database";
import ChallengeEditorControlBar from "./ChallengeEditorControlBar";
import InstructionText from "./InstructionText";
import EditorSectionBox from "./EditorSectionBox";
import { ColorTheme } from "types/color-theme";

interface IMultipleChoiceEditorProps {
  id: number;
  questionData: definitions["multiple_choice_questions"];
  optionsData: definitions["multiple_choice_options"][];
  onSave: (
    newQuestionData: definitions["multiple_choice_questions"],
    newOptionsData: definitions["multiple_choice_options"][]
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
  >(_.cloneDeep(questionData));
  const [workingOptionsData, setWorkingOptionsData] = useState<
    definitions["multiple_choice_options"][]
  >(_.cloneDeep(optionsData));
  const didChange =
    !_.isEqual(questionData, workingQuestionData) ||
    !_.isEqual(optionsData, workingOptionsData);

  const updateWorkingQuestionData = (key, val) => {
    const updatedQuestionData = produce(workingQuestionData, (draft) => {
      draft[key] = val;
    });

    setWorkingQuestionData(updatedQuestionData);
  };

  const updateWorkingOptionsData = (optionId, key, val) => {
    const newOptions = _.cloneDeep(workingOptionsData).map((o) => {
      if (o.id === optionId) {
        o[key] = val;
      }

      return o;
    });

    setWorkingOptionsData(newOptions);
  };

  const save = async () => {
    await onSave(workingQuestionData, workingOptionsData);
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

  return (
    <div className={styles.challengeEditPage}>
      <ChallengeEditorControlBar
        challengeId={id}
        permalink={`${window.location.origin}/python-challenge/view/${id}`}
        backUrl="/python-challenge/list"
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
            className={styles.fullTextArea}
            value={workingQuestionData.text_markdown}
            onChange={(e) =>
              updateWorkingQuestionData("text_markdown", e.target.value)
            }
          />
        </EditorSectionBox>

        <EditorSectionBox
          title="Options Markdown"
          colorTheme={ColorTheme.Green}
        >
          <h2>Some header</h2>
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
          <h2>Some header</h2>
        </EditorSectionBox>
      </div>
    </div>
  );
}

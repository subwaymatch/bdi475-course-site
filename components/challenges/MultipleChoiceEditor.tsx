import { useState } from "react";
import { IoPlay } from "react-icons/io5";
import produce from "immer";
import _ from "lodash";
import styles from "./MultipleChoiceEditor.module.scss";
import clsx from "clsx";
import { definitions } from "types/database";
import ChallengeEditorControlBar from "./ChallengeEditorControlBar";
import InstructionText from "./InstructionText";

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
        <div className={styles.sectionBox}>
          <div className={styles.boxHeader}>
            <div className={styles.boxTitle}>
              <span>Question Markdown</span>
              <span className="accent purple" />
            </div>
          </div>

          <div className={styles.sectionContentWrapper}>
            <div className={styles.preventOverflow}>
              <textarea
                className={styles.fullTextArea}
                value={workingQuestionData.text_markdown}
                onChange={(e) =>
                  updateWorkingQuestionData("text_markdown", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className={styles.sectionBox}>
          <div className={styles.boxHeader}>
            <div className={styles.boxTitle}>
              <span>Options Markdown</span>
              <span className="accent green" />
            </div>
          </div>

          <div className={styles.sectionContentWrapper}>
            <h2>Some header</h2>
          </div>
        </div>
      </div>

      <div className={styles.boxesRow}>
        <div className={styles.sectionBox}>
          <div className={styles.boxHeader}>
            <div className={styles.boxTitle}>
              <span>Question Preview</span>
              <span className="accent green" />
            </div>
          </div>

          <div className={styles.sectionContentWrapper}>
            <div className={styles.inner}>
              <InstructionText
                isLoading={workingQuestionData ? false : true}
                labelText={null}
                textMarkdown={workingQuestionData?.text_markdown}
              />
            </div>
          </div>
        </div>

        <div className={styles.sectionBox}>
          <div className={styles.boxHeader}>
            <div className={styles.boxTitle}>
              <span>Options Preview</span>
              <span className="accent pink" />
            </div>
          </div>

          <div className={styles.sectionContentWrapper}>
            <h2>Some header</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

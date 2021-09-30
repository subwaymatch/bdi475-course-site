import { useState } from "react";
import { IoPlay } from "react-icons/io5";
import produce from "immer";
import _ from "lodash";
import styles from "./MultipleChoiceEditor.module.scss";
import clsx from "clsx";
import { definitions } from "types/database";
import ChallengeEditorControlBar from "./ChallengeEditorControlBar";

interface IMultipleChoiceEditorProps {
  qid: number;
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
  qid,
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
        challengeId={qid}
        permalink={`${window.location.origin}/python-challenge/view/${qid}`}
        backUrl="/python-challenge/list"
        onDelete={onDelete}
        clone={clone}
        title={workingQuestionData.title}
        setTitle={(val) => updateWorkingQuestionData("title", val)}
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
              value={workingQuestionData.text_markdown}
              onChange={(e) =>
                updateWorkingQuestionData("text_markdown", e.target.value)
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
              <span className={clsx(styles.iconButton)} onClick={() => {}}>
                <IoPlay className={styles.reactIcon} />
              </span>
            </div>
          </div>

          <div className={styles.codeEditorWrapper}>Code Editor Portion</div>
        </div>
      </div>

      <div className={styles.solutionAndCheck}>
        <div className={clsx(styles.solution, styles.editorBox)}>
          <div className={styles.boxHeader}>
            <div className={styles.boxTitle}>
              <span>Solution</span>
              <span className="accent green" />
            </div>

            <div className={styles.boxControls}></div>
          </div>

          <div className={styles.codeEditorWrapper}>Code Editor Portion</div>
        </div>

        <div className={clsx(styles.testCases, styles.editorBox)}>
          <div className={styles.boxHeader}>
            <div className={styles.boxTitle}>
              <span>Test Cases</span>
              <span className="accent pink" />
            </div>
          </div>

          <div className={styles.codeEditorWrapper}>Code Editor Portion</div>
        </div>
      </div>
    </div>
  );
}

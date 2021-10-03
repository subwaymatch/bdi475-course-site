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

          <div className={styles.sectionContentWrapper}>Text</div>
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
              <span className="accent purple" />
            </div>
          </div>

          <div className={styles.sectionContentWrapper}>
            <h2>Some header</h2>
          </div>
        </div>

        <div className={styles.sectionBox}>
          <div className={styles.boxHeader}>
            <div className={styles.boxTitle}>
              <span>Options Preview</span>
              <span className="accent purple" />
            </div>
          </div>

          <div className={styles.sectionContentWrapper}>
            <h2>Some header</h2>
          </div>
        </div>
      </div>

      {/* 
      <div className={styles.editBoxes}>
        <div className={clsx(styles.challengeText, styles.editorBox)}>
          <div className={styles.boxHeader}>
            <div className={styles.boxTitle}>
              <span className={styles.boxTitle}>Challenge Text</span>
              <span className="accent purple" />
            </div>
          </div>

          <div className={styles.boxContentWrapper}>
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
              <span>Options</span>
              <span className="accent blue" />
            </div>

            <div className={styles.boxControls}>
              <span className={clsx(styles.iconButton)} onClick={() => {}}>
                <IoPlay className={styles.reactIcon} />
              </span>
            </div>
          </div>

          <div className={styles.boxContentWrapper}>
            <div className={styles.inner}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed
                nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis
                ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
                Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent
                taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Curabitur sodales ligula in libero.{" "}
              </p>

              <p>
                Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh.
                Aenean quam. In scelerisque sem at dolor. <b>Mauris massa</b>.
                Maecenas mattis. Sed convallis tristique sem. Proin ut ligula
                vel nunc egestas porttitor. <b>Curabitur tortor</b>. Morbi
                lectus risus, iaculis vel, suscipit quis, luctus non, massa.{" "}
                <b>
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos
                </b>
                . Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum.
                Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in,
                nibh. Quisque volutpat condimentum velit.{" "}
              </p>

              <p>
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Nam nec ante.{" "}
                <i>Curabitur tortor</i>. Sed lacinia, urna non tincidunt mattis,
                tortor neque adipiscing diam, a cursus ipsum ante quis turpis.
                Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat
                mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam.
                Etiam ultrices. Suspendisse in justo eu magna luctus suscipit.
                Sed lectus.{" "}
              </p>

              <p>
                Integer euismod lacus luctus magna. Quisque cursus, metus vitae
                pharetra auctor, sem massa mattis sem, at interdum magna augue
                eget diam. Vestibulum ante ipsum primis in faucibus orci luctus
                et ultrices posuere cubilia Curae; Morbi lacinia molestie dui.
                Praesent blandit dolor. Sed non quam. In vel mi sit amet augue
                congue elementum. Morbi in ipsum sit amet pede facilisis
                laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et,
                augue. Vestibulum tincidunt malesuada tellus. Ut ultrices
                ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est
                pulvinar ullamcorper. Nulla facilisi. Integer lacinia
                sollicitudin massa.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.previewBoxes}>
        <div className={clsx(styles.questionPreview, styles.editorBox)}>
          <div className={styles.boxHeader}>
            <div className={styles.boxTitle}>
              <span>Question Text Preview</span>
              <span className="accent green" />
            </div>

            <div className={styles.boxControls}></div>
          </div>

          <div className={styles.boxContentWrapper}>
            <div className={styles.inner}>
              <InstructionText
                isLoading={workingQuestionData ? false : true}
                labelText={null}
                textMarkdown={workingQuestionData?.text_markdown}
              />
            </div>
          </div>
        </div>

        <div className={clsx(styles.optionsPreview, styles.editorBox)}>
          <div className={styles.boxHeader}>
            <div className={styles.boxTitle}>
              <span>Options Preview</span>
              <span className="accent pink" />
            </div>
          </div>

          <div className={styles.boxContentWrapper}>
            <div className={styles.inner}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed
                nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis
                ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
                Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent
                taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Curabitur sodales ligula in libero.{" "}
              </p>

              <p>
                Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh.
                Aenean quam. In scelerisque sem at dolor. <b>Mauris massa</b>.
                Maecenas mattis. Sed convallis tristique sem. Proin ut ligula
                vel nunc egestas porttitor. <b>Curabitur tortor</b>. Morbi
                lectus risus, iaculis vel, suscipit quis, luctus non, massa.{" "}
                <b>
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos
                </b>
                . Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum.
                Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in,
                nibh. Quisque volutpat condimentum velit.{" "}
              </p>

              <p>
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Nam nec ante.{" "}
                <i>Curabitur tortor</i>. Sed lacinia, urna non tincidunt mattis,
                tortor neque adipiscing diam, a cursus ipsum ante quis turpis.
                Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat
                mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam.
                Etiam ultrices. Suspendisse in justo eu magna luctus suscipit.
                Sed lectus.{" "}
              </p>

              <p>
                Integer euismod lacus luctus magna. Quisque cursus, metus vitae
                pharetra auctor, sem massa mattis sem, at interdum magna augue
                eget diam. Vestibulum ante ipsum primis in faucibus orci luctus
                et ultrices posuere cubilia Curae; Morbi lacinia molestie dui.
                Praesent blandit dolor. Sed non quam. In vel mi sit amet augue
                congue elementum. Morbi in ipsum sit amet pede facilisis
                laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et,
                augue. Vestibulum tincidunt malesuada tellus. Ut ultrices
                ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est
                pulvinar ullamcorper. Nulla facilisi. Integer lacinia
                sollicitudin massa.{" "}
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

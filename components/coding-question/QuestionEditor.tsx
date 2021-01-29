import dynamic from "next/dynamic";
import { useState } from "react";
import styles from "./QuestionEditor.module.scss";
import clsx from "clsx";
import ICodingQuestion from "typings/coding-question";
import produce from "immer";

const CodeEditor = dynamic(() => import("components/CodeEditor"), {
  ssr: false,
});

type CodingQuestionEditorProps = {
  initial: ICodingQuestion;
  onSave: (v: ICodingQuestion) => void;
};

export default function CodingQuestionEditor({
  initial,
  onSave,
}: CodingQuestionEditorProps) {
  const [questionData, setQuestionData] = useState<ICodingQuestion>(
    Object.assign(
      {
        title: "",
        textMarkdown: "",
        starterCode: "",
        solutionCode: "",
        testCode: "",
      },
      initial
    )
  );

  const update = (key, val) => {
    const updatedQuestionData = produce(questionData, (draft) => {
      draft[key] = val;
    });

    setQuestionData(updatedQuestionData);
  };

  const save = () => {
    onSave(questionData);
  };

  console.log(questionData);

  return (
    <div className={styles.questionEditPage}>
      <div className={styles.controlBar}>
        <div className={styles.questionTitleWrapper}>
          <input
            type="text"
            value={questionData.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="Question Title"
            className={styles.questionTitleInput}
          />
        </div>

        <div className={styles.controls}>
          <div
            className={styles.button}
            onClick={(e) => {
              e.preventDefault();
              save();
            }}
          >
            Save
          </div>
        </div>
      </div>
      <div className={styles.questionAndTemplate}>
        <div className={clsx(styles.questionText, styles.editorBox)}>
          <div className={styles.boxHeader}>
            <span className={styles.boxTitle}>Question Text</span>
            <span className="accent purple" />
          </div>

          <div className={styles.codeEditorWrapper}>
            <textarea
              className={styles.questionTextarea}
              value={questionData.textMarkdown}
              onChange={(e) => update("textMarkdown", e.target.value)}
            />
          </div>
        </div>

        <div className={clsx(styles.starter, styles.editorBox)}>
          <div className={styles.boxHeader}>
            <span className={styles.boxTitle}>Starter</span>
            <span className="accent blue" />
          </div>

          <div className={styles.codeEditorWrapper}>
            <CodeEditor
              editorValue={questionData.starterCode}
              onChange={(v) => update("starterCode", v)}
              onRun={() => {}}
              language="python"
              height="calc(50vh - 55px)"
            />
          </div>
        </div>
      </div>

      <div className={styles.solutionAndCheck}>
        <div className={clsx(styles.solution, styles.editorBox)}>
          <div className={styles.boxHeader}>
            <span className={styles.boxTitle}>Solution</span>
            <span className="accent green" />
          </div>

          <div className={styles.codeEditorWrapper}>
            <CodeEditor
              editorValue={questionData.solutionCode}
              onChange={(v) => update("solutionCode", v)}
              onRun={() => {}}
              language="python"
              height="calc(50vh - 55px)"
            />
          </div>
        </div>

        <div className={clsx(styles.testCases, styles.editorBox)}>
          <div className={styles.boxHeader}>
            <span className={styles.boxTitle}>Test Cases</span>
            <span className="accent pink" />
          </div>

          <div className={styles.codeEditorWrapper}>
            <CodeEditor
              editorValue={questionData.testCode}
              onChange={(v) => update("testCode", v)}
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

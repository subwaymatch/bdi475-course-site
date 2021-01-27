import dynamic from "next/dynamic";
import { useState } from "react";
import styles from "./QuestionEditor.module.scss";
import clsx from "clsx";

const CodeEditor = dynamic(() => import("components/CodeEditor"), {
  ssr: false,
});

export default function CodingQuestionEditor() {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionMarkdown, setQuestionMarkdown] = useState("");
  const [starterCode, setStarterCode] = useState("");
  const [solutionCode, setSolutionCode] = useState("");
  const [testCode, setTestCode] = useState(
    "import unittest\ntc = unittest.TestCase()\n\n"
  );

  return (
    <div className={styles.questionEditPage}>
      <div className={styles.controlBar}>
        <div className={styles.questionTitleWrapper}>
          <input
            type="text"
            placeholder="Question Title"
            className={styles.questionTitleInput}
          />
        </div>

        <div className={styles.controls}></div>
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
              value={questionMarkdown}
              onChange={(e) => {
                setQuestionMarkdown(e.target.value);
              }}
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
              editorValue={starterCode}
              onChange={setStarterCode}
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
              editorValue={solutionCode}
              onChange={setSolutionCode}
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
              editorValue={testCode}
              onChange={setTestCode}
              language="python"
              height="calc(50vh - 55px)"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

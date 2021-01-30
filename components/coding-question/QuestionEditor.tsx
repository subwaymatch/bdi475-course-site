import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import styles from "./QuestionEditor.module.scss";
import clsx from "clsx";
import { MdDelete } from "react-icons/md";
import { IoCopy, IoPlay } from "react-icons/io5";
import { AiFillSave } from "react-icons/ai";
import { VscRepoForked } from "react-icons/vsc";
import ICodingQuestion from "typings/coding-question";
import produce from "immer";
import { Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import clickableVariants from "animations/clickableVariants";
import { toast } from "react-toastify";

// Tweaked clickable animation for small texts and buttons
const buttonVariants = Object.assign({}, clickableVariants, {
  hover: {
    y: 1,
  },
  tap: {
    scale: 0.96,
  },
});

const CodeEditor = dynamic(() => import("components/CodeEditor"), {
  ssr: false,
});

type CodingQuestionEditorProps = {
  qid: string;
  savedData: ICodingQuestion;
  onSave: (v: ICodingQuestion) => void;
  onDelete: () => void;
  onClone: (v: ICodingQuestion) => void;
};

export default function CodingQuestionEditor({
  qid,
  savedData,
  onSave,
  onDelete,
  onClone,
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
      savedData
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
        <Row className={clsx(styles.controlRow, "align-items-center")}>
          <Col xs={4}>
            <Link href="/coding-question/list">
              <motion.a
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className={styles.backButton}
              >
                ← Back to List
              </motion.a>
            </Link>
          </Col>

          <Col xs={4}>
            <div className={styles.questionTitleWrapper}>
              <input
                type="text"
                value={questionData.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="Question Title"
                className={styles.questionTitleInput}
              />
            </div>
          </Col>
          <Col xs={4}>
            <div className={styles.controls}>
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className={clsx(styles.button, styles.run)}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <IoPlay className={styles.reactIcon} />
                <span className={styles.label}>Run</span>
              </motion.div>

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className={clsx(styles.button, styles.save)}
                onClick={async (e) => {
                  e.preventDefault();

                  try {
                    await save();
                    toast.success("Save successful");
                  } catch (err) {
                    toast.error("Error saving question");
                  }
                }}
              >
                <AiFillSave className={styles.reactIcon} />
                <span className={styles.label}>Save</span>
              </motion.div>

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className={clsx(styles.button, styles.clone)}
                onClick={async (e) => {
                  e.preventDefault();

                  if (
                    window.confirm("Your changes will be saved before cloning.")
                  ) {
                    await save();
                    await onClone(questionData);
                  }
                }}
              >
                <VscRepoForked className={styles.reactIcon} />
                <span className={styles.label}>Clone</span>
              </motion.div>

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className={clsx(styles.button, styles.copyId)}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <IoCopy className={styles.reactIcon} />
                <span className={styles.label}>Copy ID</span>
              </motion.div>

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className={clsx(styles.button, styles.delete)}
                onClick={async (e) => {
                  e.preventDefault();
                  if (
                    window.confirm(
                      "Are you sure you want to delete this question? This cannot be undone."
                    )
                  ) {
                    await onDelete();
                  }
                }}
              >
                <MdDelete className={styles.reactIcon} />
                <span className={styles.label}>Delete</span>
              </motion.div>
            </div>
          </Col>
        </Row>
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

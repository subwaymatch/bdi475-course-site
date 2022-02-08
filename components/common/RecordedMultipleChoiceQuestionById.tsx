import { useRef, useState } from "react";
import Link from "next/link";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { Row, Col } from "react-bootstrap";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { RiEditBoxLine } from "react-icons/ri";
import Tippy from "@tippyjs/react";
import clsx from "clsx";
import styles from "./RecordedChallenge.module.scss";
import useMultipleChoiceQuestion from "hooks/useMultipleChoiceQuestion";
import useMultipleChoiceAttempts from "hooks/useMultipleChoiceAttempts";
import MultipleChoiceQuestion from "components/challenges/view/MultipleChoiceQuestion";
import { QueryStatusEnum } from "types";
import { definitions } from "types/database";
import { toast } from "react-toastify";

interface IRecordedMultipleChoiceQuestionByIdProps {
  questionId: number;
  className?: string;
}

export default function RecordedMultipleChoiceQuestionById({
  questionId,
  className,
}: IRecordedMultipleChoiceQuestionByIdProps) {
  const { user, session, isAdmin } = useSupabaseAuth();
  const { status, questionData, error } = useMultipleChoiceQuestion(questionId);
  const { attempts } = useMultipleChoiceAttempts(questionId);
  const [answersData, setAnswersData] = useState<
    definitions["multiple_choice_options"][]
  >([]);
  const editLinkRef = useRef<HTMLAnchorElement>();
  const [showResult, setShowResult] = useState(false);

  const onSubmit = async (userSelections: number[]) => {
    if (!session) {
      return;
    }

    const response = await fetch(
      `/api/multiple-choice-question/submit/${questionId}`,
      {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          userSelections,
        }),
      }
    );

    const submitResult = await response.json();

    if (submitResult.isCorrect) {
      toast.success("Great work! 👊");
    } else {
      toast.error("Try again! 🧐");
    }

    setAnswersData(submitResult.answersData);
    setShowResult(true);
  };

  const getAttemptMessage = () => {
    if (!user) {
      return "You must be signed in to view your submission history";
    } else if (attempts.length === 0) {
      return "No submission";
    } else {
      const passCount = attempts.filter((o) => o.is_success).length;

      if (passCount === 0) {
        return `No successful submission yet`;
      } else {
        return `Pass`;
      }
    }
  };

  const onReset = () => {
    setAnswersData([]);
    setShowResult(false);
  };

  return (
    <Row>
      <Col>
        <div
          className={clsx(styles.recordedChallenge, "composable-block", {
            [className]: !!className,
          })}
        >
          <Row>
            <Col>
              <div className={styles.exerciseHeader}>
                <span className={styles.exerciseType}>
                  Multiple Choice Question
                </span>
                <h2 className={styles.exerciseTitle}>
                  {status === QueryStatusEnum.SUCCESS
                    ? questionData.title
                    : "Loading"}
                </h2>

                <div className={styles.topControls}>
                  {user && isAdmin && (
                    <>
                      <Link href={`/multiple-choice/edit/${questionId}`}>
                        <a
                          className={clsx(styles.iconButton, styles.editButton)}
                          ref={editLinkRef}
                        >
                          <RiEditBoxLine className={styles.reactIcon} />
                        </a>
                      </Link>

                      <Tippy
                        content="Edit"
                        className="tippy"
                        placement="bottom"
                        offset={[0, -2]}
                        theme="light"
                        reference={editLinkRef}
                      />
                    </>
                  )}

                  <Tippy
                    content={getAttemptMessage()}
                    className="tippy"
                    placement="bottom"
                    offset={[0, -2]}
                    theme="light"
                  >
                    <span
                      className={clsx(
                        styles.iconButton,
                        styles.attemptsButton,
                        {
                          [styles.hasSubmission]: attempts.length > 0,
                          [styles.onlyFail]:
                            attempts.length > 0 &&
                            attempts.every((o) => !o.is_success),
                          [styles.hasPass]: attempts.some((o) => o.is_success),
                        }
                      )}
                    >
                      {attempts.some((o) => o.is_success) ? (
                        <BsCheckCircle className={styles.reactIcon} />
                      ) : (
                        <BsXCircle className={styles.reactIcon} />
                      )}
                    </span>
                  </Tippy>
                </div>
              </div>
            </Col>
          </Row>

          <MultipleChoiceQuestion
            status={status}
            questionData={questionData}
            answersData={answersData}
            showResult={showResult}
            onSubmit={onSubmit}
            onReset={onReset}
          />
        </div>
      </Col>
    </Row>
  );
}

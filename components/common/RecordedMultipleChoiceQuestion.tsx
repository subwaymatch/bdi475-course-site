import { useRef, useState } from "react";
import Link from "next/link";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { Row, Col } from "react-bootstrap";
import { BsCheckCircle } from "react-icons/bs";
import { RiHistoryLine, RiEditBoxLine, RiGroupLine } from "react-icons/ri";
import Tippy from "@tippyjs/react";
import clsx from "clsx";
import styles from "./RecordedChallenge.module.scss";
import useMultipleChoiceQuestion from "hooks/useMultipleChoiceQuestion";
import MultipleChoiceQuestion from "components/challenges/MultipleChoiceQuestion";
import { QueryStatusEnum } from "types";
import { definitions } from "types/database";

interface IRecordedMultipleChoiceQuestionProps {
  questionId: number;
  className?: string;
}

export default function RecordedMultipleChoiceQuestion({
  questionId,
  className,
}: IRecordedMultipleChoiceQuestionProps) {
  const { user, session, roles } = useSupabaseAuth();
  const isAdmin = roles.includes("Admin");
  const { status, questionData, error } = useMultipleChoiceQuestion(questionId);
  const [answersData, setAnswersData] = useState<
    definitions["multiple_choice_options"][]
  >([]);
  const editLinkRef = useRef<HTMLAnchorElement>();
  const attemptsLinkRef = useRef<HTMLAnchorElement>();
  const historyLinkRef = useRef<HTMLAnchorElement>();
  const attempts = [];
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

    setAnswersData(submitResult.answersData);
    setShowResult(true);
  };

  return (
    <Row>
      <Col>
        <div
          className={clsx(styles.recordedChallenge, {
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

                      <Link
                        href={`/admin/multiple-choice/attempts/${questionId}`}
                      >
                        <a
                          className={clsx(styles.iconButton, styles.editButton)}
                          ref={attemptsLinkRef}
                        >
                          <RiGroupLine className={styles.reactIcon} />
                        </a>
                      </Link>

                      <Tippy
                        content="View all user attempts"
                        className="tippy"
                        placement="bottom"
                        offset={[0, -2]}
                        theme="light"
                        reference={attemptsLinkRef}
                      />
                    </>
                  )}

                  {user && (
                    <>
                      <Link href={`/multiple-choice/history/${questionId}`}>
                        <a
                          className={clsx(
                            styles.iconButton,
                            styles.historyButton,
                            {
                              [styles.disabled]: attempts.length === 0,
                            }
                          )}
                          ref={historyLinkRef}
                        >
                          <RiHistoryLine className={styles.reactIcon} />
                        </a>
                      </Link>
                      <Tippy
                        content={
                          attempts.length > 0
                            ? "View submission history"
                            : "No history found"
                        }
                        className="tippy"
                        placement="bottom"
                        offset={[0, -2]}
                        theme="light"
                        reference={historyLinkRef}
                      />
                    </>
                  )}

                  <Tippy
                    content={"TODO: ATTEMPTS MESSAGE"}
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
                      <BsCheckCircle className={styles.reactIcon} />
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
            onReset={() => setShowResult(false)}
          />
        </div>
      </Col>
    </Row>
  );
}

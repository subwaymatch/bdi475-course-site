import { useRef, useState } from "react";
import Link from "next/link";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { Row, Col } from "react-bootstrap";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { RiEditBoxLine } from "react-icons/ri";
import Tippy from "@tippyjs/react";
import isEqual from "lodash/isEqual";
import clsx from "clsx";
import styles from "./RecordedChallenge.module.scss";
import MultipleChoiceQuestion from "components/challenges/view/MultipleChoiceQuestion";
import { toast } from "react-toastify";
import { ChallengeTypeEnum } from "types/challenge";
import useChallenges from "hooks/useChallenges";

interface IRecordedMultipleChoiceQuestionProps {
  questionId: number;
  className?: string;
}

export default function RecordedMultipleChoiceQuestion({
  questionId,
  className,
}: IRecordedMultipleChoiceQuestionProps) {
  const { user, session, isAdmin } = useSupabaseAuth();

  const { multipleChoiceQuestions, challengeResults } = useChallenges();
  const questionData = multipleChoiceQuestions?.find((o) => o.id == questionId);
  const challengeResult = challengeResults?.find(
    (o) =>
      o.challenge_type === ChallengeTypeEnum.MultipleChoice &&
      o.challenge_id == questionId
  );

  const editLinkRef = useRef<HTMLAnchorElement>();
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = async (userSelections: number[]) => {
    if (session) {
      submitForMembers(userSelections);
    } else {
      submitForGuests(userSelections);
    }
  };

  const submitForMembers = async (userSelections: number[]) => {
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

    setShowResult(true);
  };

  const submitForGuests = async (userSelections: number[]) => {
    const correctOptionIds = questionData.options
      .filter((o) => o.is_correct)
      .map((o) => o.id)
      .sort();

    const isCorrect = isEqual(correctOptionIds, userSelections);

    if (isCorrect) {
      toast.success("Great work! 👊");
    } else {
      toast.error("Try again! 🧐");
    }

    setShowResult(true);
  };

  const getAttemptMessage = () => {
    if (!user) {
      return "You must be signed in to view your submission history";
    } else if (challengeResult.total_count === 0) {
      return "No submission";
    } else if (challengeResult.success_count === 0) {
      return `No successful submission yet`;
    } else {
      return `Pass`;
    }
  };

  const handleReset = () => {
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
                  {questionData ? questionData.title : "Loading"}
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

                  {challengeResult && (
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
                            [styles.hasSubmission]:
                              challengeResult.total_count > 0,
                            [styles.onlyFail]:
                              challengeResult.success_count === 0 &&
                              challengeResult.fail_count > 0,
                            [styles.hasPass]: challengeResult.success_count > 0,
                          }
                        )}
                      >
                        {challengeResult.success_count > 0 ? (
                          <BsCheckCircle className={styles.reactIcon} />
                        ) : (
                          <BsXCircle className={styles.reactIcon} />
                        )}
                      </span>
                    </Tippy>
                  )}
                </div>
              </div>
            </Col>
          </Row>

          <MultipleChoiceQuestion
            questionData={questionData}
            showResult={showResult}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />
        </div>
      </Col>
    </Row>
  );
}

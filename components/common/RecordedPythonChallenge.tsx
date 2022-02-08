import { useRef } from "react";
import Link from "next/link";
import PythonChallenge from "components/challenges/view/PythonChallenge";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { Row, Col } from "react-bootstrap";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { RiHistoryLine, RiEditBoxLine, RiGroupLine } from "react-icons/ri";
import { definitions } from "types/database";
import useChallenges from "hooks/useChallenges";
import Tippy from "@tippyjs/react";
import clsx from "clsx";
import styles from "./RecordedChallenge.module.scss";
import { supabaseClient } from "lib/supabase/supabaseClient";
import { toast } from "react-toastify";
import { ChallengeTypeEnum } from "types/challenge";

interface IRecordedPythonChallengeProps {
  challengeId: number;
  className?: string;
  showSolution?: boolean;
}

export default function RecordedPythonChallenge({
  challengeId,
  className,
  showSolution = true,
}: IRecordedPythonChallengeProps) {
  const { user, isAdmin } = useSupabaseAuth();
  const { pythonChallenges, challengeResults } = useChallenges();
  const challenge = pythonChallenges?.find((o) => o.id == challengeId);
  const challengeResult = challengeResults?.find(
    (o) =>
      o.challenge_type === ChallengeTypeEnum.PythonChallenge &&
      o.challenge_id == challengeId
  );
  const editLinkRef = useRef<HTMLAnchorElement>();
  const attemptsLinkRef = useRef<HTMLAnchorElement>();
  const historyLinkRef = useRef<HTMLAnchorElement>();

  const recordSubmission = async (isSuccess: boolean, userCode: string) => {
    if (!user) {
      return;
    }

    const { data: latestAttempt, error: latestAttemptError } =
      await supabaseClient
        .from<definitions["coding_challenge_attempts"]>(
          "coding_challenge_attempts"
        )
        .select()
        .match({ challenge_id: challengeId, user_id: user.id })
        .order("submitted_at", { ascending: false })
        .limit(1);

    if (latestAttempt.length > 0) {
      const lastRecordedAttempt = latestAttempt[0];

      if (
        lastRecordedAttempt.is_success === isSuccess &&
        lastRecordedAttempt.user_code === userCode
      ) {
        toast.info(
          `Your code was identical to the previous submission - your attempt was not recorded.`
        );
        return;
      }
    }

    const { data: insertResult, error: insertError } = await supabaseClient
      .from<definitions["coding_challenge_attempts"]>(
        "coding_challenge_attempts"
      )
      .insert(
        [
          {
            user_id: user.id,
            challenge_id: challengeId,
            is_success: isSuccess,
            user_code: userCode,
          },
        ],
        {
          returning: "minimal",
        }
      );

    if (insertError) {
      console.error(insertError);
    }
  };

  const getAttemptMessage = () => {
    if (!user) {
      return "You must be signed in to view your submission history";
    } else if (!challengeResult) {
      return "Loading";
    } else if (challengeResult.total_count === 0) {
      return "No submission";
    } else {
      const passCount = challengeResult.success_count;
      const failCount = challengeResult.fail_count;

      return `${challengeResult.total_count} submission${
        challengeResult.total_count > 1 ? "s" : ""
      } (${passCount} pass${passCount > 1 ? "es" : ""}, ${failCount} fail${
        failCount > 1 ? "s" : ""
      })`;
    }
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
                <span className={styles.exerciseType}>Python Challenge</span>
                <h2 className={styles.exerciseTitle}>
                  {challenge ? challenge.title : "Loading"}
                </h2>

                <div className={styles.topControls}>
                  {user && isAdmin && (
                    <>
                      <Link href={`/python-challenge/edit/${challengeId}`}>
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
                        href={`/admin/python-challenge/attempts/${challengeId}`}
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
                      <Link href={`/python-challenge/history/${challengeId}`}>
                        <a
                          className={clsx(
                            styles.iconButton,
                            styles.historyButton,
                            {
                              [styles.disabled]:
                                !challengeResult ||
                                challengeResult.total_count === 0,
                            }
                          )}
                          ref={historyLinkRef}
                        >
                          <RiHistoryLine className={styles.reactIcon} />
                        </a>
                      </Link>
                      <Tippy
                        content={
                          challengeResult && challengeResult.total_count > 0
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

          {challenge && (
            <PythonChallenge
              challengeData={challenge}
              localStorageKey={`python-challenge-${challengeId}`}
              showSolution={showSolution}
              onSubmit={recordSubmission}
            />
          )}
        </div>
      </Col>
    </Row>
  );
}

import { useRef } from "react";
import Link from "next/link";
import PythonChallenge from "components/challenges/view/PythonChallenge";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { Row, Col } from "react-bootstrap";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { RiHistoryLine, RiEditBoxLine, RiGroupLine } from "react-icons/ri";
import useCodingChallengeAttempts from "hooks/useSingleCodingChallengeAttempts";
import useChallenges from "hooks/useChallenges";
import Tippy from "@tippyjs/react";
import clsx from "clsx";
import styles from "./RecordedChallenge.module.scss";

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
  const { user, roles } = useSupabaseAuth();
  const { pythonChallenges, challengeResults } = useChallenges();
  const challenge = pythonChallenges?.find((o) => o.id == challengeId);
  const challengeResult = challengeResults?.find(
    (o) =>
      o.challenge_type === "python-challenge" && o.challenge_id == challengeId
  );
  const isAdmin = roles.includes("Admin");
  const { attempts, recordSubmission } =
    useCodingChallengeAttempts(challengeId);
  const editLinkRef = useRef<HTMLAnchorElement>();
  const attemptsLinkRef = useRef<HTMLAnchorElement>();
  const historyLinkRef = useRef<HTMLAnchorElement>();

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
        attempts.length > 1 ? "s" : ""
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
                              challengeResult.success_count > 0 &&
                              challengeResult.fail_count === 0,
                            [styles.hasPass]: challengeResult.success_count > 0,
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

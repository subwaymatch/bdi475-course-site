import { useRef } from "react";
import Link from "next/link";
import PythonChallenge from "components/challenges/view/PythonChallenge";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { Row, Col } from "react-bootstrap";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { RiHistoryLine, RiEditBoxLine, RiGroupLine } from "react-icons/ri";
import Tippy from "@tippyjs/react";
import clsx from "clsx";
import styles from "./RecordedChallenge.module.scss";
import { definitions } from "types/database";

interface IRecordedPythonChallengeProps {
  challenge: definitions["coding_challenges"];
  attempts?: definitions["coding_challenge_attempts"][];
  recordSubmission?: () => void;
  className?: string;
  showSolution?: boolean;
}

export default function RecordedPythonChallenge({
  challenge,
  attempts = [],
  recordSubmission = () => {},
  className,
  showSolution = true,
}: IRecordedPythonChallengeProps) {
  const { user, roles } = useSupabaseAuth();
  const isAdmin = roles.includes("Admin");
  const editLinkRef = useRef<HTMLAnchorElement>();
  const attemptsLinkRef = useRef<HTMLAnchorElement>();
  const historyLinkRef = useRef<HTMLAnchorElement>();

  const getAttemptMessage = () => {
    if (!user) {
      return "You must be signed in to view your submission history";
    } else if (attempts.length === 0) {
      return "No submission";
    } else {
      const passCount = attempts.filter((o) => o.is_success).length;
      const failCount = attempts.filter((o) => !o.is_success).length;

      return `${attempts.length} submission${
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
          className={clsx(styles.recordedChallenge, {
            [className]: !!className,
          })}
        >
          <Row>
            <Col>
              <div className={styles.exerciseHeader}>
                <span className={styles.exerciseType}>Python Challenge</span>
                <h2 className={styles.exerciseTitle}>{challenge.title}</h2>

                <div className={styles.topControls}>
                  {user && isAdmin && (
                    <>
                      <Link href={`/python-challenge/edit/${challenge.id}`}>
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
                        href={`/admin/python-challenge/attempts/${challenge.id}`}
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
                      <Link href={`/python-challenge/history/${challenge.id}`}>
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

          <PythonChallenge
            challengeData={challenge}
            localStorageKey={`coding-question-${challenge.id}`}
            showSolution={showSolution}
            onSubmit={recordSubmission ? recordSubmission : () => {}}
          />
        </div>
      </Col>
    </Row>
  );
}
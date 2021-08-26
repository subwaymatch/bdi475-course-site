import { useRef } from "react";
import Link from "next/link";
import PythonExercise from "components/python-exercise/PythonExercise";
import { useUser } from "context/UserContext";
import { Row, Col } from "react-bootstrap";
import { BsCheckCircle } from "react-icons/bs";
import { RiHistoryLine, RiEditBoxLine, RiGroupLine } from "react-icons/ri";
import usePythonExercise from "hooks/usePythonExercise";
import useCodingExerciseAttempts from "hooks/useCodingExerciseAttempts";
import Tippy from "@tippyjs/react";
import clsx from "clsx";
import styles from "./RecordedPythonExercise.module.scss";

interface IRecordedPythonExerciseProps {
  qid: string;
  className?: string;
}

export default function RecordedPythonExercise({
  qid,
  className,
}: IRecordedPythonExerciseProps) {
  const { user, roles } = useUser();
  const isAdmin = roles.includes("Admin");
  const { status, data, error } = usePythonExercise(qid);
  const { attempts, recordSubmission } = useCodingExerciseAttempts(qid);
  const editLinkRef = useRef<HTMLAnchorElement>();
  const attemptsLinkRef = useRef<HTMLAnchorElement>();
  const historyLinkRef = useRef<HTMLAnchorElement>();

  const getAttemptMessage = () => {
    if (!user) {
      return "You must be signed in to view your submission history";
    } else if (attempts.length === 0) {
      return "No submission";
    } else {
      const passCount = attempts.filter((o) => o.isSuccess).length;
      const failCount = attempts.filter((o) => !o.isSuccess).length;

      return `${attempts.length} submission${
        attempts.length > 1 ? "s" : ""
      } (${passCount} pass${passCount > 1 ? "es" : ""}, ${failCount} fail${
        failCount > 1 ? "s" : ""
      })`;
    }
  };

  return status === "success" ? (
    <Row>
      <Col>
        <div
          className={clsx(styles.recordedCodingQuestion, {
            [className]: !!className,
          })}
        >
          <Row>
            <Col>
              <div className={styles.exerciseHeader}>
                <span className={styles.exerciseType}>Coding Exercise</span>
                <h2 className={styles.exerciseTitle}>{data.title}</h2>

                <div className={styles.topControls}>
                  {user && isAdmin && (
                    <>
                      <Link href={`/python-exercise/edit/${qid}`}>
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

                      <Link href={`/admin/python-exercise/attempts/${qid}`}>
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
                      <Link href={`/python-exercise/history/${qid}`}>
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
                            attempts.every((o) => !o.isSuccess),
                          [styles.hasPass]: attempts.some((o) => o.isSuccess),
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

          <PythonExercise
            textMarkdown={(data as any).textMarkdown}
            starterCode={(data as any).starterCode}
            testCode={(data as any).testCode}
            localStorageKey={`coding-question-${qid}`}
            onSubmit={recordSubmission}
          />
        </div>
      </Col>
    </Row>
  ) : (
    <Row>
      <Col>
        <p>{status === "error" ? error : "Loading..."}</p>
      </Col>
    </Row>
  );
}

import { useRef } from "react";
import Link from "next/link";
import CodingQuestion from "components/coding-question/CodingQuestion";
import useFirebaseAuth from "hooks/useFirebaseAuth";
import { Row, Col } from "react-bootstrap";
import { BsCheckCircle } from "react-icons/bs";
import {
  RiHistoryLine,
  RiEditBoxLine,
  RiFileList3Line,
  RiGroupLine,
  RiFootprintLine,
} from "react-icons/ri";
import _ from "lodash";
import useCodingQuestion from "hooks/useCodingQuestion";
import useCodingQuestionAttempts from "hooks/useCodingQuestionAttempts";
import Tippy from "@tippyjs/react";
import clsx from "clsx";
import styles from "./RecordedCodingQuestion.module.scss";

interface IRecordedCodingQuestionProps {
  qid: string;
  className?: string;
}

export default function RecordedCodingQuestion({
  qid,
  className,
}: IRecordedCodingQuestionProps) {
  const { user, claims } = useFirebaseAuth();
  const { status, data, error } = useCodingQuestion(qid);
  const { attempts, recordSubmission } = useCodingQuestionAttempts(qid);
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
                  {user && claims.admin && (
                    <>
                      <Link href={`/coding-question/edit/${qid}`}>
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

                      <Link href={`/admin/coding-question/attempts/${qid}`}>
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
                      <Link href={`/coding-question/history/${qid}`}>
                        <a
                          className={clsx(
                            styles.iconButton,
                            styles.historyButton,
                            {
                              [styles.disabled]: attempts.length == 0,
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

          <CodingQuestion
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

import { useState, useEffect } from "react";
import Link from "next/link";
import CodingQuestion from "components/coding-question/CodingQuestion";
import { ICodingQuestionAttempt } from "typings/coding-question";
import { useFirestore } from "reactfire";
import useFirebaseAuth from "hooks/useFirebaseAuth";
import { Row, Col } from "react-bootstrap";
import { BsCheckCircle } from "react-icons/bs";
import { RiEditBoxLine } from "react-icons/ri";
import _ from "lodash";
import useCodingQuestion from "hooks/useCodingQuestion";
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
  const firestore = useFirestore();
  const { status, data, error } = useCodingQuestion(qid);
  const [attempts, setAttempts] = useState<ICodingQuestionAttempt[]>([]);

  useEffect(() => {
    if (!user) {
      setAttempts([]);
      return;
    }

    updateAttempts();
  }, [user]);

  const updateAttempts = () => {
    if (!user) {
      return;
    }

    firestore
      .collection("userAttempts")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const docData = doc.data();

        if (_.has(docData, qid)) {
          const questionAttempts = docData[qid];

          setAttempts(questionAttempts);
        } else {
          setAttempts([]);
        }
      });
  };

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

  const recordSubmission = async (isSuccess: boolean, userCode: string) => {
    if (!user) {
      return;
    }

    try {
      const token = await user.getIdToken();
      const options = {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isSuccess,
          userCode,
        }),
      };

      await fetch(`/api/coding-question/attempt/${qid}`, options);

      updateAttempts();
    } catch (err) {
      console.error(err);
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
                    <Link href={`/coding-question/edit/${qid}`}>
                      <a className={clsx(styles.iconButton, styles.editButton)}>
                        <RiEditBoxLine className={styles.reactIcon} />
                      </a>
                    </Link>
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

import { useRouter } from "next/router";
import { AuthCheck } from "reactfire";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import Login from "components/Login";
import Highlighter from "components/code-blocks/Highlighter";
import styles from "styles/pages/coding-question/history.module.scss";
import clsx from "clsx";
import { IoCopyOutline } from "react-icons/io5";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Tippy from "@tippyjs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { useEffect, useState } from "react";
import { ICodingQuestionAttemptWithUID } from "typings/coding-question";
import { firebaseClient } from "firebase/firebaseClient";
import useUsers from "hooks/useUsers";

dayjs.extend(relativeTime);

export default function CodingQuestionAttemptsPage() {
  const router = useRouter();
  const { qid } = router.query;
  const firestore = useFirestore();
  const docRef = firestore.collection("questionAttempts").doc(qid as string);
  const {
    status: qStatus,
    data: questionAttemptsData,
  }: { status: string; data } = useFirestoreDocData(docRef);
  const { status: uStatus, data: users } = useUsers();
  const [attempts, setAttempts] = useState<ICodingQuestionAttemptWithUID[]>([]);

  useEffect(() => {
    console.log(`useEffect()`);
    console.log(`users.keys=${Object.keys(users).slice(5)}`);

    if (qStatus === "success") {
      let tempAttempts: ICodingQuestionAttemptWithUID[] = [];

      Object.keys(questionAttemptsData).forEach((uid) => {
        if (uid == "NO_ID_FIELD") {
          return;
        }

        let userAttempts = [...questionAttemptsData[uid]]
          .map((o) => {
            if (!o.submittedAt) {
              o.submittedAt = firebaseClient.firestore.Timestamp.now();
            }

            return o;
          })
          .sort((o1, o2) => o1.submittedAt.seconds - o2.submittedAt.seconds)
          .reverse();

        let passCount = 0;
        let failCount = 0;

        for (const attempt of userAttempts) {
          let newAttempt = Object.assign({}, { uid }, attempt);

          if (users.hasOwnProperty(uid)) {
            newAttempt["displayName"] = users[uid].email;
          }

          if (attempt.isSuccess && passCount < 1) {
            tempAttempts.push(newAttempt);
            passCount++;
          } else if (!attempt.isSuccess && failCount < 1) {
            tempAttempts.push(newAttempt);
            failCount++;
          }

          if (attempt.passCount == 1 && attempt.failCount == 1) {
            break;
          }
        }
      });

      setAttempts(
        tempAttempts
          .sort((o1, o2) => o1.submittedAt.seconds - o2.submittedAt.seconds)
          .reverse()
      );
    }
  }, [questionAttemptsData, users]);

  return (
    <Layout>
      <AuthCheck fallback={<Login />}>
        <main className={styles.page}>
          <Container>
            <Row>
              <Col>
                <h2 className="sectionTitle">
                  Question Attempts
                  <span className="accent blue" />
                </h2>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className={styles.attempts}>
                  {attempts.map((o, index) => (
                    <div key={index} className={styles.item}>
                      <Row>
                        <Col md={2} xs={6}>
                          <div className={styles.result}>
                            <span
                              className={clsx(
                                "label",
                                o.isSuccess ? "green" : "pink"
                              )}
                            >
                              Result
                            </span>

                            <div className={styles.text}>
                              {o.isSuccess ? (
                                <>
                                  Pass
                                  <HiOutlineBadgeCheck
                                    className={clsx(
                                      styles.reactIcon,
                                      styles.pass
                                    )}
                                  />
                                </>
                              ) : (
                                <>
                                  Fail
                                  <IoIosCloseCircleOutline
                                    className={clsx(
                                      styles.reactIcon,
                                      styles.fail
                                    )}
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        </Col>

                        <Col md={2} xs={6}>
                          {o.submittedAt && (
                            <div className={styles.timestamp}>
                              <span className="label yellow">Submitted</span>

                              <div className={styles.text}>
                                <Tippy
                                  content={dayjs(o.submittedAt.toDate()).format(
                                    "YYYY-MM-DD HH:mm:ss A"
                                  )}
                                  className="tippy"
                                  placement="bottom"
                                  theme="light"
                                >
                                  <span>
                                    {dayjs(o.submittedAt.toDate()).fromNow()}
                                  </span>
                                </Tippy>
                              </div>
                            </div>
                          )}
                        </Col>

                        <Col md={8}>
                          <div className={styles.codeWrapper}>
                            <div className={styles.labelWrapper}>
                              <span className="label blue">Code</span>
                              <span
                                className={clsx(
                                  "label",
                                  "purple",
                                  styles.displayName
                                )}
                              >
                                {o.displayName ? o.displayName : o.uid}
                              </span>

                              <CopyToClipboard
                                text={o.userCode}
                                onCopy={() =>
                                  toast.info(<div>Copied to clipboard</div>)
                                }
                              >
                                <span className={styles.iconButton}>
                                  <IoCopyOutline className={styles.reactIcon} />
                                </span>
                              </CopyToClipboard>

                              <Tippy
                                content="Copy to Clipboard"
                                className="tippy"
                                placement="bottom"
                                theme="light"
                              />
                            </div>
                            <Highlighter
                              content={o.userCode}
                              language="python"
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </main>
      </AuthCheck>
    </Layout>
  );
}

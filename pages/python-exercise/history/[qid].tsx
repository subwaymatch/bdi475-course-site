import { useRouter } from "next/router";
import { AuthCheck } from "reactfire";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import Login from "components/Login";
import Highlighter from "components/code-blocks/Highlighter";
import styles from "styles/pages/python-exercise/history.module.scss";
import clsx from "clsx";
import useCodingExerciseAttempts from "hooks/useCodingExerciseAttempts";
import { IoCopyOutline } from "react-icons/io5";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Tippy from "@tippyjs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function PythonExerciseUserHistoryPage() {
  const router = useRouter();
  const { qid } = router.query;
  const { attempts } = useCodingExerciseAttempts(qid);

  return (
    <Layout>
      <AuthCheck fallback={<Login />}>
        <main className={styles.page}>
          <Container>
            <Row>
              <Col>
                <h2 className="sectionTitle">
                  Submission History
                  <span className="accent purple" />
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

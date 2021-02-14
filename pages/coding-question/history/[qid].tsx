import { useRouter } from "next/router";
import { AuthCheck } from "reactfire";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import _ from "lodash";
import Login from "components/Login";
import Highlighter from "components/code-blocks/Highlighter";
import styles from "styles/pages/coding-question/history.module.scss";
import clsx from "clsx";
import useCodingQuestionAttempts from "hooks/useCodingQuestionAttempts";
import { IoCopyOutline } from "react-icons/io5";
import { HiOutlineBadgeCheck, HiOutlineBan } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Tippy from "@tippyjs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function CodingQuestionUserHistoryPage() {
  const router = useRouter();
  const { qid } = router.query;
  const { attempts } = useCodingQuestionAttempts(qid);

  return (
    <AuthCheck fallback={<Login />}>
      <Layout>
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
                                    "YYYY-MM-DD HH:hh:ss A"
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
      </Layout>
    </AuthCheck>
  );
}

import { useRouter } from "next/router";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import Highlighter from "components/code-blocks/Highlighter";
import styles from "styles/pages/python-challenge/history.module.scss";
import clsx from "clsx";
import useCodingChallengeAttempts from "hooks/useCodingChallengeAttempts";
import { IoCopyOutline } from "react-icons/io5";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Tippy from "@tippyjs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useUser } from "context/UserContext";
import { useEffect } from "react";

dayjs.extend(relativeTime);

export default function PythonChallengeUserHistoryPage() {
  const { user } = useUser();
  const router = useRouter();
  const { cid } = router.query;
  const { attempts } = useCodingChallengeAttempts(cid);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return (
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
                              o.is_success ? "green" : "pink"
                            )}
                          >
                            Result
                          </span>

                          <div className={styles.text}>
                            {o.is_success ? (
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
                        {o.submitted_at && (
                          <div className={styles.timestamp}>
                            <span className="label yellow">Submitted</span>

                            <div className={styles.text}>
                              <Tippy
                                content={dayjs(o.submitted_at).format(
                                  "YYYY-MM-DD HH:mm:ss A"
                                )}
                                className="tippy"
                                placement="bottom"
                                theme="light"
                              >
                                <span>{dayjs(o.submitted_at).fromNow()}</span>
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
                              text={o.user_code}
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
                            content={o.user_code}
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
  );
}

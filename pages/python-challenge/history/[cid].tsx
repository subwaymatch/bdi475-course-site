import { useRouter } from "next/router";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import Highlighter from "components/code-blocks/Highlighter";
import styles from "styles/pages/python-challenge/history.module.scss";
import clsx from "clsx";
import useSingleCodingChallengeAttempts from "hooks/useSingleCodingChallengeAttempts";
import { IoCopyOutline } from "react-icons/io5";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Tippy from "@tippyjs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getChallengeIdAsNumberFromQuery } from "utils/challenge";
import Chip from "components/common/Chip";

dayjs.extend(relativeTime);

export default function PythonChallengeUserHistoryPage() {
  const router = useRouter();
  const { cid } = router.query;
  let challengeId = getChallengeIdAsNumberFromQuery(cid);
  const { attempts } = useSingleCodingChallengeAttempts(challengeId);

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
                          <Chip color={o.is_success ? "green" : "pink"}>
                            Result
                          </Chip>

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
                            <Chip>Submitted</Chip>

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
                            <Chip color="blue">Code</Chip>

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

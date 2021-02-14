import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthCheck } from "reactfire";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import _ from "lodash";
import Login from "components/Login";
import Highlighter from "components/code-blocks/Highlighter";
import styles from "styles/pages/coding-question/history.module.scss";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useCodingQuestionAttempts from "hooks/useCodingQuestionAttempts";
import { BsCheck } from "react-icons/bs";
import { BsXCircle, BsXOctagon, BsXSquare } from "react-icons/bs";
import { HiOutlineBadgeCheck, HiOutlineBan } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { GrFormClose, GrStatusCritical } from "react-icons/gr";

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
                            <span className="label gray">Result</span>

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
                              <span className="label gray">Submitted</span>

                              <div className={styles.text}>
                                {dayjs(o.submittedAt.toDate()).fromNow()}
                              </div>
                            </div>
                          )}
                        </Col>

                        <Col md={8}>
                          <div className={styles.codeWrapper}>
                            <span className="label blue">Code</span>
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

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useFirestore, AuthCheck } from "reactfire";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import _ from "lodash";
import useFirebaseAuth from "hooks/useFirebaseAuth";
import { ICodingQuestionAttempt } from "typings/coding-question";
import Login from "components/Login";
import styles from "styles/pages/coding-question/history.module.scss";
import clsx from "clsx";
import useCodingQuestionAttempts from "hooks/useCodingQuestionAttempts";

export default function CodingQuestionUserHistoryPage() {
  const router = useRouter();
  const { qid } = router.query;
  const { attempts, updateAttempts } = useCodingQuestionAttempts(qid);

  return (
    <AuthCheck fallback={<Login />}>
      <Layout>
        <main className={styles.page}>
          <Container>
            <Row>
              <Col>
                <h2 className="sectionTitle">
                  Submission History
                  <span className="accent green" />
                </h2>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className={styles.attempts}>
                  {attempts.map((o, index) => (
                    <div key={index} className={styles.item}>
                      <Row className="align-items-center">
                        <Col>{o.isSuccess ? "Pass" : "Fail"}</Col>

                        <Col>View Code</Col>

                        <Col>
                          {o.submittedAt && (
                            <div>{JSON.stringify(o.submittedAt)}</div>
                          )}
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

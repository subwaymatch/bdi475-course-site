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

export default function CodingQuestionUserHistoryPage() {
  const router = useRouter();
  const { qid } = router.query;
  const { user } = useFirebaseAuth();
  const firestore = useFirestore();
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
          const questionAttempts = docData[qid as string];

          setAttempts(questionAttempts);
        } else {
          setAttempts([]);
        }
      });
  };

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
                      <h3>{o.isSuccess ? "Pass" : "Fail"}</h3>
                      {o.userCode}
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

import Layout from "components/Layout";
import CodingQuestion from "components/coding-question/CodingQuestion";
import styles from "styles/pages/coding-question/CodingQuestionPage.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import useAuth from "hooks/useAuth";
import firebase from "firebase";
import { useFirestoreDocData, useFirestore } from "reactfire";

export default function EditCodingQuestionPage() {
  const router = useRouter();
  const { qid } = router.query;
  const { user } = useAuth();

  const firestore = useFirestore();

  // easily access the Firestore library
  const questionDocRef = firestore
    .collection("codingQuestions")
    .doc(qid as string);

  const userAttemptsDoc = firestore
    .collection("userAttempts")
    .doc(qid as string);

  // subscribe to a document for realtime updates. just one line!
  const { status, data } = useFirestoreDocData(questionDocRef);

  return (status as any) === "loading" ? (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>Loading...</Col>
          </Row>
        </Container>
      </main>
    </Layout>
  ) : (
    <Layout>
      <main className={styles.page}>
        <Container>
          <CodingQuestion
            title={(data as any).title}
            textMarkdown={(data as any).textMarkdown}
            starterCode={(data as any).starterCode}
            testCode={(data as any).testCode}
            onSubmit={(isSuccess) => {
              if (user) {
                const netId = user.email.split("@")[0];

                console.log(`user.email=${user.email}`);
                console.log(`netId=${netId}`);

                userAttemptsDoc.set(
                  {
                    [qid as string]: {
                      [netId]: isSuccess,
                    },
                  },
                  {
                    merge: true,
                  }
                );
              }
            }}
          />
        </Container>
      </main>
    </Layout>
  );
}

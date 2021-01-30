import Layout from "components/Layout";
import CodingQuestion from "components/coding-question/CodingQuestion";
import styles from "styles/pages/coding-question/CodingQuestionPage.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { useFirestoreDocData, useFirestore } from "reactfire";

export default function EditCodingQuestionPage() {
  const router = useRouter();
  const { qid } = router.query;

  // easily access the Firestore library
  const docRef = useFirestore()
    .collection("codingQuestions")
    .doc(qid as string);

  // subscribe to a document for realtime updates. just one line!
  const { status, data } = useFirestoreDocData(docRef);

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
          />
        </Container>
      </main>
    </Layout>
  );
}
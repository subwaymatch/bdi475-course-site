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
    <p>Fetching test data...</p>
  ) : (
    <Layout>
      <main className={styles.page}>
        <Row>
          <Col>
            <pre>
              return <p>Test Data: {JSON.stringify(data)}!</p>;
            </pre>
          </Col>
        </Row>

        <Container>
          <CodingQuestion
            title={"Update a Variable"}
            textMarkdown={
              "Can you retrieve and print out the number of languages Vrushita speaks from the candidate dictionary? For example, if Vrushita speaks only one language, your printed output should be 3."
            }
            starterCode={"print('Hello World')"}
            testCode={"tc.assertEqual(3, 3)"}
          />
        </Container>
      </main>
    </Layout>
  );
}

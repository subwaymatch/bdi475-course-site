import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { useFirestoreDocData, useFirestore } from "reactfire";

export default function FirestoreTestPage() {
  // easily access the Firestore library
  const docRef = useFirestore().collection("test").doc("someid");

  // subscribe to a document for realtime updates. just one line!
  const { status, data } = useFirestoreDocData(docRef);

  // easily check the loading status
  if (status === "loading") {
    return <p>Fetching test data...</p>;
  }

  return (
    <Layout>
      <main>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Firestore Test</h1>
            </Col>
          </Row>

          <Row>
            <Col>
              <pre>
                return <p>Test Data: {JSON.stringify(data)}!</p>;
              </pre>
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}

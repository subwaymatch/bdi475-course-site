import { useRouter } from "next/router";

import RecordedPythonExercise from "components/common/RecordedPythonExercise";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";

export default function ViewCodingQuestionPage() {
  const router = useRouter();
  const { qid } = router.query;

  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            {qid ? (
              <RecordedPythonExercise qid={qid as string} />
            ) : (
              <p>Loading...</p>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

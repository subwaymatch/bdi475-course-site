import { useRouter } from "next/router";

import RecordedCodingQuestion from "components/common/RecordedCodingQuestion";
import Layout from "components/Layout";
import { Col, Container, Row } from "react-bootstrap";

export default function ViewCodingQuestionPage() {
  const router = useRouter();
  const { qid } = router.query;

  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            {qid ? (
              <RecordedCodingQuestion qid={qid as string} />
            ) : (
              <p>Loading...</p>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

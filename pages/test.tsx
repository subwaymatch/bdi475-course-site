import RecordedCodingQuestion from "components/common/RecordedCodingQuestion";
import Layout from "components/Layout";
import { Col, Container, Row } from "react-bootstrap";

export default function TestPage() {
  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            <RecordedCodingQuestion qid="CyHuSl" />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

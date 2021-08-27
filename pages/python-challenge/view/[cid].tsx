import { useRouter } from "next/router";
import RecordedPythonChallenge from "components/common/RecordedPythonChallenge";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";

export default function ViewCodingChallengePage() {
  const router = useRouter();
  const { cid } = router.query;

  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            {cid ? (
              <RecordedPythonChallenge challengeId={cid as string} />
            ) : (
              <p>Loading...</p>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

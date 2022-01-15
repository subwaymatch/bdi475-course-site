import { useRouter } from "next/router";
import RecordedPythonChallengeById from "components/common/RecordedPythonChallengeById";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { getChallengeIdAsNumberFromQuery } from "utils/challenge";

export default function ViewCodingChallengePage() {
  const router = useRouter();
  const { cid } = router.query;
  let challengeId = getChallengeIdAsNumberFromQuery(cid);

  return (
    <Layout>
      <main
        style={{
          paddingBottom: "10rem",
        }}
      >
        <Container>
          <Row>
            <Col>
              {cid ? (
                <RecordedPythonChallengeById challengeId={challengeId} />
              ) : (
                <p>Loading...</p>
              )}
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}

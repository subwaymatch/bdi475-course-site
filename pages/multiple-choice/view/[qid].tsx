import { useRouter } from "next/router";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { getChallengeIdAsNumberFromQuery } from "utils/challenge";
import RecordedMultipleChoiceQuestionById from "components/common/RecordedMultipleChoiceQuestionById";

export default function ViewMultipleChoiceQuestionPage() {
  const router = useRouter();
  const { qid } = router.query;
  let challengeId = getChallengeIdAsNumberFromQuery(qid);

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
              {qid ? (
                <RecordedMultipleChoiceQuestionById questionId={challengeId} />
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

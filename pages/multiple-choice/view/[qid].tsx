import { useRouter } from "next/router";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { getChallengeIdAsNumberFromQuery } from "utils/challenge";
import RecordedMultipleChoiceQuestion from "components/common/RecordedMultipleChoiceQuestion";
import { ChallengeTypeEnum, IChallengeTypeAndId } from "types/challenge";
import { ChallengesContextProvider } from "context/ChallengesContext";
import { useEffect, useState } from "react";

export default function ViewMultipleChoiceQuestionPage() {
  const router = useRouter();
  const { qid } = router.query;
  let challengeId = getChallengeIdAsNumberFromQuery(qid);
  const [challenges, setChallenges] = useState<IChallengeTypeAndId[]>(null);

  useEffect(() => {
    if (router.isReady) {
      const challenge = {
        challengeType: ChallengeTypeEnum.MultipleChoice,
        challengeId,
      };

      setChallenges([challenge]);
    }
  }, [router.isReady]);

  return (
    <ChallengesContextProvider challenges={challenges}>
      <Layout>
        <main
          style={{
            paddingBottom: "10rem",
          }}
        >
          <Container fluid>
            <Row>
              <Col>
                {qid ? (
                  <RecordedMultipleChoiceQuestion questionId={challengeId} />
                ) : (
                  <p>Loading...</p>
                )}
              </Col>
            </Row>
          </Container>
        </main>
      </Layout>
    </ChallengesContextProvider>
  );
}

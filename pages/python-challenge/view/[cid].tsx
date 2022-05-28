import { useRouter } from "next/router";
import RecordedPythonChallenge from "components/common/RecordedPythonChallenge";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { getChallengeIdAsNumberFromQuery } from "utils/challenge";
import { ChallengeTypeEnum, IChallengeTypeAndId } from "types/challenge";
import { ChallengesContextProvider } from "context/ChallengesContext";
import { useEffect, useState } from "react";

export default function ViewPythonChallengePage() {
  const router = useRouter();
  const { cid } = router.query;
  let challengeId = getChallengeIdAsNumberFromQuery(cid);
  const [challenges, setChallenges] = useState<IChallengeTypeAndId[]>(null);

  useEffect(() => {
    if (router.isReady) {
      const challenge = {
        challengeType: ChallengeTypeEnum.PythonChallenge,
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
                {cid ? (
                  <RecordedPythonChallenge challengeId={challengeId} />
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

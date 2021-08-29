import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { generateQuestionId } from "utils/question";
import { supabaseClient } from "lib/supabase/supabaseClient";
import { definitions } from "types/database";
import { toast } from "react-toastify";

export default function CreatePythonExercisePage() {
  const router = useRouter();

  const createNewChallenge = async () => {
    const { data: challengeData, error: challengeError } = await supabaseClient
      .from<definitions["coding_challenges"]>("coding_challenges")
      .insert([{}]);

    if (challengeError) {
      console.error(challengeError);

      toast.error("Error creating a new challenge: " + challengeError.message);
      return;
    }

    const newChallengeId = challengeData[0].id;

    const { data: solutionData, error: solutionError } = await supabaseClient
      .from<definitions["coding_challenge_solutions"]>(
        "coding_challenge_solutions"
      )
      .insert([
        {
          challenge_id: newChallengeId,
        },
      ]);

    if (solutionError) {
      console.error(solutionError);

      toast.error(
        `Error creating a solution entry for ${newChallengeId}: ${challengeError.message}`
      );
      return;
    }

    console.log("Insert result");
    console.log(challengeData[0].id);

    router.push(`/python-challenge/edit/${challengeData[0].id}`);
  };

  useEffect(() => {
    createNewChallenge();
  }, []);

  return (
    <Layout excludeHeader={true}>
      <Container>
        <Row>
          <Col>Creating...</Col>
        </Row>
      </Container>
    </Layout>
  );
}

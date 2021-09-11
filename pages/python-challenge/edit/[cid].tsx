import PythonChallengeEditor from "components/challenges/PythonChallengeEditor";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { Container, Row, Col } from "react-bootstrap";
import { supabaseClient } from "lib/supabase/supabaseClient";
import _ from "lodash";
import { useEffect, useState } from "react";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { definitions } from "types/database";
import { getChallengeIdAsNumberFromQuery } from "utils/challenge";
import { toast } from "react-toastify";

export default function EditCodingChallengePage() {
  const router = useRouter();
  const { user, roles } = useSupabaseAuth();
  const { cid } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const challengeId = getChallengeIdAsNumberFromQuery(cid);
  const [challengeData, setChallengeData] =
    useState<definitions["coding_challenges"]>(null);
  const [solutionData, setSolutionData] =
    useState<definitions["coding_challenge_solutions"]>(null);

  const loadChallengeData = async () => {
    setIsLoading(true);

    const { data: challengeData, error: challengeError } = await supabaseClient
      .from<definitions["coding_challenges"]>("coding_challenges")
      .select()
      .eq("id", challengeId)
      .single();

    if (challengeError) {
      console.error(challengeError);
    }

    const { data: solutionData, error: solutionError } = await supabaseClient
      .from<definitions["coding_challenge_solutions"]>(
        "coding_challenge_solutions"
      )
      .select()
      .eq("challenge_id", challengeId)
      .single();

    if (solutionError) {
      console.error(solutionError);
    }

    setChallengeData(challengeData);
    setSolutionData(solutionData);

    setIsLoading(false);
  };

  const onDelete = async () => {
    const { data, error: deleteError } = await supabaseClient
      .from<definitions["coding_challenges"]>("coding_challenges")
      .delete()
      .match({ id: challengeId });

    if (deleteError) {
      console.error(deleteError);
    }

    router.push("/python-challenge/list");
  };

  const onClone = async () => {
    const challengeDataClone = _.cloneDeep(challengeData);
    delete challengeDataClone.id;

    const { data: challengeCloneResult, error: challengeCloneError } =
      await supabaseClient
        .from<definitions["coding_challenges"]>("coding_challenges")
        .insert([challengeDataClone]);

    if (challengeCloneError) {
      console.error(challengeCloneError);

      toast.error("Error cloning challenge: " + challengeCloneError.message);
      return;
    }

    const clonedChallengeId = challengeCloneResult[0].id;

    const { data: clonedSolutionData, error: solutionCloneError } =
      await supabaseClient
        .from<definitions["coding_challenge_solutions"]>(
          "coding_challenge_solutions"
        )
        .insert(
          [
            Object.assign({}, solutionData, {
              challenge_id: clonedChallengeId,
            }),
          ],
          {
            returning: "minimal",
          }
        );

    if (solutionCloneError) {
      console.error(solutionCloneError);

      toast.error(
        `Error cloning the solution entry for ${clonedChallengeId}: ${solutionCloneError.message}`
      );

      return;
    }

    router.push(`/python-challenge/edit/${challengeCloneResult[0].id}`);
  };

  const save = async (
    updatedChallengeData: definitions["coding_challenges"],
    updatedSolutionData: definitions["coding_challenge_solutions"]
  ) => {
    setChallengeData(updatedChallengeData);
    setSolutionData(updatedSolutionData);

    const { data: challengeUpdateResult, error: challengeUpdateError } =
      await supabaseClient
        .from<definitions["coding_challenges"]>("coding_challenges")
        .update(updatedChallengeData, {
          returning: "minimal",
        })
        .match({ id: updatedChallengeData.id });

    if (challengeUpdateError) {
      console.error(challengeUpdateError);
    }

    const { data: solutionUpdateResult, error: solutionUpdateError } =
      await supabaseClient
        .from<definitions["coding_challenge_solutions"]>(
          "coding_challenge_solutions"
        )
        .update(updatedSolutionData, {
          returning: "minimal",
        })
        .match({ challenge_id: updatedSolutionData.challenge_id });

    if (solutionUpdateError) {
      console.error(solutionUpdateError);
    }
  };

  useEffect(() => {
    if (!challengeId || !user) {
      return;
    }

    loadChallengeData();
  }, [challengeId, user, roles]);

  return isLoading ? (
    <Layout excludeHeader={true} excludeFooter={true}>
      <Container>
        <Row>
          <Col>Loading...</Col>
        </Row>
      </Container>
    </Layout>
  ) : (
    <Layout excludeHeader={true} excludeFooter={true}>
      <PythonChallengeEditor
        qid={challengeId}
        challengeData={challengeData}
        solutionData={solutionData}
        onSave={save}
        onClone={onClone}
        onDelete={onDelete}
      />
    </Layout>
  );
}

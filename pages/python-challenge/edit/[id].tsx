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
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const challengeId = getChallengeIdAsNumberFromQuery(id);
  const [challengeData, setChallengeData] =
    useState<definitions["coding_challenges"]>(null);

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

    setChallengeData(challengeData);
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

    router.push(`/python-challenge/edit/${clonedChallengeId}`);
  };

  const save = async (
    updatedChallengeData: definitions["coding_challenges"]
  ) => {
    setChallengeData(updatedChallengeData);

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
        id={challengeId}
        challengeData={challengeData}
        onSave={save}
        onClone={onClone}
        onDelete={onDelete}
      />
    </Layout>
  );
}

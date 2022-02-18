import PythonChallengeEditor from "components/challenges/editor/PythonChallengeEditor";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { Container, Row, Col } from "react-bootstrap";
import { supabaseClient } from "lib/supabase/supabaseClient";
import cloneDeep from "lodash/cloneDeep";
import { useEffect, useRef, useState } from "react";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { definitions } from "types/database";
import { getChallengeIdAsNumberFromQuery } from "utils/challenge";
import { toast } from "react-toastify";
import usePythonRuntime from "hooks/usePythonRuntime";
import { PythonRuntimeStatus } from "types/pyodide";

export default function EditCodingChallengePage() {
  const router = useRouter();
  const { user, roles } = useSupabaseAuth();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const challengeId = getChallengeIdAsNumberFromQuery(id);
  const [challengeData, setChallengeData] =
    useState<definitions["coding_challenges"]>(null);
  const challengeDataRef = useRef<definitions["coding_challenges"]>();
  const { status: pyodideStatus, runAndCheckCode } = usePythonRuntime();
  const isRuntimeReady = pyodideStatus === PythonRuntimeStatus.READY;

  challengeDataRef.current = challengeData;

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

  const deleteChallenge = async () => {
    const { data, error: deleteError } = await supabaseClient
      .from<definitions["coding_challenges"]>("coding_challenges")
      .delete()
      .match({ id: challengeId });

    if (deleteError) {
      console.error(deleteError);
    }

    router.push("/python-challenge/list");
  };

  const save = async (
    updatedChallengeData: definitions["coding_challenges"]
  ): Promise<boolean> => {
    setChallengeData(cloneDeep(updatedChallengeData));

    if (isRuntimeReady) {
      const result = await runAndCheckCode(
        updatedChallengeData.solution_code,
        updatedChallengeData.test_code
      );

      if (
        result.hasError &&
        !window.confirm(
          "Your solution code and/or test cases contain an error. Do you still want to update this challenge?"
        )
      ) {
        return false;
      }
    }

    const { data: challengeUpdateResult, error: challengeUpdateError } =
      await supabaseClient
        .from<definitions["coding_challenges"]>("coding_challenges")
        .update(updatedChallengeData, {
          returning: "minimal",
        })
        .match({ id: updatedChallengeData.id });

    if (challengeUpdateError) {
      console.error(challengeUpdateError);
      return false;
    }

    return true;
  };

  const clone = async () => {
    const challengeDataClone = cloneDeep(challengeDataRef.current);
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
        save={save}
        clone={clone}
        deleteChallenge={deleteChallenge}
      />
    </Layout>
  );
}

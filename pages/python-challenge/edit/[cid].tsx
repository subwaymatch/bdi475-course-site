import PythonChallengeEditor from "components/python-challenge/PythonChallengeEditor";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { Container, Row, Col } from "react-bootstrap";
import { supabaseClient } from "lib/supabase/supabaseClient";
import _ from "lodash";
import { useEffect, useState } from "react";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { definitions } from "types/database";
import { getChallengeIdAsNumberFromQuery } from "utils/challenge";

export default function EditCodingQuestionPage() {
  const router = useRouter();
  const { user, roles } = useSupabaseAuth();
  const { cid } = router.query;
  const challengeId = getChallengeIdAsNumberFromQuery(cid);
  const [challengeData, setChallengeData] =
    useState<definitions["coding_challenges"]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [solutionData, setSolutionData] =
    useState<definitions["coding_challenge_solutions"]>(null);

  const loadQuestionData = async () => {
    setIsLoading(true);

    const { data: challengeData, error: challengeError } = await supabaseClient
      .from<definitions["coding_challenges"]>("coding_challenges")
      .select()
      .eq("id", challengeId)
      .single();

    const { data: solutionData, error: solutionError } = await supabaseClient
      .from<definitions["coding_challenge_solutions"]>(
        "coding_challenge_solutions"
      )
      .select()
      .eq("challenge_id", challengeId)
      .single();

    setChallengeData(challengeData);
    setSolutionData(solutionData);

    setIsLoading(false);
  };

  const onDelete = async () => {
    const { data, error } = await supabaseClient
      .from("coding_challenges")
      .delete()
      .match({ id: challengeId });

    router.push("/python-challenge/list");
  };

  const onClone = async () => {
    // const clonedDocRef = await firestore
    //   .collection("codingQuestions")
    //   .doc(generateQuestionId());
    // const clonedData = Object.assign({}, _.cloneDeep(v), {
    //   title: v.title + " (Clone)",
    // });
    // await clonedDocRef.set(clonedData);
    // router.push(`/python-challenge/edit/${clonedDocRef.id}`);
  };

  const saveQuestionData = async (v) => {
    // await docRef.set(v, { merge: true });
  };

  const saveSolutionCode = async (solutionCode) => {};

  useEffect(() => {
    if (!challengeId || !user) {
      return;
    }

    loadQuestionData();
  }, [challengeId, user, roles]);

  return isLoading ? (
    <Layout excludeHeader={true}>
      <Container>
        <Row>
          <Col>Loading...</Col>
        </Row>
      </Container>
    </Layout>
  ) : (
    <Layout excludeHeader={true}>
      <PythonChallengeEditor
        qid={challengeId}
        challengeData={challengeData}
        solutionData={solutionData}
        onSave={(questionData, solutionCode) => {
          saveQuestionData(questionData);
          saveSolutionCode(solutionCode);
        }}
        onClone={onClone}
        onDelete={onDelete}
      />
    </Layout>
  );
}

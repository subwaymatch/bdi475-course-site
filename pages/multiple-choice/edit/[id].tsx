import MultipleChoiceEditor from "components/challenges/MultipleChoiceEditor";
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
  const [questionData, setQuestionData] =
    useState<definitions["multiple_choice_questions"]>(null);
  const [optionsData, setOptionsData] =
    useState<definitions["multiple_choice_options"][]>(null);

  const loadChallengeData = async () => {
    setIsLoading(true);

    const { data: qData, error: qError } = await supabaseClient
      .from<definitions["multiple_choice_questions"]>(
        "multiple_choice_questions"
      )
      .select()
      .eq("id", challengeId)
      .single();

    if (qError) {
      console.error(qError);
    }

    const { data: oData, error: oError } = await supabaseClient
      .from<definitions["multiple_choice_options"]>("multiple_choice_options")
      .select()
      .eq("question_id", challengeId);

    if (oError) {
      console.error(oError);
    }

    setQuestionData(qData);
    setOptionsData(oData);

    setIsLoading(false);
  };

  const onDelete = async () => {
    const { data, error: deleteError } = await supabaseClient
      .from<definitions["multiple_choice_options"]>("multiple_choice_options")
      .delete()
      .match({ id: challengeId });

    if (deleteError) {
      console.error(deleteError);
    }

    router.push("/multiple-choice/list");
  };

  const onClone = async () => {
    const questionClone = _.cloneDeep(questionData);
    delete questionClone.id;

    const { data: qData, error: qError } = await supabaseClient
      .from<definitions["multiple_choice_questions"]>(
        "multiple_choice_questions"
      )
      .insert([questionClone]);

    if (qError) {
      console.error(qError);

      toast.error("Error cloning challenge: " + qError.message);
      return;
    }

    const clonedChallengeId = qData[0].id;

    const optionsClone = _.cloneDeep(optionsData);
    optionsClone.forEach((o) => {
      o.questionId = clonedChallengeId;
      delete optionsClone.id;
    });

    const { data: oData, error: oError } = await supabaseClient
      .from<definitions["multiple_choice_options"]>("multiple_choice_options")
      .insert(optionsClone, {
        returning: "minimal",
      });

    if (oError) {
      console.error(oError);

      toast.error(
        `Error cloning the options for ${clonedChallengeId}: ${oError.message}`
      );

      return;
    }

    router.push(`/multiple-choice/edit/${clonedChallengeId}`);
  };

  const save = async (
    updatedQuestionData: definitions["multiple_choice_questions"],
    updatedOptionsData: definitions["multiple_choice_options"][]
  ) => {
    const previousIds = optionsData.map((o) => o.id);
    const newIds = updatedOptionsData.map((o) => o.id);
    const idsToDelete = previousIds.filter((x) => !newIds.includes(x));

    console.log(`idsToDelete=${JSON.stringify(idsToDelete)}`);

    setQuestionData(updatedQuestionData);
    setOptionsData(updatedOptionsData);

    const { data: challengeUpdateResult, error: challengeUpdateError } =
      await supabaseClient
        .from<definitions["multiple_choice_questions"]>(
          "multiple_choice_questions"
        )
        .update(updatedQuestionData, {
          returning: "minimal",
        })
        .match({ id: updatedQuestionData.id });

    if (challengeUpdateError) {
      console.error(challengeUpdateError);
      return;
    }

    const { data: optionsUpdateResult, error: optionsUpdateError } =
      await supabaseClient
        .from<definitions["multiple_choice_options"]>("multiple_choice_options")
        .upsert(updatedOptionsData, {
          returning: "minimal",
        });

    if (optionsUpdateError) {
      console.error(challengeUpdateError);
      return;
    }

    // TODO: Delete dangling option Ids
  };

  useEffect(() => {
    console.log(`useEffect(), challengeId=${challengeId}, user=${user}`);

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
      <MultipleChoiceEditor
        id={challengeId}
        questionData={questionData}
        optionsData={optionsData}
        onSave={save}
        onClone={onClone}
        onDelete={onDelete}
      />
    </Layout>
  );
}
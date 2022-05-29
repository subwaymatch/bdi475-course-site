import MultipleChoiceEditor from "components/challenges/editor/MultipleChoiceEditor";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { Container, Row, Col } from "react-bootstrap";
import { supabaseClient } from "lib/supabase/supabaseClient";
import cloneDeep from "lodash/cloneDeep";
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
      .from<definitions["multiple_choice_questions"]>(
        "multiple_choice_questions"
      )
      .delete()
      .match({ id: challengeId });

    if (deleteError) {
      console.error(deleteError);
    }

    router.push("/multiple-choice/list");
  };

  const onClone = async () => {
    const questionClone = cloneDeep(questionData);
    delete questionClone.id;
    delete questionClone.createdAt;

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

    const optionsClone = cloneDeep(optionsData);
    optionsClone.forEach((o) => {
      o.question_id = clonedChallengeId;
      delete o.id;
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

    toast.success(
      `Successfully cloned multiple choice question ${challengeId}`
    );
  };

  const save = async (
    updatedQuestionData: definitions["multiple_choice_questions"],
    updatedOptionsData: definitions["multiple_choice_options"][],
    displayToast = true
  ) => {
    const updatedQuestionDataCopy: definitions["multiple_choice_questions"] =
      cloneDeep(updatedQuestionData);
    const updatedOptionsDataCopy: Array<
      definitions["multiple_choice_options"]
    > = cloneDeep(updatedOptionsData.filter((o) => o));

    const previousIds = optionsData.map((o) => o.id);
    const newIds = updatedOptionsDataCopy.map((o) => o.id);
    const idsToDelete = previousIds.filter((x) => !newIds.includes(x));
    const oldOptionsData = updatedOptionsDataCopy.filter((o) => o.id > 0);
    const newOptionsData = updatedOptionsDataCopy
      .filter((o) => o.id < 0)
      .map((o) => {
        delete o.id;
        return o;
      });

    const { data: challengeUpdateResult, error: challengeUpdateError } =
      await supabaseClient
        .from<definitions["multiple_choice_questions"]>(
          "multiple_choice_questions"
        )
        .update(updatedQuestionDataCopy, {
          returning: "minimal",
        })
        .match({ id: updatedQuestionDataCopy.id });

    if (challengeUpdateError) {
      toast.error(`Error updating question`);
      console.error(challengeUpdateError);
      return;
    }

    const { data: oldOptionsUpdateResult, error: oldOptionsUpdateError } =
      await supabaseClient
        .from<definitions["multiple_choice_options"]>("multiple_choice_options")
        .upsert(oldOptionsData);

    if (oldOptionsUpdateError) {
      console.error(oldOptionsUpdateError);
      return;
    }

    const { data: newOptionsUpdateResult, error: newOptionsUpdateError } =
      await supabaseClient
        .from<definitions["multiple_choice_options"]>("multiple_choice_options")
        .insert(newOptionsData);

    if (newOptionsUpdateError) {
      toast.error(`Error updating options`);
      console.error(newOptionsUpdateError);
      return;
    }

    const { data: deleteResult, error: deleteError } = await supabaseClient
      .from<definitions["multiple_choice_options"]>("multiple_choice_options")
      .delete()
      .in("id", idsToDelete);

    if (deleteError) {
      toast.error(`Error deleting options ${JSON.stringify(idsToDelete)}`);
      console.error(deleteError);
      return;
    }

    setQuestionData(updatedQuestionDataCopy);
    setOptionsData([...oldOptionsUpdateResult, ...newOptionsUpdateResult]);

    if (displayToast === true) {
      toast.success(`Saved successfully`);
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

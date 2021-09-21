import { supabaseClient } from "lib/supabase/supabaseClient";
import { useEffect, useState } from "react";
import { QueryStatusEnum } from "types";
import { definitions } from "types/database";

export default function useMultipleChoiceQuestion(questionId: number) {
  const [result, setResult] = useState<{
    status: QueryStatusEnum;
    questionData: definitions["multiple_choice_questions"];
    optionsData: definitions["multiple_choice_options"][];
    error: string;
  }>({
    status: QueryStatusEnum.LOADING,
    questionData: null,
    optionsData: null,
    error: "",
  });

  const fetchData = async () => {
    setResult(
      Object.assign({}, result, {
        status: QueryStatusEnum.LOADING,
      })
    );

    await fetchQuestionData();
    await fetchOptionsData();

    console.log(`fetchDataComplete`);
  };

  const fetchQuestionData = async () => {
    const { data, error } = await supabaseClient
      .from<definitions["multiple_choice_questions"]>(
        "multiple_choice_questions"
      )
      .select()
      .eq("id", questionId)
      .single();

    if (error && result.status !== QueryStatusEnum.ERROR) {
      console.error(error);
      setResult((prevResult) =>
        Object.assign({}, prevResult, {
          status: QueryStatusEnum.ERROR,
          questionData: null,
          error: error.message,
        })
      );
    } else {
      setResult((prevResult) =>
        Object.assign({}, prevResult, {
          status: prevResult.optionsData
            ? QueryStatusEnum.SUCCESS
            : QueryStatusEnum.LOADING,
          questionData: data,
          error: "",
        })
      );
    }
  };

  const fetchOptionsData = async () => {
    const { data, error } = await supabaseClient
      .from<definitions["multiple_choice_options"]>("multiple_choice_options")
      .select()
      .eq("question_id", questionId);

    if (error && result.status !== QueryStatusEnum.ERROR) {
      console.error(error);
      setResult((prevResult) =>
        Object.assign({}, prevResult, {
          status: QueryStatusEnum.ERROR,
          optionsData: null,
          error: error.message,
        })
      );
    } else {
      setResult((prevResult) =>
        Object.assign({}, prevResult, {
          status: prevResult.questionData
            ? QueryStatusEnum.SUCCESS
            : QueryStatusEnum.LOADING,
          optionsData: data,
          error: "",
        })
      );
    }
  };

  useEffect(() => {
    if (result.status !== QueryStatusEnum.SUCCESS) {
      fetchData();
    }
  }, []);

  return result;
}

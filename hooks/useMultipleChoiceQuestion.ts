import { supabaseClient } from "lib/supabase/supabaseClient";
import { useEffect, useState } from "react";
import { definitions } from "types/database";

export default function useMultipleChoiceQuestion(questionId: number) {
  const [questionDataResult, setQuestionDataResult] = useState<{
    status: string;
    data: definitions["multiple_choice_questions"];
    error: string;
  }>({
    status: "loading",
    data: null,
    error: "",
  });

  const [optionsDataResult, setOptionsDataResult] = useState<{
    status: string;
    data: definitions["multiple_choice_options"][];
    error: string;
  }>({
    status: "loading",
    data: null,
    error: "",
  });

  const fetchQuestionData = async () => {
    const { data, error } = await supabaseClient
      .from<definitions["multiple_choice_questions"]>(
        "multiple_choice_questions"
      )
      .select()
      .eq("id", questionId)
      .single();

    setQuestionDataResult((prevResult) =>
      Object.assign({}, prevResult, {
        status: error ? "error" : "success",
        data,
        error: error ? error.message : null,
      })
    );
  };

  const fetchOptionsData = async () => {
    const { data, error } = await supabaseClient
      .from<definitions["multiple_choice_options"]>("multiple_choice_options")
      .select()
      .eq("question_id", questionId);

    setOptionsDataResult((prevResult) =>
      Object.assign({}, prevResult, {
        status: error ? "error" : "success",
        data,
        error: error ? error.message : null,
      })
    );
  };

  useEffect(() => {
    fetchQuestionData();
    fetchOptionsData();
  }, []);

  return {
    questionData: questionDataResult,
    optionsData: optionsDataResult,
  };
}

import { supabaseClient } from "lib/supabase/supabaseClient";
import { useEffect, useState } from "react";
import { definitions } from "types/database";

export default function useMultipleChoiceQuestion(questionId: number) {
  const [result, setResult] = useState<{
    status: string;
    questionData: definitions["multiple_choice_questions"];
    optionsData: definitions["multiple_choice_options"][];
    error: string;
  }>({
    status: "loading",
    questionData: null,
    optionsData: null,
    error: "",
  });

  const fetchData = async () => {
    setResult(
      Object.assign({}, result, {
        status: "loading",
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

    if (error && result.status !== "error") {
      console.error(error);
      setResult((prevResult) =>
        Object.assign({}, prevResult, {
          status: "error",
          questionData: null,
          error: error.message,
        })
      );
    } else {
      setResult((prevResult) =>
        Object.assign({}, prevResult, {
          status: prevResult.optionsData ? "success" : "loading",
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

    if (error && result.status !== "error") {
      console.error(error);
      setResult((prevResult) =>
        Object.assign({}, prevResult, {
          status: "error",
          optionsData: null,
          error: error.message,
        })
      );
    } else {
      setResult((prevResult) =>
        Object.assign({}, prevResult, {
          status: prevResult.questionData ? "success" : "loading",
          optionsData: data,
          error: "",
        })
      );
    }
  };

  useEffect(() => {
    if (result.status !== "success") {
      fetchData();
    }
  }, []);

  console.log(`useMultipleChoiceQuestion`);
  console.log(result);

  return result;
}

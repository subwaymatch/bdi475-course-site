import { supabaseClient } from "lib/supabase/supabaseClient";
import { useEffect, useState } from "react";

export default function usePythonExercise(qid) {
  const [result, setResult] = useState({
    status: "loading",
    data: null,
    error: "",
  });

  const fetchQuestionData = async () => {
    const { data, error } = await supabaseClient
      .from("coding_questions")
      .select()
      .eq("id", qid)
      .single();

    const codingQuestion = {
      title: data.title,
      textMarkdown: data.text_markdown,
      starterCode: data.starter_code,
      testCode: data.test_code,
    };

    setResult((prevResult) =>
      Object.assign({}, prevResult, {
        status: error ? "error" : "success",
        data: codingQuestion,
        error: error ? error.message : null,
      })
    );
  };

  useEffect(() => {
    fetchQuestionData();
  }, []);

  return result;
}

import { supabaseClient } from "lib/supabase/supabaseClient";
import { useEffect, useState } from "react";
import { definitions } from "types/database";

export default function usePythonChallenge(challengeId) {
  const [result, setResult] = useState<{
    status: string;
    data: definitions["coding_challenges"];
    error: string;
  }>({
    status: "loading",
    data: null,
    error: "",
  });

  const fetchQuestionData = async () => {
    const { data, error } = await supabaseClient
      .from<definitions["coding_challenges"]>("coding_challenges")
      .select()
      .eq("id", challengeId)
      .single();

    setResult((prevResult) =>
      Object.assign({}, prevResult, {
        status: error ? "error" : "success",
        data,
        error: error ? error.message : null,
      })
    );
  };

  useEffect(() => {
    fetchQuestionData();
  }, []);

  return result;
}

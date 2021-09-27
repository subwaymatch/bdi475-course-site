import { supabaseClient } from "lib/supabase/supabaseClient";
import { useEffect, useState } from "react";
import { QueryStatusEnum } from "types";
import { IMultipleChoiceQuestionWithOptions } from "types/database/multiple-choice";

export default function useMultipleChoiceQuestion(questionId: number) {
  const [result, setResult] = useState<{
    status: QueryStatusEnum;
    questionData: IMultipleChoiceQuestionWithOptions;
    error: string;
  }>({
    status: QueryStatusEnum.LOADING,
    questionData: null,
    error: "",
  });

  const fetchData = async () => {
    setResult(
      Object.assign({}, result, {
        status: QueryStatusEnum.LOADING,
      })
    );

    const { data, error } = await supabaseClient
      .from<IMultipleChoiceQuestionWithOptions>("mcq_with_options")
      .select()
      .eq("id", questionId)
      .single();

    if (error) {
      console.error(error);
      setResult((prevResult) =>
        Object.assign({}, prevResult, {
          status: error ? QueryStatusEnum.ERROR : QueryStatusEnum.SUCCESS,
          questionData: error ? null : data,
          error: error.message,
        })
      );
    } else {
      setResult((prevResult) =>
        Object.assign({}, prevResult, {
          status: QueryStatusEnum.SUCCESS,
          questionData: data,
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

import { supabaseClient } from "lib/supabase/supabaseClient";
import { useEffect, useState } from "react";
import { QueryStatusEnum } from "types";
import { IMultipleChoiceQuestionWithOptions } from "types/database/multiple-choice";

export default function useMultipleChoiceQuestions(questionIds: number[]) {
  const [result, setResult] = useState<{
    status: QueryStatusEnum;
    data: IMultipleChoiceQuestionWithOptions[];
    error: string;
  }>({
    status: QueryStatusEnum.INITIALIZED,
    data: null,
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
      .in("id", questionIds);

    setResult((prevResult) =>
      Object.assign({}, prevResult, {
        status: error ? QueryStatusEnum.ERROR : QueryStatusEnum.SUCCESS,
        data,
        error: error?.message,
      })
    );
  };

  useEffect(() => {
    if (questionIds && result.status === QueryStatusEnum.INITIALIZED) {
      fetchData();
    }
  }, [questionIds]);

  return result;
}

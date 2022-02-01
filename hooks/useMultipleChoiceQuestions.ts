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
    status: QueryStatusEnum.LOADING,
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

    if (error) {
      console.error(error);
      setResult((prevResult) =>
        Object.assign({}, prevResult, {
          status: QueryStatusEnum.ERROR,
          data: null,
          error: error.message,
        })
      );
    } else {
      setResult((prevResult) =>
        Object.assign({}, prevResult, {
          status: QueryStatusEnum.SUCCESS,
          data,
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

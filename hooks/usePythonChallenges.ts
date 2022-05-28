import { supabaseClient } from "lib/supabase/supabaseClient";
import { useEffect, useState } from "react";
import { QueryStatusEnum } from "types";
import { definitions } from "types/database";

export default function usePythonChallenges(challengeIds: number[]) {
  const [result, setResult] = useState<{
    status: QueryStatusEnum;
    data: definitions["coding_challenges"][];
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
      .from<definitions["coding_challenges"]>("coding_challenges")
      .select()
      .in("id", challengeIds);

    setResult((prevResult) =>
      Object.assign({}, prevResult, {
        status: error ? QueryStatusEnum.ERROR : QueryStatusEnum.SUCCESS,
        data,
        error: error?.message,
      })
    );
  };

  useEffect(() => {
    if (challengeIds && result.status === QueryStatusEnum.INITIALIZED) {
      fetchData();
    }
  }, [challengeIds]);

  return result;
}

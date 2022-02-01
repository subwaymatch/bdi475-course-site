import { useEffect, useState } from "react";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { supabaseClient } from "lib/supabase/supabaseClient";
import { IChallengeResult } from "types/database/multiple-choice";
import { QueryStatusEnum } from "types";

export default function useChallengeResults({
  multipleChoiceIds,
  pythonChallengeIds,
}: {
  multipleChoiceIds: number[];
  pythonChallengeIds: number[];
}) {
  const { user } = useSupabaseAuth();
  const [result, setResult] = useState<{
    data: IChallengeResult[];
    error: string;
  }>({
    data: null,
    error: null,
  });

  const load = async () => {
    const { data, error } = await supabaseClient
      .rpc<IChallengeResult>("get_challenge_results", {
        multiple_choice_ids: multipleChoiceIds,
        python_challenge_ids: pythonChallengeIds,
      })
      .eq("uid", user.id);

    if (error) {
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
          error: null,
        })
      );
    }
  };

  useEffect(() => {
    if (user) {
      load();
    }
  }, [user]);

  return result;
}

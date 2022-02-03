import { useEffect, useState } from "react";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { supabaseClient } from "lib/supabase/supabaseClient";
import { definitions } from "types/database";
import { IChallengeResult } from "types/database/multiple-choice";
import { QueryStatusEnum } from "types";
import cloneDeep from "lodash/cloneDeep";

export default function useChallengeResults({
  multipleChoiceIds,
  pythonChallengeIds,
}: {
  multipleChoiceIds: number[];
  pythonChallengeIds: number[];
}) {
  const { user } = useSupabaseAuth();
  const [result, setResult] = useState<{
    status: QueryStatusEnum;
    data: IChallengeResult[];
    error: string;
  }>({
    status: QueryStatusEnum.LOADING,
    data: null,
    error: null,
  });

  const getBlankResult = (
    challengeType: string,
    challengeId: number
  ): IChallengeResult => {
    return {
      uid: user.id,
      email: user.email,
      display_name: null,
      challenge_type: challengeType,
      challenge_id: challengeId,
      challenge_title: null,
      success_count: 0,
      fail_count: 0,
      total_count: 0,
      first_success: null,
    };
  };

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
      const challengeResults: IChallengeResult[] = cloneDeep(data);

      multipleChoiceIds.forEach((challengeId) => {
        if (!challengeResults.find((o) => o.challenge_id === challengeId)) {
          challengeResults.push(getBlankResult("multiple-choice", challengeId));
        }
      });

      pythonChallengeIds.forEach((challengeId) => {
        if (!challengeResults.find((o) => o.challenge_id === challengeId)) {
          challengeResults.push(
            getBlankResult("python-challenge", challengeId)
          );
        }
      });

      console.log(challengeResults);

      setResult((prevResult) =>
        Object.assign({}, prevResult, {
          status: QueryStatusEnum.SUCCESS,
          data: challengeResults,
          error: null,
        })
      );
    }
  };

  const updateResult = async (
    challengeType: string,
    challengeId: number,
    isSuccess: boolean,
    submittedAt: string
  ) => {
    if (
      challengeType === "python-challenge" &&
      pythonChallengeIds.includes(challengeId)
    ) {
      console.log(`matching attempt found, challenge_id=${challengeId}`);

      let challengeResults: IChallengeResult[] = cloneDeep(result.data);
      console.log(`challengeResults`);
      console.log(result);
      console.log(challengeResults);

      challengeResults = challengeResults.map((o) => {
        if (o.challenge_id === challengeId) {
          o.total_count++;

          if (isSuccess) {
            o.success_count++;

            if (!o.first_success) {
              o.first_success = submittedAt;
            }
          } else {
            o.fail_count++;
          }
        }

        return o;
      });

      setResult((prevResult) => ({
        status: QueryStatusEnum.SUCCESS,
        data: challengeResults,
        error: null,
      }));
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    load();

    const pythonChallengeAttemptSubscription = supabaseClient
      .from<definitions["coding_challenge_attempts"]>(
        `coding_challenge_attempts:user_id=eq.${user.id}`
      )
      .on("INSERT", async (payload) => {
        updateResult(
          "python-challenge",
          payload.new.challenge_id,
          payload.new.is_success,
          payload.new.submitted_at
        );
      })
      .subscribe();

    return () => {
      supabaseClient.removeSubscription(pythonChallengeAttemptSubscription);
    };
  }, [user]);

  return result;
}

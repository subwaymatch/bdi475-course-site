import { MutableRefObject, useEffect, useRef, useState } from "react";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { supabaseClient } from "lib/supabase/supabaseClient";
import { definitions } from "types/database";
import { QueryStatusEnum } from "types";
import cloneDeep from "lodash/cloneDeep";
import {
  ChallengeTypeEnum,
  IChallengeResult,
  IChallengeTypeAndId,
} from "types/challenge";
import { getMultipleChoiceIds, getPythonChallengeIds } from "utils/challenge";

export default function useChallengeResults(
  challenges: IChallengeTypeAndId[],
  userId?: string
) {
  const { user } = useSupabaseAuth();
  const multipleChoiceIds = getMultipleChoiceIds(challenges);
  const pythonChallengeIds = getPythonChallengeIds(challenges);
  const [result, setResult] = useState<{
    status: QueryStatusEnum;
    data: IChallengeResult[];
    error: string;
  }>({
    status: QueryStatusEnum.LOADING,
    data: null,
    error: null,
  });
  const challengeResultsRef: MutableRefObject<IChallengeResult[]> = useRef(
    result.data
  );

  const filterUserId = userId ? userId : user?.id;

  const findChallengeIndex = (challengeId: number, challengeType: string) => {
    return challenges.findIndex((challenge) => {
      return (
        challenge.challengeId === challengeId &&
        challenge.challengeType === challengeType
      );
    });
  };

  const load = async () => {
    setResult((prevResult) =>
      Object.assign({}, prevResult, {
        status: QueryStatusEnum.LOADING,
        data: null,
        error: null,
      })
    );

    const rpcParams = {
      python_challenge_ids: pythonChallengeIds,
      multiple_choice_ids: multipleChoiceIds,
      user_id: filterUserId,
    };

    const { data, error } = await supabaseClient.rpc<IChallengeResult>(
      "get_challenge_results",
      rpcParams
    );

    if (error) {
      setResult((prevResult) =>
        Object.assign({}, prevResult, {
          status: QueryStatusEnum.ERROR,
          data: null,
          error: error.message,
        })
      );
    } else {
      data.sort((a, b) => {
        return (
          findChallengeIndex(a.challenge_id, a.challenge_type) -
          findChallengeIndex(b.challenge_id, b.challenge_type)
        );
      });

      setResult((prevResult) =>
        Object.assign({}, prevResult, {
          status: QueryStatusEnum.SUCCESS,
          data,
          error: null,
        })
      );
    }
  };

  const updateResult = async (
    challengeType: ChallengeTypeEnum,
    challengeId: number,
    isSuccess: boolean,
    submittedAt: string
  ) => {
    if (
      (challengeType === ChallengeTypeEnum.PythonChallenge &&
        pythonChallengeIds.includes(challengeId)) ||
      (challengeType === ChallengeTypeEnum.MultipleChoice &&
        multipleChoiceIds.includes(challengeId))
    ) {
      let challengeResults: IChallengeResult[] = cloneDeep(
        challengeResultsRef.current
      );

      challengeResults = challengeResults.map((o) => {
        if (
          o.challenge_type === challengeType &&
          o.challenge_id === challengeId
        ) {
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

      setResult({
        status: QueryStatusEnum.SUCCESS,
        data: challengeResults,
        error: null,
      });
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
          ChallengeTypeEnum.PythonChallenge,
          payload.new.challenge_id,
          payload.new.is_success,
          payload.new.submitted_at
        );
      })
      .subscribe();

    const multipleChoiceAttemptSubscription = supabaseClient
      .from<definitions["multiple_choice_attempts"]>(
        `multiple_choice_attempts:user_id=eq.${user.id}`
      )
      .on("INSERT", async (payload) => {
        updateResult(
          ChallengeTypeEnum.MultipleChoice,
          payload.new.question_id,
          payload.new.is_success,
          payload.new.submitted_at
        );
      })
      .subscribe();

    return () => {
      supabaseClient.removeSubscription(pythonChallengeAttemptSubscription);
      supabaseClient.removeSubscription(multipleChoiceAttemptSubscription);
    };
  }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    load();
  }, [userId]);

  useEffect(() => {
    challengeResultsRef.current = result?.data;
  }, [result]);

  return result;
}

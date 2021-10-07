import { useEffect, useState } from "react";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { supabaseClient } from "lib/supabase/supabaseClient";
import { definitions } from "types/database";
import orderBy from "lodash/orderBy";

export default function useCodingChallengeAttempts(challengeId: number) {
  const { user } = useSupabaseAuth();

  const [attempts, setAttempts] = useState<
    definitions["coding_challenge_attempts"][]
  >([]);

  const updateAttempts = async () => {
    if (!user || !challengeId) {
      return;
    }

    const { data, error } = await supabaseClient
      .from<definitions["coding_challenge_attempts"]>(
        "coding_challenge_attempts"
      )
      .select()
      .match({
        user_id: user.id,
        challenge_id: challengeId,
      })
      .order("submitted_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error(error);
    } else {
      setAttempts(data);
    }
  };

  useEffect(() => {
    if (!user || !challengeId) {
      setAttempts([]);
      return;
    }

    updateAttempts();

    const newAttemptSubscription = supabaseClient
      .from<definitions["coding_challenge_attempts"]>(
        `coding_challenge_attempts:user_id=eq.${user.id}`
      )
      .on("INSERT", async (payload) => {
        const newData = payload.new;

        if (newData.challenge_id === challengeId) {
          setAttempts((previousAttempts) => {
            const updatedAttempts = orderBy(
              [newData, ...previousAttempts],
              ["submitted_at"],
              ["desc"]
            );

            return updatedAttempts;
          });
        }
      })
      .subscribe();

    return () => {
      supabaseClient.removeSubscription(newAttemptSubscription);
    };
  }, [user, challengeId]);

  const recordSubmission = async (isSuccess: boolean, userCode: string) => {
    if (!user || !challengeId) {
      return;
    }

    if (attempts.length > 0) {
      const lastRecordedAttempt = attempts[0];

      if (
        lastRecordedAttempt.is_success === isSuccess &&
        lastRecordedAttempt.user_code === userCode
      ) {
        console.log(`Duplicate attempt entry will not be recorded`);
        return;
      }
    }

    const { data, error } = await supabaseClient
      .from<definitions["coding_challenge_attempts"]>(
        "coding_challenge_attempts"
      )
      .insert(
        [
          {
            user_id: user.id,
            challenge_id: challengeId,
            is_success: isSuccess,
            user_code: userCode,
          },
        ],
        {
          returning: "minimal",
        }
      );

    if (error) {
      console.error(error);
    }

    updateAttempts();
  };

  return { attempts, recordSubmission };
}

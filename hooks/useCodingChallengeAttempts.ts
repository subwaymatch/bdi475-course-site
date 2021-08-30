import { useEffect, useState } from "react";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { supabaseClient } from "lib/supabase/supabaseClient";
import { definitions } from "types/database";

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

    setAttempts(data);
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
        console.log("Change received!", payload);
        const newData = payload.new;

        if (newData.challenge_id === challengeId) {
          setAttempts((previousAttempts) => [newData, ...previousAttempts]);
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

    const { data, error } = await supabaseClient
      .from<definitions["coding_challenge_attempts"]>(
        "coding_challenge_attempts"
      )
      .insert([
        {
          user_id: user.id,
          challenge_id: challengeId,
          is_success: isSuccess,
          user_code: userCode,
        },
      ]);

    if (error) {
      console.log("Error recording submission");
      console.error(error);
    }

    updateAttempts();
  };

  return { attempts, recordSubmission };
}

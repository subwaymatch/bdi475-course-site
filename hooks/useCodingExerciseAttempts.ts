import { useEffect, useState } from "react";
import { ICodingExerciseAttempt } from "types/coding-exercise";
import { useUser } from "context/UserContext";
import { supabaseClient } from "lib/supabase/supabaseClient";
import { User } from "@supabase/supabase-js";

export default function useCodingExerciseAttempts(qid) {
  const { user }: { user: User } = useUser();

  const [attempts, setAttempts] = useState<ICodingExerciseAttempt[]>([]);

  const updateAttempts = async () => {
    if (!user || !qid) {
      return;
    }

    const { data, error } = await supabaseClient
      .from("coding_question_attempts")
      .select()
      .match({
        user_id: user.id,
        question_id: qid,
      })
      .limit(100)
      .order("submitted_at", { ascending: false });

    const updatedAttempts = data.map((o) => ({
      isSuccess: o.is_success,
      userCode: o.user_code,
      submittedAt: new Date(o.submitted_at),
    }));

    setAttempts(updatedAttempts);
  };

  useEffect(() => {
    if (!user || !qid) {
      setAttempts([]);
      return;
    }

    updateAttempts();
  }, [user, qid]);

  const recordSubmission = async (isSuccess: boolean, userCode: string) => {
    if (!user || !qid) {
      return;
    }

    const { data, error } = await supabaseClient
      .from("coding_question_attempts")
      .insert([
        {
          user_id: user.id,
          question_id: qid,
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

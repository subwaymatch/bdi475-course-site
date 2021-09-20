import { NextApiRequest, NextApiResponse } from "next";
import { definitions } from "types/database";
import isEqual from "lodash/isEqual";
import { getUserFromRequest } from "utils/api/auth";
import { supabaseServiceClient } from "lib/supabase/supabaseServiceClient";

export default async function recordAttempt(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only accept POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      status: "error",
      message: "Only POST requests are accepted",
    });
  }

  const user = await getUserFromRequest(req);

  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "You must be signed in to submit a multiple choice question",
    });
  }

  // Extract attempt information
  const {
    query: { qid },
    body: { userSelections },
  } = req;

  const questionId = Number.parseInt(qid as string);

  try {
    const { data: answers, error: answerError } = await supabaseServiceClient
      .from<definitions["multiple_choice_answers"]>("multiple_choice_answers")
      .select()
      .eq("question_id", questionId);

    const correctOptionIds = answers
      .filter((o) => o.is_correct)
      .map((o) => o.option_id)
      .sort();

    const userSelectionIds = [
      ...userSelections.map((v) => Number.parseInt(v)),
    ].sort();

    const isCorrect = isEqual(correctOptionIds, userSelectionIds);

    const { data: prevAttempts, error: prevAttemptsError } =
      await supabaseServiceClient
        .from<definitions["multiple_choice_attempts"]>(
          "multiple_choice_attempts"
        )
        .select("id")
        .eq("user_id", user.id)
        .eq("question_id", questionId)
        .eq("is_success", isCorrect);

    if (prevAttempts.length === 0) {
      const { data: attemptResult, error: attemptError } =
        await supabaseServiceClient
          .from<definitions["multiple_choice_attempts"]>(
            "multiple_choice_attempts"
          )
          .insert([
            {
              user_id: user.id,
              question_id: questionId,
              is_success: isCorrect,
            },
          ]);
    }

    return res.json({
      status: "success",
      answerData: answers,
      userSelections,
      isCorrect,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: err.message });
  }
}

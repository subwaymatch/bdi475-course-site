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
    query: { id },
    body: { userSelections },
  } = req;

  const questionId = Number.parseInt(id as string);

  try {
    const { data: options, error: answerError } = await supabaseServiceClient
      .from<definitions["multiple_choice_options"]>("multiple_choice_options")
      .select(`id, is_correct, explanation_markdown`)
      .eq("question_id", questionId);

    const correctOptionIds = options
      .filter((o) => o.is_correct)
      .map((o) => o.id)
      .sort();

    const userSelectionIds = [
      ...userSelections.map((v) => Number.parseInt(v)),
    ].sort();

    const isCorrect = isEqual(correctOptionIds, userSelectionIds);

    // Retrieve previous submission with the same result (pass/fail) for the current user and question
    const { data: prevAttempts, error: prevAttemptsError } =
      await supabaseServiceClient
        .from<definitions["multiple_choice_attempts"]>(
          "multiple_choice_attempts"
        )
        .select("id")
        .eq("user_id", user.id)
        .eq("question_id", questionId)
        .eq("is_success", isCorrect);

    // Only record the attempt if a previous submission with the same result does not exist
    // Ideally, checking and inserting a record should be performed as a single transaction
    // Due to lack of native transaction support in Supabase, these operations are performed sequentially - the worst case scenario is duplicate entries, which is not an issue
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
      answersData: options,
      userSelections,
      isCorrect,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: err.message });
  }
}

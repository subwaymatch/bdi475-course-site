import { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "lib/supabase/supabaseClient";
import { definitions } from "types/database";
import isEqual from "lodash/isEqual";

export default async function recordAttempt(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only accept POST requests
  if (req.method !== "POST") {
    return;
  }

  let user = null;

  // Get user information from Bearer token
  try {
    const token = req.headers.token;
    const { data: userData, error: userError } =
      await supabaseClient.auth.api.getUser(token as string);

    user = userData;
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }

  // Extract attempt information
  const {
    query: { qid },
    body: { userSelections },
  } = req;

  try {
    const { data: answerData, error: answerError } = await supabaseClient
      .from<definitions["multiple_choice_answers"]>("multiple_choice_answers")
      .select()
      .eq("question_id", qid as string);

    const correctOptionIds = answerData
      .filter((o) => o.is_correct)
      .map((o) => o.option_id)
      .sort();
    const userSelectionIds = [
      ...userSelections.map((v) => Number.parseInt(v)),
    ].sort();

    const isCorrect = isEqual(correctOptionIds, userSelectionIds);

    return res.json({
      status: "success",
      answerData,
      userSelections,
      isCorrect,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: err.message });
  }
}

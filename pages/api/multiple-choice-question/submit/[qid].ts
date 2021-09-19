import { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "lib/supabase/supabaseClient";
import { definitions } from "types/database";
import isEqual from "lodash/isEqual";
import { getUserFromRequest } from "utils/api/auth";

export default async function recordAttempt(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only accept POST requests
  if (req.method !== "POST") {
    return;
  }

  const user = getUserFromRequest(req);

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

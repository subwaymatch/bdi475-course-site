import { NextApiRequest, NextApiResponse } from "next";
import { definitions } from "types/database";
import { getUserFromRequest } from "utils/api/auth";
import { supabaseServiceClient } from "lib/supabase/supabaseServiceClient";

export default async function solutionLookup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only accept POST requests
  if (req.method !== "GET") {
    return res.status(405).json({
      status: "error",
      message: "Only GET requests are accepted",
    });
  }

  const user = await getUserFromRequest(req);

  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "You must be signed in to view the solution",
    });
  }

  // Extract attempt information
  const {
    query: { id },
  } = req;

  const challengeId = Number.parseInt(id as string);

  try {
    const { data: lookupData, error: lookupError } = await supabaseServiceClient
      .from<definitions["coding_challenge_solution_lookup"]>(
        "coding_challenge_solution_lookup"
      )
      .select(`user_id`)
      .match({
        user_id: user.id,
        challenge_id: challengeId,
      });

    if (lookupData.length === 0 && !lookupError) {
      const { data: lookupInsertResult, error: lookupInsertError } =
        await supabaseServiceClient
          .from<definitions["coding_challenge_solution_lookup"]>(
            "coding_challenge_solution_lookup"
          )
          .insert([
            {
              user_id: user.id,
              challenge_id: challengeId,
            },
          ]);
    }

    const { data: solutionData, error: solutionError } =
      await supabaseServiceClient
        .from<definitions["coding_challenges"]>("coding_challenges")
        .select(`solution_code`)
        .eq("id", challengeId)
        .single();

    return res.json({
      status: "success",
      userId: user.id,
      challengeId,
      solutionCode: solutionData?.solution_code,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: err.message });
  }
}

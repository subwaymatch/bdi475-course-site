import { NextApiRequest } from "next";
import { User } from "@supabase/supabase-js";
import { supabaseServiceClient } from "lib/supabase/supabaseServiceClient";
import { definitions } from "types/database";

export async function getUserFromRequest(req: NextApiRequest): Promise<User> {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];
      const { data: user, error: userError } =
        await supabaseServiceClient.auth.api.getUser(accessToken as string);

      if (userError) {
        throw userError;
      } else {
        return user;
      }
    } catch (err) {
      throw err;
    }
  } else {
    throw new Error("Authorization header missing from request object");
  }
}

export async function getUserRolesFromRequest(
  req: NextApiRequest
): Promise<string[]> {
  const user = await getUserFromRequest(req);

  const selectResult = await supabaseServiceClient
    .from<definitions["profiles"]>("profiles")
    .select("roles")
    .eq("id", user.id)
    .single();

  return selectResult.data.roles as any;
}

export async function isRequestFromAdmin(
  req: NextApiRequest
): Promise<boolean> {
  try {
    const roles = await getUserRolesFromRequest(req);

    return roles.includes("Admin");
  } catch {
    return false;
  }
}

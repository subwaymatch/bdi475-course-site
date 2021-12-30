/**
 * NOTE: this file is only needed if you're doing SSR (getServerSideProps)!
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "lib/supabase/supabaseClient";

export default function setAuthCookie(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(`setAuthCookie=${JSON.stringify(req.body)}`);

  supabaseClient.auth.api.setAuthCookie(req, res);
}

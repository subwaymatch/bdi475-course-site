/**
 * NOTE: this file is only needed if you're doing SSR (getServerSideProps)!
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "lib/supabase/supabaseClient";

export default function setAuthCookie(
  req: NextApiRequest,
  res: NextApiResponse
) {
  supabaseClient.auth.api.setAuthCookie(req, res);
}

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABSE_SERVICE_ROLE_KEY;

export const supabaseServiceClient = createClient(supabaseUrl, supabaseKey);

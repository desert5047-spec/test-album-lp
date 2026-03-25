import { createClient } from "@supabase/supabase-js";

const PLACEHOLDER_URL = "http://localhost:0";

export const supabaseBrowser = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || PLACEHOLDER_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder",
  );

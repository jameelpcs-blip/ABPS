import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

export function createAdminClient() {
  const url = env.supabaseUrl;
  const serviceRoleKey = env.supabaseServiceRoleKey;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false
    }
  });
}

import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/lib/env";

export function createClient() {
  const url = env.supabaseUrl;
  const key = env.supabaseAnonKey;

  if (!url || !key) {
    return null;
  }

  return createBrowserClient(url, key);
}

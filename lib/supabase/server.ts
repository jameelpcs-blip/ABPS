import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { env } from "@/lib/env";

type CookieToSet = {
  name: string;
  value: string;
  options?: Record<string, unknown>;
};

export async function createServerSupabaseClient() {
  const url = env.supabaseUrl;
  const key = env.supabaseAnonKey;

  if (!url || !key) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(values: CookieToSet[]) {
        values.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      }
    }
  });
}

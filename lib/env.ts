export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  supabaseEmailIngestSecret: process.env.SUPABASE_EMAIL_INGEST_SECRET ?? ""
};

export function hasPublicSupabaseConfig() {
  return Boolean(env.supabaseUrl && env.supabaseAnonKey);
}

export function hasAdminSupabaseConfig() {
  return Boolean(env.supabaseUrl && env.supabaseServiceRoleKey);
}

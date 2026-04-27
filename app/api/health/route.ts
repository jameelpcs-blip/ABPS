import { NextResponse } from "next/server";
import { env, hasPublicSupabaseConfig } from "@/lib/env";

export async function GET() {
  return NextResponse.json({
    ok: true,
    app: "ABPS",
    timestamp: new Date().toISOString(),
    deployment: {
      appUrl: env.appUrl,
      supabaseConfigured: hasPublicSupabaseConfig()
    }
  });
}

import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";
import { parseInboundEmail } from "@/lib/email/parser";

export async function POST(request: Request) {
  const secret = request.headers.get("x-abps-ingest-secret");
  const companyId = request.headers.get("x-abps-company-id");

  if (!env.supabaseEmailIngestSecret || secret !== env.supabaseEmailIngestSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = parseInboundEmail(await request.json());
  const supabase = createAdminClient();

  if (!supabase) {
    return NextResponse.json({
      mode: "parse-only",
      nomination: parsed.nomination
    });
  }

  if (!companyId) {
    return NextResponse.json(
      { error: "Missing x-abps-company-id header for persistence." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("nominations")
    .insert({
      company_id: companyId,
      customer: parsed.nomination.customer,
      vessel_name: parsed.nomination.vesselName,
      barge_name: parsed.nomination.bargeName,
      port: parsed.nomination.port,
      eta: parsed.nomination.eta,
      quantity_mt: parsed.nomination.quantityMt,
      current_rob_mt: parsed.nomination.currentRobMt,
      product: parsed.nomination.product,
      priority: parsed.nomination.priority,
      status: parsed.nomination.status,
      created_at: parsed.nomination.createdAt,
      notes: `Ingested from ${parsed.source}`
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    mode: "persisted",
    nomination: data
  });
}

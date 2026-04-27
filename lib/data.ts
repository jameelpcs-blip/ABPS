import { demoBarges, demoCompany, demoNominations, demoVessels } from "@/lib/mock-data";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Barge, Company, Nomination, Vessel } from "@/lib/types/abps";

export async function getDashboardData(): Promise<{
  company: Company;
  nominations: Nomination[];
  barges: Barge[];
  vessels: Vessel[];
  mode: "live" | "demo";
}> {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return {
      company: demoCompany,
      nominations: demoNominations,
      barges: demoBarges,
      vessels: demoVessels,
      mode: "demo"
    };
  }

  const [companies, nominations, barges, vessels] = await Promise.all([
    supabase.from("companies").select("*").limit(1).maybeSingle(),
    supabase.from("nominations").select("*").order("eta", { ascending: true }),
    supabase.from("barges").select("*").order("name"),
    supabase.from("vessels").select("*").order("name")
  ]);

  return {
    company: mapCompany(companies.data) ?? demoCompany,
    nominations:
      nominations.data?.map((entry) => mapNomination(entry as Record<string, unknown>)) ??
      demoNominations,
    barges:
      barges.data?.map((entry) => mapBarge(entry as Record<string, unknown>)) ?? demoBarges,
    vessels:
      vessels.data?.map((entry) => mapVessel(entry as Record<string, unknown>)) ?? demoVessels,
    mode: "live"
  };
}

function mapCompany(row: Record<string, unknown> | null): Company | null {
  if (!row) {
    return null;
  }

  return {
    id: String(row.id),
    name: String(row.name),
    region: String(row.region ?? "Unknown")
  };
}

function mapNomination(row: Record<string, unknown>): Nomination {
  return {
    id: String(row.id),
    companyId: String(row.company_id),
    customer: String(row.customer),
    vesselName: String(row.vessel_name),
    bargeName: row.barge_name ? String(row.barge_name) : undefined,
    port: String(row.port),
    terminal: row.terminal ? String(row.terminal) : undefined,
    eta: String(row.eta),
    etd: row.etd ? String(row.etd) : undefined,
    quantityMt: Number(row.quantity_mt),
    product: row.product as Nomination["product"],
    currentRobMt: row.current_rob_mt ? Number(row.current_rob_mt) : undefined,
    minSafeRobMt: row.min_safe_rob_mt ? Number(row.min_safe_rob_mt) : undefined,
    voyageDistanceNm: row.voyage_distance_nm ? Number(row.voyage_distance_nm) : undefined,
    serviceHours: row.service_hours ? Number(row.service_hours) : undefined,
    priority: Number(row.priority) as Nomination["priority"],
    status: row.status as Nomination["status"],
    notes: row.notes ? String(row.notes) : undefined,
    createdAt: String(row.created_at)
  };
}

function mapBarge(row: Record<string, unknown>): Barge {
  return {
    id: String(row.id),
    name: String(row.name),
    port: String(row.port),
    capacityMt: Number(row.capacity_mt),
    availableFrom: String(row.available_from)
  };
}

function mapVessel(row: Record<string, unknown>): Vessel {
  return {
    id: String(row.id),
    name: String(row.name),
    imo: row.imo ? String(row.imo) : undefined,
    consumptionCurve: Array.isArray(row.consumption_curve)
      ? (row.consumption_curve as Vessel["consumptionCurve"])
      : []
  };
}

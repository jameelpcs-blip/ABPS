import { NextResponse } from "next/server";
import { z } from "zod";
import { detectEtaConflicts } from "@/lib/optimizer/conflicts";
import { projectRob } from "@/lib/optimizer/rob";
import { optimizeSchedule } from "@/lib/optimizer/scheduler";
import { demoBarges, demoVessels } from "@/lib/mock-data";

const requestSchema = z.object({
  nominations: z.array(
    z.object({
      id: z.string(),
      companyId: z.string(),
      customer: z.string(),
      vesselName: z.string(),
      bargeName: z.string().optional(),
      port: z.string(),
      terminal: z.string().optional(),
      eta: z.string(),
      etd: z.string().optional(),
      quantityMt: z.number(),
      product: z.enum(["VLSFO", "HSFO", "MGO", "BIOFUEL"]),
      currentRobMt: z.number().optional(),
      minSafeRobMt: z.number().optional(),
      voyageDistanceNm: z.number().optional(),
      serviceHours: z.number().optional(),
      priority: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
      status: z.enum(["draft", "pending", "scheduled", "conflict", "completed"]),
      notes: z.string().optional(),
      createdAt: z.string()
    })
  )
});

export async function POST(request: Request) {
  const payload = requestSchema.parse(await request.json());
  const conflicts = detectEtaConflicts(payload.nominations);
  const projections = projectRob(payload.nominations, demoVessels);
  const schedule = optimizeSchedule({
    nominations: payload.nominations,
    barges: demoBarges,
    conflicts,
    projections
  });

  return NextResponse.json({
    conflicts,
    projections,
    schedule
  });
}

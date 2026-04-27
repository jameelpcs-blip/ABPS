import { addHours } from "date-fns";
import { z } from "zod";
import type { Nomination } from "@/lib/types/abps";

const inboundSchema = z.object({
  rawEmail: z.string().min(1),
  source: z.string().optional()
});

export function parseInboundEmail(input: unknown) {
  const payload = inboundSchema.parse(input);
  const text = payload.rawEmail;

  const vesselName = matchValue(text, /vessel[:\s]+([^\n\r]+)/i) ?? "Unknown Vessel";
  const bargeName = matchValue(text, /barge[:\s]+([^\n\r]+)/i);
  const port = matchValue(text, /port[:\s]+([^\n\r]+)/i) ?? "Fujairah";
  const customer = matchValue(text, /customer[:\s]+([^\n\r]+)/i) ?? "Email Intake";
  const product = (matchValue(text, /product[:\s]+([^\n\r]+)/i) ?? "VLSFO").toUpperCase();
  const quantityMt = Number(matchValue(text, /quantity[:\s]+(\d+(\.\d+)?)/i) ?? 1200);
  const currentRobMt = Number(matchValue(text, /rob[:\s]+(\d+(\.\d+)?)/i) ?? 350);
  const etaRaw = matchValue(text, /eta[:\s]+([^\n\r]+)/i);
  const eta = etaRaw ? new Date(etaRaw) : addHours(new Date(), 12);

  const nomination: Partial<Nomination> = {
    customer,
    vesselName,
    bargeName: bargeName ?? undefined,
    port,
    eta: eta.toISOString(),
    quantityMt,
    currentRobMt,
    product: normalizeProduct(product),
    priority: 3,
    status: "pending",
    serviceHours: 6,
    createdAt: new Date().toISOString()
  };

  return {
    nomination,
    source: payload.source ?? "email"
  };
}

function matchValue(text: string, expression: RegExp) {
  const match = text.match(expression);
  return match?.[1]?.trim();
}

function normalizeProduct(product: string): Nomination["product"] {
  if (product.includes("MGO")) return "MGO";
  if (product.includes("HSFO")) return "HSFO";
  if (product.includes("BIO")) return "BIOFUEL";
  return "VLSFO";
}

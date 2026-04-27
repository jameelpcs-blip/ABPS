import { addHours, addMinutes } from "date-fns";
import type { Barge, Company, Nomination, Vessel } from "@/lib/types/abps";

const now = new Date("2026-04-27T08:00:00.000Z");

export const demoCompany: Company = {
  id: "co-gulf",
  name: "Gulf Bunker Ops",
  region: "Middle East"
};

export const demoVessels: Vessel[] = [
  {
    id: "v-aurora",
    name: "MV Aurora Mariner",
    imo: "9348842",
    consumptionCurve: [
      { speedKnots: 10, mtPerDay: 18 },
      { speedKnots: 12, mtPerDay: 22 },
      { speedKnots: 14, mtPerDay: 28 }
    ]
  },
  {
    id: "v-caspian",
    name: "MT Caspian Dawn",
    imo: "9487712",
    consumptionCurve: [
      { speedKnots: 10, mtPerDay: 20 },
      { speedKnots: 12, mtPerDay: 24 },
      { speedKnots: 14, mtPerDay: 31 }
    ]
  }
];

export const demoBarges: Barge[] = [
  {
    id: "b-falcon",
    name: "Barge Falcon",
    port: "Fujairah",
    capacityMt: 6500,
    availableFrom: now.toISOString()
  },
  {
    id: "b-nomad",
    name: "Barge Nomad",
    port: "Jebel Ali",
    capacityMt: 4200,
    availableFrom: addHours(now, 3).toISOString()
  }
];

export const demoNominations: Nomination[] = [
  {
    id: "nom-001",
    companyId: demoCompany.id,
    customer: "Ocean Crest Shipping",
    vesselName: "MV Aurora Mariner",
    bargeName: "Barge Falcon",
    port: "Fujairah",
    terminal: "OTB-2",
    eta: addHours(now, 8).toISOString(),
    etd: addHours(now, 16).toISOString(),
    quantityMt: 1800,
    product: "VLSFO",
    currentRobMt: 540,
    minSafeRobMt: 260,
    voyageDistanceNm: 720,
    serviceHours: 5,
    priority: 5,
    status: "pending",
    notes: "Priority stem for canal transit buffer.",
    createdAt: now.toISOString()
  },
  {
    id: "nom-002",
    companyId: demoCompany.id,
    customer: "Atlas Tankers",
    vesselName: "MT Caspian Dawn",
    bargeName: "Barge Falcon",
    port: "Fujairah",
    terminal: "SPM-1",
    eta: addHours(now, 10).toISOString(),
    etd: addHours(now, 20).toISOString(),
    quantityMt: 2400,
    product: "MGO",
    currentRobMt: 380,
    minSafeRobMt: 220,
    voyageDistanceNm: 610,
    serviceHours: 6,
    priority: 4,
    status: "pending",
    notes: "Potential overlap with Falcon availability.",
    createdAt: addMinutes(now, 30).toISOString()
  },
  {
    id: "nom-003",
    companyId: demoCompany.id,
    customer: "Bluewake Logistics",
    vesselName: "MV Solar Delta",
    bargeName: "Barge Nomad",
    port: "Jebel Ali",
    terminal: "Berth 5",
    eta: addHours(now, 14).toISOString(),
    etd: addHours(now, 20).toISOString(),
    quantityMt: 1200,
    product: "BIOFUEL",
    currentRobMt: 290,
    minSafeRobMt: 180,
    voyageDistanceNm: 420,
    serviceHours: 4,
    priority: 3,
    status: "scheduled",
    createdAt: addHours(now, 1).toISOString()
  }
];

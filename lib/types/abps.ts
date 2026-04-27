export type ProductGrade = "VLSFO" | "HSFO" | "MGO" | "BIOFUEL";

export type NominationStatus =
  | "draft"
  | "pending"
  | "scheduled"
  | "conflict"
  | "completed";

export type Company = {
  id: string;
  name: string;
  region: string;
};

export type Vessel = {
  id: string;
  name: string;
  imo?: string;
  consumptionCurve: Array<{
    speedKnots: number;
    mtPerDay: number;
  }>;
};

export type Barge = {
  id: string;
  name: string;
  port: string;
  capacityMt: number;
  availableFrom: string;
};

export type Nomination = {
  id: string;
  companyId: string;
  customer: string;
  vesselName: string;
  bargeName?: string;
  port: string;
  terminal?: string;
  eta: string;
  etd?: string;
  quantityMt: number;
  product: ProductGrade;
  currentRobMt?: number;
  minSafeRobMt?: number;
  voyageDistanceNm?: number;
  serviceHours?: number;
  priority: 1 | 2 | 3 | 4 | 5;
  status: NominationStatus;
  notes?: string;
  createdAt: string;
};

export type ScheduleConflict = {
  nominationId: string;
  type: "barge" | "vessel" | "rob";
  message: string;
  severity: "high" | "medium" | "low";
  overlappingWith?: string;
};

export type RobProjection = {
  nominationId: string;
  departureRobMt: number;
  arrivalRobMt: number;
  safetyMarginMt: number;
  risk: "healthy" | "watch" | "critical";
};

export type ScheduledNomination = Nomination & {
  score: number;
  slotStart: string;
  slotEnd: string;
  warnings: string[];
};

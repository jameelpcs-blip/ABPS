import type { Nomination, RobProjection, Vessel } from "@/lib/types/abps";

export function projectRob(
  nominations: Nomination[],
  vessels: Vessel[]
): RobProjection[] {
  return nominations
    .filter((nomination) => nomination.currentRobMt && nomination.voyageDistanceNm)
    .map((nomination) => {
      const vessel = vessels.find((entry) => entry.name === nomination.vesselName);
      const speed = 12;
      const curveRate = interpolateMtPerDay(vessel?.consumptionCurve ?? [], speed) ?? 24;
      const sailingDays = (nomination.voyageDistanceNm ?? 0) / (speed * 24);
      const consumed = curveRate * sailingDays;
      const departureRobMt = (nomination.currentRobMt ?? 0) + nomination.quantityMt;
      const arrivalRobMt = departureRobMt - consumed;
      const safetyMarginMt = arrivalRobMt - (nomination.minSafeRobMt ?? 150);

      return {
        nominationId: nomination.id,
        departureRobMt,
        arrivalRobMt: Number(arrivalRobMt.toFixed(1)),
        safetyMarginMt: Number(safetyMarginMt.toFixed(1)),
        risk:
          safetyMarginMt < 0 ? "critical" : safetyMarginMt < 75 ? "watch" : "healthy"
      };
    });
}

function interpolateMtPerDay(
  curve: Vessel["consumptionCurve"],
  speedKnots: number
) {
  if (curve.length === 0) {
    return null;
  }

  const ordered = [...curve].sort((left, right) => left.speedKnots - right.speedKnots);
  const exact = ordered.find((point) => point.speedKnots === speedKnots);

  if (exact) {
    return exact.mtPerDay;
  }

  const lower = [...ordered].reverse().find((point) => point.speedKnots < speedKnots);
  const upper = ordered.find((point) => point.speedKnots > speedKnots);

  if (!lower || !upper) {
    return ordered[ordered.length - 1]?.mtPerDay ?? null;
  }

  const ratio = (speedKnots - lower.speedKnots) / (upper.speedKnots - lower.speedKnots);
  return lower.mtPerDay + ratio * (upper.mtPerDay - lower.mtPerDay);
}

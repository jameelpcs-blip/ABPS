import { addHours, compareAsc } from "date-fns";
import type {
  Barge,
  Nomination,
  RobProjection,
  ScheduledNomination,
  ScheduleConflict
} from "@/lib/types/abps";

export function optimizeSchedule(params: {
  nominations: Nomination[];
  barges: Barge[];
  conflicts: ScheduleConflict[];
  projections: RobProjection[];
}): ScheduledNomination[] {
  const { nominations, barges, conflicts, projections } = params;

  return [...nominations]
    .sort((left, right) => compareAsc(new Date(left.eta), new Date(right.eta)))
    .sort((left, right) => right.priority - left.priority)
    .map((nomination) => {
      const assignedBarge = barges.find((barge) => barge.name === nomination.bargeName);
      const bargeReady = assignedBarge
        ? new Date(assignedBarge.availableFrom)
        : new Date(nomination.eta);
      const eta = new Date(nomination.eta);
      const slotStart = compareAsc(bargeReady, eta) === 1 ? bargeReady : eta;
      const slotEnd = addHours(slotStart, nomination.serviceHours ?? 6);
      const nominationConflicts = conflicts.filter(
        (conflict) => conflict.nominationId === nomination.id
      );
      const rob = projections.find((item) => item.nominationId === nomination.id);
      const robPenalty = rob?.risk === "critical" ? -25 : rob?.risk === "watch" ? -10 : 8;
      const conflictPenalty = nominationConflicts.reduce(
        (score, item) => score + (item.severity === "high" ? -30 : -12),
        0
      );
      const score = nomination.priority * 20 + robPenalty + conflictPenalty;

      return {
        ...nomination,
        score,
        slotStart: slotStart.toISOString(),
        slotEnd: slotEnd.toISOString(),
        warnings: [
          ...nominationConflicts.map((item) => item.message),
          ...(rob && rob.risk !== "healthy"
            ? [`Projected arrival ROB is ${rob.arrivalRobMt} MT.`]
            : [])
        ]
      };
    })
    .sort((left, right) => right.score - left.score);
}

import { addHours, areIntervalsOverlapping } from "date-fns";
import type { Nomination, ScheduleConflict } from "@/lib/types/abps";

const DEFAULT_SERVICE_HOURS = 6;

export function detectEtaConflicts(nominations: Nomination[]): ScheduleConflict[] {
  const conflicts: ScheduleConflict[] = [];

  for (let index = 0; index < nominations.length; index += 1) {
    const current = nominations[index];
    const currentWindow = getWindow(current);

    for (let compareIndex = index + 1; compareIndex < nominations.length; compareIndex += 1) {
      const candidate = nominations[compareIndex];
      const candidateWindow = getWindow(candidate);

      const overlaps = areIntervalsOverlapping(currentWindow, candidateWindow, {
        inclusive: true
      });

      if (!overlaps) {
        continue;
      }

      if (current.bargeName && current.bargeName === candidate.bargeName) {
        conflicts.push({
          nominationId: current.id,
          overlappingWith: candidate.id,
          type: "barge",
          severity: "high",
          message: `${current.bargeName} is double-booked between ${current.vesselName} and ${candidate.vesselName}.`
        });
      }

      if (current.vesselName === candidate.vesselName) {
        conflicts.push({
          nominationId: current.id,
          overlappingWith: candidate.id,
          type: "vessel",
          severity: "medium",
          message: `${current.vesselName} has overlapping service windows.`
        });
      }
    }
  }

  return conflicts;
}

function getWindow(nomination: Nomination) {
  const start = new Date(nomination.eta);
  const end = nomination.etd
    ? new Date(nomination.etd)
    : addHours(start, nomination.serviceHours ?? DEFAULT_SERVICE_HOURS);

  return { start, end };
}

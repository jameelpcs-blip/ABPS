import { AlertTriangle } from "lucide-react";
import type { ScheduleConflict } from "@/lib/types/abps";

export function ConflictList({ conflicts }: { conflicts: ScheduleConflict[] }) {
  return (
    <section className="panel p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="pill bg-[#ffe8dc] text-[#a2461d]">Conflict engine</p>
          <h2 className="mt-3 text-xl font-semibold">ETA clash prevention</h2>
        </div>
        <AlertTriangle className="h-5 w-5 text-coral" />
      </div>
      <div className="mt-5 space-y-3">
        {conflicts.length === 0 ? (
          <p className="text-sm text-ink/70">No timing clashes detected in the current plan.</p>
        ) : (
          conflicts.map((conflict) => (
            <article key={`${conflict.nominationId}-${conflict.overlappingWith}`} className="rounded-2xl border border-coral/20 bg-coral/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">{conflict.message}</p>
                <span className="pill bg-white text-coral">{conflict.severity}</span>
              </div>
              <p className="mt-2 text-sm text-ink/70">
                Nomination {conflict.nominationId}
                {conflict.overlappingWith ? ` overlaps with ${conflict.overlappingWith}.` : "."}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

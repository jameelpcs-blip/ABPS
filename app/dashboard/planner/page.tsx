import { getDashboardData } from "@/lib/data";
import { detectEtaConflicts } from "@/lib/optimizer/conflicts";
import { projectRob } from "@/lib/optimizer/rob";
import { optimizeSchedule } from "@/lib/optimizer/scheduler";

export default async function PlannerPage() {
  const { nominations, barges, vessels } = await getDashboardData();
  const conflicts = detectEtaConflicts(nominations);
  const projections = projectRob(nominations, vessels);
  const schedule = optimizeSchedule({ nominations, barges, conflicts, projections });

  return (
    <main className="min-h-screen bg-sand">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10">
        <h1 className="text-4xl font-semibold text-ink">Scheduling optimizer</h1>
        <p className="mt-3 max-w-3xl text-sm text-ink/70">
          The optimizer scores nominations using priority, barge readiness, current conflicts, and ROB exposure so planners can explain every sequence decision.
        </p>
        <div className="mt-8 space-y-4">
          {schedule.map((item) => (
            <article key={item.id} className="panel p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="pill bg-[#e8ecff] text-[#3046a5]">Score {item.score}</p>
                  <h2 className="mt-3 text-2xl font-semibold">{item.vesselName}</h2>
                  <p className="mt-2 text-sm text-ink/70">
                    {item.port} • {item.quantityMt} MT {item.product} • Barge {item.bargeName ?? "TBD"}
                  </p>
                </div>
                <div className="max-w-md text-sm text-ink/70">
                  {item.warnings.length > 0 ? item.warnings.join(" ") : "No optimizer warnings."}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

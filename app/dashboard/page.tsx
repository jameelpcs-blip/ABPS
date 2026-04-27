import Link from "next/link";
import { format } from "date-fns";
import { getDashboardData } from "@/lib/data";
import { detectEtaConflicts } from "@/lib/optimizer/conflicts";
import { projectRob } from "@/lib/optimizer/rob";
import { optimizeSchedule } from "@/lib/optimizer/scheduler";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { ConflictList } from "@/components/dashboard/conflict-list";
import { ScheduleBoard } from "@/components/dashboard/schedule-board";
import { RobChart } from "@/components/charts/rob-chart";

export default async function DashboardPage() {
  const { company, nominations, barges, vessels, mode } = await getDashboardData();
  const conflicts = detectEtaConflicts(nominations);
  const projections = projectRob(nominations, vessels);
  const schedule = optimizeSchedule({
    nominations,
    barges,
    conflicts,
    projections
  });

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ecf4f2_0%,#f7f2e8_56%,#f3efe0_100%)]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <header className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="pill bg-white text-sea">{mode === "live" ? "Live mode" : "Demo mode"}</p>
            <h1 className="mt-4 text-4xl font-semibold text-ink">ABPS operations center</h1>
            <p className="mt-3 max-w-2xl text-sm text-ink/72">
              {company.name} sees shared nominations, optimizer outputs, and ROB risk in one company workspace.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white" href="/dashboard/nominations">
              Manage nominations
            </Link>
            <Link className="rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-semibold text-ink" href="/dashboard/planner">
              Optimizer detail
            </Link>
            <Link className="rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-semibold text-ink" href="/dashboard/rob">
              ROB monitor
            </Link>
          </div>
        </header>

        <section className="mt-8">
          <StatsGrid nominations={nominations} conflicts={conflicts} projections={projections} />
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <ScheduleBoard schedule={schedule} />
          <ConflictList conflicts={conflicts} />
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <RobChart projections={projections} />
          <section className="panel p-6">
            <div>
              <p className="pill bg-mist text-sea">Recent nominations</p>
              <h2 className="mt-3 text-xl font-semibold">Shared bunker queue</h2>
            </div>
            <div className="mt-5 space-y-3">
              {nominations.map((item) => (
                <article key={item.id} className="rounded-2xl border border-ink/10 bg-white/70 p-4">
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                    <div>
                      <h3 className="font-semibold">{item.vesselName}</h3>
                      <p className="text-sm text-ink/68">
                        {item.customer} • {item.port} • {item.quantityMt.toLocaleString()} MT {item.product}
                      </p>
                    </div>
                    <div className="text-sm text-ink/68">
                      ETA {format(new Date(item.eta), "dd MMM yyyy HH:mm")}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

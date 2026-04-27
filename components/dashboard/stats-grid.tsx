import type { Nomination, RobProjection, ScheduleConflict } from "@/lib/types/abps";

export function StatsGrid({
  nominations,
  conflicts,
  projections
}: {
  nominations: Nomination[];
  conflicts: ScheduleConflict[];
  projections: RobProjection[];
}) {
  const pending = nominations.filter((item) => item.status === "pending").length;
  const criticalRob = projections.filter((item) => item.risk === "critical").length;
  const totalMt = nominations.reduce((sum, item) => sum + item.quantityMt, 0);

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <article className="metric-card">
        <p className="pill bg-mist text-sea">Live nominations</p>
        <h3 className="mt-4 text-3xl font-semibold">{nominations.length}</h3>
        <p className="mt-2 text-sm text-ink/70">{pending} still need slot confirmation.</p>
      </article>
      <article className="metric-card">
        <p className="pill bg-[#ffe2d5] text-[#9c3d15]">Conflict alerts</p>
        <h3 className="mt-4 text-3xl font-semibold">{conflicts.length}</h3>
        <p className="mt-2 text-sm text-ink/70">Auto-detected vessel and barge overlaps.</p>
      </article>
      <article className="metric-card">
        <p className="pill bg-[#dbf7ef] text-tide">ROB watch</p>
        <h3 className="mt-4 text-3xl font-semibold">{criticalRob}</h3>
        <p className="mt-2 text-sm text-ink/70">Voyages projected below safety threshold.</p>
      </article>
      <article className="metric-card">
        <p className="pill bg-[#e8ecff] text-[#3046a5]">Planned volume</p>
        <h3 className="mt-4 text-3xl font-semibold">{totalMt.toLocaleString()} MT</h3>
        <p className="mt-2 text-sm text-ink/70">Combined nominated bunker quantity.</p>
      </article>
    </div>
  );
}

import { format } from "date-fns";
import type { ScheduledNomination } from "@/lib/types/abps";

export function ScheduleBoard({ schedule }: { schedule: ScheduledNomination[] }) {
  return (
    <section className="panel p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="pill bg-[#e8ecff] text-[#3046a5]">Scheduling engine</p>
          <h2 className="mt-3 text-xl font-semibold">Optimizer-ranked stems</h2>
        </div>
        <p className="text-sm text-ink/60">Rule-based and operator-readable</p>
      </div>
      <div className="mt-5 overflow-hidden rounded-2xl border border-ink/10">
        <table className="min-w-full divide-y divide-ink/10 text-sm">
          <thead className="bg-ink/[0.04]">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Vessel</th>
              <th className="px-4 py-3 text-left font-medium">Slot</th>
              <th className="px-4 py-3 text-left font-medium">Barge</th>
              <th className="px-4 py-3 text-left font-medium">Score</th>
              <th className="px-4 py-3 text-left font-medium">Warnings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10 bg-white/70">
            {schedule.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-4">
                  <div className="font-medium">{item.vesselName}</div>
                  <div className="text-ink/60">{item.product}</div>
                </td>
                <td className="px-4 py-4">
                  {format(new Date(item.slotStart), "dd MMM HH:mm")} to{" "}
                  {format(new Date(item.slotEnd), "HH:mm")}
                </td>
                <td className="px-4 py-4">{item.bargeName ?? "Unassigned"}</td>
                <td className="px-4 py-4 font-semibold">{item.score}</td>
                <td className="px-4 py-4 text-ink/70">
                  {item.warnings.length > 0 ? item.warnings.join(" ") : "Clear"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

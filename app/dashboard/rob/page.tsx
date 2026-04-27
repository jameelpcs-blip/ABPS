import { getDashboardData } from "@/lib/data";
import { projectRob } from "@/lib/optimizer/rob";

export default async function RobPage() {
  const { nominations, vessels } = await getDashboardData();
  const projections = projectRob(nominations, vessels);

  return (
    <main className="min-h-screen bg-sand">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10">
        <h1 className="text-4xl font-semibold text-ink">ROB monitor</h1>
        <p className="mt-3 max-w-2xl text-sm text-ink/70">
          Consumption curves and voyage distance combine to forecast post-bunkering reserve confidence.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {projections.map((projection) => (
            <article key={projection.nominationId} className="panel p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{projection.nominationId}</h2>
                <span className="pill bg-mist text-sea">{projection.risk}</span>
              </div>
              <dl className="mt-5 grid gap-3 text-sm text-ink/72">
                <div className="flex items-center justify-between">
                  <dt>Departure ROB</dt>
                  <dd>{projection.departureRobMt.toFixed(1)} MT</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Arrival ROB</dt>
                  <dd>{projection.arrivalRobMt.toFixed(1)} MT</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Safety margin</dt>
                  <dd>{projection.safetyMarginMt.toFixed(1)} MT</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

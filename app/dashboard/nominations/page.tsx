import { getDashboardData } from "@/lib/data";
import { NominationForm } from "@/components/forms/nomination-form";

export default async function NominationsPage() {
  const { nominations } = await getDashboardData();

  return (
    <main className="min-h-screen bg-sand">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <h1 className="text-4xl font-semibold text-ink">Nomination workspace</h1>
        <p className="mt-3 max-w-2xl text-sm text-ink/70">
          Add stems manually, or wire the same flow to the email ingestion endpoint for automated intake.
        </p>
        <div className="mt-8 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <NominationForm />
          <section className="panel p-6">
            <h2 className="text-xl font-semibold">Current queue</h2>
            <div className="mt-5 space-y-3">
              {nominations.map((item) => (
                <article key={item.id} className="rounded-2xl border border-ink/10 bg-white/70 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{item.vesselName}</h3>
                      <p className="text-sm text-ink/68">
                        {item.port} • {item.product} • {item.quantityMt} MT
                      </p>
                    </div>
                    <span className="pill bg-mist text-sea">{item.status}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Fuel,
  Mail,
  ShieldCheck,
  ShipWheel
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Enterprise company login",
    text: "Supabase Auth plus tenant-aware tables for shared operations across dispatchers, traders, and planners."
  },
  {
    icon: ShipWheel,
    title: "ETA conflict engine",
    text: "Detects vessel and barge window clashes before your ops team double-confirms a stem."
  },
  {
    icon: Fuel,
    title: "Smart ROB forecasting",
    text: "Projects arrival ROB using consumption curves, voyage distance, and minimum safety thresholds."
  },
  {
    icon: Mail,
    title: "Email-assisted nominations",
    text: "Inbound messages can auto-fill customer, vessel, grade, ETA, and quantity into a structured nomination."
  },
  {
    icon: BrainCircuit,
    title: "True scheduling optimizer",
    text: "Rule-based sequencing favors high-priority stems while respecting timing, barge readiness, and ROB risk."
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-hero-grid text-white">
      <section className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-10 lg:px-10">
        <header className="flex items-center justify-between">
          <div>
            <p className="pill bg-white/10 text-white">ABPS</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight md:text-7xl">
              Auto Bunker Planning Suite for real-world marine fuel operations.
            </h1>
          </div>
          <Link
            className="hidden rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold md:inline-flex"
            href="/dashboard"
          >
            Launch dashboard
          </Link>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-sm">
            <p className="max-w-2xl text-lg text-white/80">
              ABPS centralizes nominations, optimizer-ranked schedules, ROB exposure, and email-driven intake in one installable PWA designed for bunker planners.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white"
              >
                Open operations center
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white"
              >
                Company login
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white"
              >
                Review capabilities
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#f3efe0] p-8 text-ink shadow-panel">
            <p className="pill bg-[#d9efe8] text-sea">What ships first</p>
            <ul className="mt-5 space-y-4 text-sm text-ink/75">
              <li>Shared Supabase data model for nominations, barges, vessels, and companies</li>
              <li>Conflict detection across barge windows and overlapping ETAs</li>
              <li>ROB watchlist powered by consumption curves and voyage assumptions</li>
              <li>Email parser endpoint for direct nomination intake</li>
            </ul>
          </div>
        </div>

        <section id="features" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
              <feature.icon className="h-7 w-7 text-coral" />
              <h2 className="mt-5 text-2xl font-semibold">{feature.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/78">{feature.text}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

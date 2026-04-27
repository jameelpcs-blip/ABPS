"use client";

import { useState } from "react";
import type { ProductGrade } from "@/lib/types/abps";

const grades: ProductGrade[] = ["VLSFO", "HSFO", "MGO", "BIOFUEL"];

export function NominationForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  return (
    <section className="panel p-6">
      <div className="mb-5">
        <p className="pill bg-mist text-sea">Intake</p>
        <h2 className="mt-3 text-xl font-semibold">Create nomination</h2>
      </div>
      <form
        className="grid gap-4 md:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          setStatus("sent");
        }}
      >
        <input className="rounded-2xl border border-ink/10 bg-white px-4 py-3" placeholder="Customer" />
        <input className="rounded-2xl border border-ink/10 bg-white px-4 py-3" placeholder="Vessel name" />
        <input className="rounded-2xl border border-ink/10 bg-white px-4 py-3" placeholder="Port" />
        <input className="rounded-2xl border border-ink/10 bg-white px-4 py-3" placeholder="ETA (ISO or local)" />
        <input className="rounded-2xl border border-ink/10 bg-white px-4 py-3" placeholder="Quantity MT" />
        <select className="rounded-2xl border border-ink/10 bg-white px-4 py-3" defaultValue={grades[0]}>
          {grades.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
        <textarea
          className="rounded-2xl border border-ink/10 bg-white px-4 py-3 md:col-span-2"
          placeholder="Operational notes"
          rows={4}
        />
        <div className="md:col-span-2 flex items-center justify-between gap-4">
          <button className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white" type="submit">
            Save nomination
          </button>
          <p className="text-sm text-ink/60">
            {status === "sent"
              ? "UI saved. Connect this form to Supabase insert or server action next."
              : "Form is prepared for server action wiring."}
          </p>
        </div>
      </form>
    </section>
  );
}

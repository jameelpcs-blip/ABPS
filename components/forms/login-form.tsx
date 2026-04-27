"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("Use magic links for enterprise access.");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = createClient();

    if (!supabase) {
      setMessage("Add Supabase environment variables to enable login.");
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`
      }
    });

    setMessage(error ? error.message : "Magic link sent. Check your inbox.");
  }

  return (
    <form className="panel mx-auto max-w-lg p-6" onSubmit={handleSubmit}>
      <p className="pill bg-mist text-sea">Company access</p>
      <h1 className="mt-4 text-3xl font-semibold text-ink">Sign in to ABPS</h1>
      <p className="mt-3 text-sm text-ink/70">
        Enterprise teams can use Supabase Auth with email magic links, SSO, or provider extensions.
      </p>
      <input
        className="mt-6 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="planner@company.com"
        type="email"
        value={email}
      />
      <button className="mt-4 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white" type="submit">
        Send magic link
      </button>
      <p className="mt-4 text-sm text-ink/60">{message}</p>
    </form>
  );
}

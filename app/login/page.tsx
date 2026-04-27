import Link from "next/link";
import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ecf4f2_0%,#f3efe0_100%)] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="pill bg-white text-sea">ABPS access</p>
            <h1 className="mt-3 text-4xl font-semibold text-ink">Company-secured bunker planning</h1>
          </div>
          <Link href="/" className="rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-semibold text-ink">
            Back to overview
          </Link>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}

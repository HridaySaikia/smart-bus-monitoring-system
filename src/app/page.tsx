import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6">
      <div className="max-w-3xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-500/20 text-2xl font-bold text-blue-400 shadow-[0_0_40px_rgba(59,130,246,0.15)]">
          SB
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
          Smart Bus Monitoring System
        </h1>

        <p className="mt-5 text-lg leading-8 text-slate-400">
          A professional IoT dashboard for live bus tracking, student safety,
          RFID monitoring, emergency alerts, and hardware health visibility.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-2xl bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400"
          >
            Open Dashboard
          </Link>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-slate-300">
            SaaS-style UI
          </div>
        </div>
      </div>
    </main>
  );
}
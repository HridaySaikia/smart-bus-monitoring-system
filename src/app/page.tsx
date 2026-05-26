import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b1120] px-6 py-10">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#111827] shadow-2xl">

        <div className="grid lg:grid-cols-2">

          {/* LEFT SECTION */}
          <div className="flex flex-col justify-center px-8 py-14 md:px-14">

            {/* LOGO */}
            <div className="mb-8 flex items-center gap-4">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-[#1e293b]">
                <Image
                  src="/logo.png"
                  alt="Smart Bus Logo"
                  width={52}
                  height={52}
                  className="object-contain"
                  priority
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Smart Bus System
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Transportation Monitoring Platform
                </p>
              </div>

            </div>

            {/* TITLE */}
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">

              Smart Bus Monitoring &
              Student Safety System

            </h1>

            {/* DESCRIPTION */}
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">

              A centralized smart transportation platform
              designed for live GPS tracking, RFID-based
              student monitoring, safety management,
              route visibility, and emergency alert handling.

            </p>

            {/* BUTTON */}
            <div className="mt-10 flex flex-wrap gap-4">

              <Button
                asChild
                className="rounded-2xl bg-blue-600 px-8 py-6 text-base font-semibold transition hover:bg-blue-700"
              >
                <Link href="/login">
                  Enter Platform
                </Link>
              </Button>

            </div>

            {/* FOOTER TAGS */}
            <div className="mt-10 flex flex-wrap gap-4 text-sm text-slate-500">

              <span className="rounded-full border border-white/10 bg-[#0f172a] px-4 py-2">
                Live GPS Tracking
              </span>

              <span className="rounded-full border border-white/10 bg-[#0f172a] px-4 py-2">
                RFID Monitoring
              </span>

              <span className="rounded-full border border-white/10 bg-[#0f172a] px-4 py-2">
                Student Safety
              </span>

              <span className="rounded-full border border-white/10 bg-[#0f172a] px-4 py-2">
                Emergency Alerts
              </span>

            </div>

          </div>

          {/* RIGHT SECTION */}
          <div className="hidden bg-[#0f172a] p-10 lg:flex lg:items-center lg:justify-center">

            <div className="w-full max-w-md space-y-5">

              {/* CARD 1 */}
              <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">

                <h2 className="text-lg font-semibold text-white">
                  Real-Time Monitoring
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-400">

                  Monitor bus movement, routes,
                  and live locations through
                  integrated GPS tracking systems.

                </p>

              </div>

              {/* CARD 2 */}
              <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">

                <h2 className="text-lg font-semibold text-white">
                  RFID Student Tracking
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-400">

                  Maintain secure student boarding
                  and exit records using RFID-enabled
                  attendance monitoring.

                </p>

              </div>

              {/* CARD 3 */}
              <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">

                <h2 className="text-lg font-semibold text-white">
                  Smart Administration
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-400">

                  Manage transportation operations,
                  alerts, logs, and monitoring data
                  from a centralized dashboard.

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
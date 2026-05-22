import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function HomePage() {

  return (

    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-slate-950 to-background px-6">

      <div className="max-w-4xl text-center">

        {/* LOGO */}

        <div className="mb-8 flex justify-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-[0_0_50px_rgba(59,130,246,0.15)] backdrop-blur-xl">

            <Image
              src="/logo.png"
              alt="Smart Bus Logo"
              width={70}
              height={70}
              className="object-contain"
              priority
            />

          </div>

        </div>

        {/* TITLE */}

        <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">

          Smart Bus Monitoring System

        </h1>

        {/* DESCRIPTION */}

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">

          A modern IoT platform for bus tracking,
          student safety, RFID monitoring,
          emergency alerts, and transport visibility.

        </p>

        {/* BUTTON */}

        <div className="mt-10 flex items-center justify-center">

          <Button
            asChild
            className="rounded-2xl px-8 py-6 text-base font-semibold shadow-[0_0_30px_rgba(59,130,246,0.18)] transition-all duration-300 hover:scale-[1.02]"
          >

            <Link href="/login">

              Enter Platform

            </Link>

          </Button>

        </div>

        {/* BOTTOM TAGLINE */}

        <p className="mt-12 text-sm text-slate-500">

          Real-Time Smart Transportation • RFID Security • Live GPS Monitoring

        </p>

      </div>

    </main>
  );
}
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

import {
  Eye,
  EyeOff,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { setStoredParentId } from "@/lib/parent-session";
import { setStoredRole } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

type Role =
  | "admin"
  | "parent";

export default function LoginPage() {

  const [role, setRole] =
    useState<Role>("admin");

  const [showPassword, setShowPassword] =
    useState(false);

  const router = useRouter();

  const roleConfig = useMemo(() => {

    if (role === "admin") {

      return {

        title:
          "Admin Login",

        description:
          "Access the monitoring dashboard, alerts, logs, device health, and system controls.",

        icon: (
          <ShieldCheck className="h-6 w-6 text-blue-400" />
        ),

        buttonText:
          "Login as Admin",

        nextHref:
          "/admin/dashboard",
      };
    }

    return {

      title:
        "Parent Login",

      description:
        "Track the bus, check child status, see ETA, and view safety updates.",

      icon: (
        <UserRound className="h-6 w-6 text-emerald-400" />
      ),

      buttonText:
        "Login as Parent",

      nextHref:
        "/parent/dashboard",
    };

  }, [role]);

  const handleLogin = () => {

    setStoredRole(role);

    if (role === "parent") {

      setStoredParentId(
        "PAR-001"
      );
    }

    router.push(
      roleConfig.nextHref
    );
  };

  return (

    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-slate-950 to-background px-4 py-10">

      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-2">

        {/* LEFT SIDE */}

        <section className="flex flex-col justify-center">

          <div className="max-w-xl">

            {/* LOGO */}

            <div className="mb-6 flex items-center gap-4">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-blue-500/20 bg-blue-500/10 shadow-[0_0_40px_rgba(59,130,246,0.12)]">

                <Image
                  src="/logo.png"
                  alt="Smart Bus Logo"
                  width={52}
                  height={52}
                  className="object-contain"
                />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Smart Bus System
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Safety Monitoring Platform
                </p>

              </div>

            </div>

            {/* HEADING */}

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">

              Welcome to the Smart Bus Monitoring System

            </h1>

            <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg">

              A role-based platform for
              live tracking, student safety,
              emergency awareness, and
              transport monitoring.

            </p>

            {/* FEATURES */}

            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl">

                <p className="text-sm font-semibold text-white">
                  Admin Access
                </p>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">

                  Monitor route activity,
                  RFID logs, alerts,
                  and device health.

                </p>

              </div>

              <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl">

                <p className="text-sm font-semibold text-white">
                  Parent Access
                </p>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">

                  Track the bus,
                  view child status,
                  and check ETA quickly.

                </p>

              </div>

            </div>

          </div>

        </section>

        {/* RIGHT SIDE */}

        <section className="flex items-center">

          <Card className="w-full border-border bg-card/60 backdrop-blur-xl">

            <CardHeader>

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-background/60">

                {roleConfig.icon}

              </div>

              <CardTitle className="text-2xl text-white">

                {roleConfig.title}

              </CardTitle>

              <p className="text-sm leading-6 text-muted-foreground">

                {roleConfig.description}

              </p>

            </CardHeader>

            <CardContent className="space-y-6">

              {/* ROLE SELECT */}

              <div className="grid gap-3 sm:grid-cols-2">

                <button
                  type="button"
                  onClick={() =>
                    setRole("admin")
                  }
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    role === "admin"
                      ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                      : "border-border bg-background/50 text-slate-300 hover:bg-background"
                  }`}
                >

                  <p className="font-medium">
                    Admin
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">

                    Full monitoring access

                  </p>

                </button>

                <button
                  type="button"
                  onClick={() =>
                    setRole("parent")
                  }
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    role === "parent"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "border-border bg-background/50 text-slate-300 hover:bg-background"
                  }`}
                >

                  <p className="font-medium">
                    Parent
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">

                    Simple tracking access

                  </p>

                </button>

              </div>

              {/* EMAIL */}

              <div className="space-y-2">

                <Label htmlFor="email">
                  Email address
                </Label>

                <Input
                  id="email"
                  type="email"
                  placeholder={
                    role === "admin"
                      ? "admin@school.com"
                      : "parent@example.com"
                  }
                  className="bg-background/60"
                />

              </div>

              {/* PASSWORD */}

              <div className="space-y-2">

                <Label htmlFor="password">
                  Password
                </Label>

                <div className="relative">

                  <Input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    className="bg-background/60 pr-12"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
                  >

                    {showPassword ? (

                      <EyeOff className="h-4 w-4" />

                    ) : (

                      <Eye className="h-4 w-4" />

                    )}

                  </button>

                </div>

              </div>

              {/* REMEMBER */}

              <div className="flex items-center justify-between gap-4">

                <div className="flex items-center gap-2">

                  <Checkbox id="remember" />

                  <Label
                    htmlFor="remember"
                    className="text-sm font-normal text-muted-foreground"
                  >

                    Remember me

                  </Label>

                </div>

                <button
                  type="button"
                  className="text-sm text-blue-400 transition hover:text-blue-300"
                >

                  Forgot password?

                </button>

              </div>

              {/* LOGIN BUTTON */}

              <Button
                onClick={handleLogin}
                className="w-full rounded-xl"
              >

                {roleConfig.buttonText}

              </Button>

              {/* NOTE */}

              <div className="rounded-2xl border border-border bg-background/40 p-4 text-sm text-muted-foreground">

                <p className="font-medium text-white">
                  Demo Note
                </p>

                <p className="mt-2 leading-6">

                  This currently uses local
                  role memory for demo route
                  protection. Real authentication
                  can be integrated later.

                </p>

              </div>

            </CardContent>

          </Card>

        </section>

      </div>

    </main>
  );
}
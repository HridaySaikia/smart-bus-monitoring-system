"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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

    <main className="flex min-h-screen items-center justify-center bg-[#020817] px-4 py-10">

      <button
      onClick={() => router.push("/")}
      className="absolute left-6 top-6 flex items-center gap-2 rounded-xl border border-white/10 bg-[#111827] px-4 py-2 text-sm text-slate-300 transition hover:bg-[#1e293b] hover:text-white"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </button>

      <div className="grid w-full max-w-6xl gap-10 lg:grid-cols-2">

        {/* LEFT SIDE */}

        <section className="flex flex-col justify-center">

          <div className="max-w-xl">

            {/* LOGO */}

            <div className="mb-8 flex items-center gap-4">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-[#0f172a]">

                <Image
                  src="/logo.png"
                  alt="Smart Bus Logo"
                  width={50}
                  height={50}
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

            <h1 className="text-4xl font-bold tracking-tight leading-tight text-white md:text-5xl">

              Welcome to the Smart Bus Monitoring System

            </h1>

            <p className="mt-6 text-base leading-7 text-slate-400 md:text-lg">

              A professional transport monitoring
              platform for live tracking,
              student safety, emergency alerts,
              and route management.

            </p>

            {/* FEATURES */}

            <div className="mt-10 grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-5">

                <p className="text-sm font-semibold text-white">
                  Admin Access
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-400">

                  Monitor route activity,
                  RFID logs, alerts,
                  and device health.

                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-5">

                <p className="text-sm font-semibold text-white">
                  Parent Access
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-400">

                  Track the bus,
                  view child status,
                  and check ETA instantly.

                </p>

              </div>

            </div>

          </div>

        </section>

        {/* RIGHT SIDE */}

        <section className="flex items-center">

          <Card className="w-full border border-white/10 bg-[#0f172a] shadow-2xl">

            <CardHeader>

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111827]">

                {roleConfig.icon}

              </div>

              <CardTitle className="text-2xl text-white">

                {roleConfig.title}

              </CardTitle>

              <p className="text-sm leading-6 text-slate-400">

                {roleConfig.description}

              </p>

            </CardHeader>

            <CardContent className="space-y-6">

              {/* ROLE SELECT */}

              <div className="grid gap-3 sm:grid-cols-2">

                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`rounded-2xl border px-5 py-4 text-left transition-all duration-200 ${
                    role === "admin"
                      ? "border-blue-500 bg-blue-500/15 shadow-lg shadow-blue-500/10"
                      : "border-white/10 bg-[#111827] hover:bg-[#1e293b]"
                  }`}
                >

                  <p
                    className={`text-sm font-semibold ${
                      role === "admin"
                        ? "text-blue-400"
                        : "text-white"
                    }`}
                  >
                    Login as Admin
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Full monitoring access
                  </p>

                </button>

                <button
                  type="button"
                  onClick={() => setRole("parent")}
                  className={`rounded-2xl border px-5 py-4 text-left transition-all duration-200 ${
                    role === "parent"
                      ? "border-emerald-500 bg-emerald-500/15 shadow-lg shadow-emerald-500/10"
                      : "border-white/10 bg-[#111827] hover:bg-[#1e293b]"
                  }`}
                >

                  <p
                    className={`text-sm font-semibold ${
                      role === "parent"
                        ? "text-emerald-400"
                        : "text-white"
                    }`}
                  >
                    Login as Parent
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
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
                  className="border-white/10 bg-[#111827]"
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
                    className="border-white/10 bg-[#111827] pr-12"
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
                    className="text-sm font-normal text-slate-400"
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
                className={`h-12 w-full rounded-xl text-base font-semibold text-white ${
                  role === "admin"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >

                {role === "admin"
                  ? "Login as Admin"
                  : "Login as Parent"}

              </Button>

              {/* NOTE */}

              <div className="rounded-2xl border border-white/10 bg-[#111827] p-4 text-sm text-slate-400">

                <p className="font-medium text-white">
                  Demo Note
                </p>

                <p className="mt-2 leading-6">

                  This demo currently uses
                  local role memory for route
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
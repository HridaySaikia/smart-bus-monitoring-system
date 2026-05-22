"use client";

import dynamic from "next/dynamic";

import {
  BusFront,
  Clock3,
  MapPinned,
  ShieldAlert,
  UserRoundCheck,
  Route,
} from "lucide-react";

import BackButton from "@/components/BackButton";
import ParentSwitcher from "@/components/parent/ParentSwitcher";
import LogoutButton from "@/components/auth/LogoutButton";
import ParentGuard from "@/components/auth/ParentGuard";
import StatusPill from "@/components/parent/StatusPill";
import useParentProfile from "@/hooks/useParentProfile";
import useParentData from "@/hooks/useParentData";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BusMapClient = dynamic(
  () => import("@/components/dashboard/BusMapClient"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[400px] items-center justify-center rounded-3xl border border-border bg-background/60 text-muted-foreground">
        Loading map...
      </div>
    ),
  }
);

export default function ParentDashboardPage() {
  const {
    parentProfile,
    loading: parentLoading,
  } = useParentProfile();

  const studentId =
    parentProfile?.childStudentId;

  const { data, loading } =
    useParentData(studentId || undefined);

  const latestLog = data?.latestLog;

  const bus = data?.bus;

  const studentProfile =
    data?.studentProfile;

  const childStatus =
    latestLog?.action === "ENTRY"
      ? "On Bus"
      : latestLog?.action === "EXIT"
      ? "Dropped"
      : "Unknown";

  const childTone =
    childStatus === "On Bus"
      ? "success"
      : childStatus === "Dropped"
      ? "warning"
      : "neutral";

  const emergencyTone =
    bus?.emergencyStatus === "Normal"
      ? "success"
      : "danger";

  return (
    <ParentGuard>
      <div className="min-h-screen bg-gradient-to-br from-background via-slate-950 to-background px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <section className="rounded-3xl border border-border bg-card/60 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Parent Dashboard
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                  Live view of your child’s bus
                  status, boarding activity,
                  ETA, and current location.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <ParentSwitcher />
                  <LogoutButton />
                  <BackButton />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <StatusPill
                    label={
                      loading
                        ? "Loading..."
                        : childStatus
                    }
                    tone={childTone}
                  />

                  <StatusPill
                    label={
                      loading
                        ? "Loading..."
                        : bus?.status ||
                          "Unknown"
                    }
                    tone="info"
                  />

                  <StatusPill
                    label={
                      loading
                        ? "Loading..."
                        : bus?.emergencyStatus ||
                          "Unknown"
                    }
                    tone={emergencyTone}
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-background/60 p-4">
                  <p className="text-sm text-muted-foreground">
                    Parent Name
                  </p>

                  <p className="mt-2 text-lg font-semibold text-white">
                    {parentLoading
                      ? "Loading..."
                      : parentProfile?.name ||
                        "N/A"}
                  </p>
                </div>

                <div className="rounded-2xl bg-background/60 p-4">
                  <p className="text-sm text-muted-foreground">
                    Bus ID
                  </p>

                  <p className="mt-2 text-lg font-semibold text-white">
                    {loading
                      ? "Loading..."
                      : bus?.busId ||
                        "BUS-01"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card className="border-border bg-card/60 backdrop-blur-xl">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-400">
                    <UserRoundCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Child Status
                    </p>

                    <p className="mt-2 text-xl font-semibold text-white">
                      {loading
                        ? "Loading..."
                        : childStatus}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/60 backdrop-blur-xl">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-blue-500/10 p-3 text-blue-400">
                    <BusFront className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Bus Status
                    </p>

                    <p className="mt-2 text-xl font-semibold text-white">
                      {loading
                        ? "Loading..."
                        : bus?.status ||
                          "Unknown"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/60 backdrop-blur-xl">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-amber-500/10 p-3 text-amber-400">
                    <Clock3 className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      ETA
                    </p>

                    <p className="mt-2 text-xl font-semibold text-white">
                      {loading
                        ? "Loading..."
                        : bus?.eta ||
                          "N/A"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/60 backdrop-blur-xl">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-red-500/10 p-3 text-red-400">
                    <ShieldAlert className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Emergency
                    </p>

                    <p className="mt-2 text-xl font-semibold text-white">
                      {loading
                        ? "Loading..."
                        : bus?.emergencyStatus ||
                          "Normal"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 xl:grid-cols-3">
            <Card className="border-border bg-card/60 backdrop-blur-xl xl:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-white">
                  Live Bus Location
                </CardTitle>
              </CardHeader>

              <CardContent>
                <BusMapClient bus={bus} />
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </ParentGuard>
  );
}
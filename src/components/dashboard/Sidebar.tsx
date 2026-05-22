"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  AlertTriangle,
  Bus,
  LayoutDashboard,
  MapPinned,
  Radio,
  Users,
  BusFront,
  ClipboardList,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },

  {
    label: "Live Tracking",
    href: "/admin/dashboard/tracking",
    icon: MapPinned,
  },

  {
    label: "Manage Buses",
    href: "/admin/dashboard/buses",
    icon: BusFront,
  },

  {
    label: "Students",
    href: "/admin/dashboard/students",
    icon: Users,
  },

  {
    label: "Students Master",
    href: "/admin/dashboard/students/master",
    icon: ClipboardList,
  },

  {
    label: "Parents",
    href: "/admin/dashboard/parents",
    icon: Users,
  },

  {
    label: "Alerts",
    href: "/admin/dashboard/alerts",
    icon: AlertTriangle,
  },

  {
    label: "Device Status",
    href: "/admin/dashboard/device-status",
    icon: Radio,
  },

  {
    label: "RFID Logs",
    href: "/admin/dashboard/rfid-logs",
    icon: Bus,
  },
];

export default function Sidebar() {

  const pathname = usePathname();

  return (

    <aside className="sticky top-0 hidden h-screen w-72 overflow-y-auto border-r border-white/10 bg-slate-950 md:block">

      {/* HEADER */}

      <div className="border-b border-white/10 px-6 py-6">

        <div className="flex items-center gap-3">

          {/* LOGO */}

          <img
            src="/logo.png"
            alt="Smart Bus Logo"
            className="h-12 w-12 rounded-2xl object-cover shadow-lg"
          />

          {/* TITLE */}

          <div>

            <h2 className="text-lg font-semibold text-white">
              Smart Bus System
            </h2>

            <p className="text-sm text-slate-400">
              Safety Monitoring Panel
            </p>

          </div>

        </div>

      </div>

      {/* NAVIGATION */}

      <nav className="space-y-2 px-4 py-6">

        {navItems.map((item) => {

          const isActive =
            pathname === item.href;

          const Icon = item.icon;

          return (

            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-500/15 text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.08)]"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >

              <Icon className="h-4 w-4" />

              {item.label}

            </Link>
          );
        })}

      </nav>

      {/* SYSTEM STATUS */}

      <div className="px-4 pb-6">

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">

          <p className="text-sm font-semibold text-emerald-400">
            System Status
          </p>

          <p className="mt-1 text-sm text-slate-300">
            All primary modules are operational.
          </p>

        </div>

      </div>

    </aside>
  );
}
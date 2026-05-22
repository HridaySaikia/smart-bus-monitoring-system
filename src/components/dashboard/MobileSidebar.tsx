"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  Bus,
  LayoutDashboard,
  MapPinned,
  Menu,
  Radio,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Live Tracking", href: "/admin/dashboard/tracking", icon: MapPinned },
  { label: "Students", href: "/admin/dashboard/students", icon: Users },
  { label: "Alerts", href: "/admin/dashboard/alerts", icon: AlertTriangle },
  { label: "Device Status", href: "/admin/dashboard/device-status", icon: Radio },
  { label: "Logs", href: "/admin/dashboard/logs", icon: Bus },
  { label: "Students Master", href: "/admin/dashboard/students/master", icon: Users },
  { label: "Parents", href: "/admin/dashboard/parents", icon: Users },
];

export default function MobileSidebar() {
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="border-border bg-card text-foreground hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="border-border bg-background text-foreground">
          <SheetHeader>
            <SheetTitle className="text-left text-white">
              Smart Bus System
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-500/15 text-blue-400"
                      : "text-slate-300 hover:bg-accent hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
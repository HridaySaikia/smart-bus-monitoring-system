"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getStoredRole } from "@/lib/auth";

export default function ParentGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const role = getStoredRole();

    if (role === "parent") {
      setAllowed(true);
      return;
    }

    router.replace("/login");
  }, [router]);

  if (!allowed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        Checking access...
      </div>
    );
  }

  return <>{children}</>;
}
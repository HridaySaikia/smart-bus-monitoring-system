"use client";

import { useRouter } from "next/navigation";
import { clearStoredRole } from "@/lib/auth";
import { clearStoredParentId } from "@/lib/parent-session";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    clearStoredRole();
    clearStoredParentId();
    router.push("/login");
  };

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Logout
    </Button>
  );
}
"use client";

import { useRouter } from "next/navigation";
import { setStoredParentId } from "@/lib/parent-session";
import { Button } from "@/components/ui/button";

export default function ParentSwitcher() {
  const router = useRouter();

  const switchParent = (id: string) => {
    setStoredParentId(id);
    window.location.reload(); // force refresh
  };

  return (
    <div className="flex gap-2">
      <Button onClick={() => switchParent("PAR-001")}>
        Rahul Parent
      </Button>

      <Button onClick={() => switchParent("PAR-002")}>
        Priya Parent
      </Button>
    </div>
  );
}
"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/login")}
      className="flex items-center gap-2 rounded-xl border border-border bg-card/60 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </button>
  );
}
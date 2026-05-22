"use client";

import dynamic from "next/dynamic";

const BusMap = dynamic(() => import("./BusMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center rounded-3xl border border-border bg-background/60 text-muted-foreground">
      Loading map...
    </div>
  ),
});

export default function BusMapClient({ bus }: any) {
  return <BusMap bus={bus} />;
}
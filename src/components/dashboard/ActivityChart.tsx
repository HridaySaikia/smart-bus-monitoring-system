"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { analyticsData } from "@/lib/dashboard-data";

const chartConfig = {
  gps: {
    label: "GPS Updates",
    color: "var(--chart-1)",
  },
  rfid: {
    label: "RFID Events",
    color: "var(--chart-2)",
  },
  alerts: {
    label: "Alerts",
    color: "var(--chart-3)",
  },
};

export default function ActivityChart() {
  return (
    <Card className="border-border bg-card/60 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white">System Activity Analytics</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={analyticsData}>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />

            <Area
              type="monotone"
              dataKey="gps"
              stroke="var(--color-chart-1)"
              fill="var(--color-chart-1)"
              fillOpacity={0.18}
            />
            <Area
              type="monotone"
              dataKey="rfid"
              stroke="var(--color-chart-2)"
              fill="var(--color-chart-2)"
              fillOpacity={0.14}
            />
            <Area
              type="monotone"
              dataKey="alerts"
              stroke="var(--color-chart-3)"
              fill="var(--color-chart-3)"
              fillOpacity={0.12}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
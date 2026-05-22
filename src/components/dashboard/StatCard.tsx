import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatStatus = "success" | "info" | "warning" | "neutral";

interface StatCardProps {
  title: string;
  value: string;
  subtext: string;
  status: StatStatus;
}

const badgeStyles: Record<StatStatus, string> = {
  success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  info: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  warning: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  neutral: "bg-violet-500/15 text-violet-400 border-violet-500/20",
};

export default function StatCard({
  title,
  value,
  subtext,
  status,
}: StatCardProps) {
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium text-slate-300">
          {title}
        </CardTitle>
        <Badge className={badgeStyles[status]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="text-3xl font-bold text-white">{value}</div>
        <p className="mt-2 text-sm text-slate-400">{subtext}</p>
      </CardContent>
    </Card>
  );
}
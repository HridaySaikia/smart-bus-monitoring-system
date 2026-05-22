interface StatusPillProps {
  label: string;
  tone?: "success" | "warning" | "danger" | "info" | "neutral";
}

const toneClasses = {
  success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  warning: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  danger: "border-red-500/20 bg-red-500/10 text-red-400",
  info: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  neutral: "border-white/10 bg-white/5 text-slate-300",
};

export default function StatusPill({
  label,
  tone = "neutral",
}: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}
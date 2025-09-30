export type RangePillProps = {
  label: string;
  value: string;
  status: "low" | "normal" | "high";
};

const statusStyles: Record<RangePillProps["status"], string> = {
  low: "bg-amber-100 text-amber-900",
  normal: "bg-emerald-100 text-emerald-900",
  high: "bg-rose-100 text-rose-900"
};

export function RangePill({ label, value, status }: RangePillProps) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}>
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </span>
  );
}

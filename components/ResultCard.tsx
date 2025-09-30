import { RangePill } from "@/components/RangePill";
import { AdviceCallout } from "@/components/AdviceCallout";
import { PrivacyBadge } from "@/components/PrivacyBadge";

export type ResultCardProps = {
  analyte: string;
  value: string;
  unit: string;
  status: "low" | "normal" | "high" | "critical";
  reference: string;
  message: string;
};

export function ResultCard({ analyte, value, unit, status, reference, message }: ResultCardProps) {
  const tone = status === "critical" ? "critical" : status === "normal" ? "info" : "warning";
  const pillStatus = status === "low" ? "low" : status === "normal" ? "normal" : "high";
  return (
    <article className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{analyte}</h3>
          <p className="text-xs text-slate-500">Reference: {reference}</p>
        </div>
        <PrivacyBadge />
      </div>
      <RangePill label={`${value} ${unit}`} value={status.toUpperCase()} status={pillStatus} />
      <AdviceCallout tone={tone} title="Interpretation" message={message} />
    </article>
  );
}

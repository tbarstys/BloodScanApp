import { clsx } from "clsx";

export type AdviceCalloutProps = {
  tone: "info" | "warning" | "critical";
  title: string;
  message: string;
};

const toneStyles: Record<AdviceCalloutProps["tone"], string> = {
  info: "border-sky-200 bg-sky-50 text-sky-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  critical: "border-rose-200 bg-rose-50 text-rose-900"
};

export function AdviceCallout({ tone, title, message }: AdviceCalloutProps) {
  return (
    <aside className={clsx("rounded-2xl border px-4 py-3 text-sm", toneStyles[tone])}>
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-xs leading-relaxed">{message}</p>
    </aside>
  );
}

"use client";

import { useLabStore } from "@/lib/store/labs";
import { useMemo } from "react";
import { TrendSparkline } from "@/components/TrendSparkline";

export default function ComparePage() {
  const records = useLabStore((state) => state.records);
  const grouped = useMemo(() => {
    const map = new Map<string, number[]>();
    for (const record of records) {
      const arr = map.get(record.analyte) ?? [];
      arr.push(record.value);
      map.set(record.analyte, arr);
    }
    return Array.from(map.entries());
  }, [records]);

  if (grouped.length === 0) {
    return <p className="text-sm text-slate-600">Upload multiple results to compare trends.</p>;
  }

  return (
    <div className="space-y-6">
      {grouped.map(([analyte, values]) => (
        <div key={analyte} className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{analyte}</h2>
              <p className="text-xs text-slate-500">
                {values.length} records · {renderDelta(values)}
              </p>
            </div>
          </div>
          <TrendSparkline values={values} labels={values.map((_, index) => `#${index + 1}`)} />
        </div>
      ))}
    </div>
  );
}

function renderDelta(values: number[]) {
  if (values.length < 2) return "no change";
  const delta = values[values.length - 1] - values[values.length - 2];
  if (delta > 0) return `↑ ${delta.toFixed(2)}`;
  if (delta < 0) return `↓ ${Math.abs(delta).toFixed(2)}`;
  return "→ stable";
}

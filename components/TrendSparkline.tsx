"use client";

import { useMemo } from "react";

type TrendSparklineProps = {
  values: number[];
  labels?: string[];
};

export function TrendSparkline({ values, labels }: TrendSparklineProps) {
  const points = useMemo(() => {
    if (values.length === 0) return "";
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;
    return values
      .map((value, index) => {
        const x = (index / (values.length - 1 || 1)) * 100;
        const y = 100 - ((value - min) / range) * 100;
        return `${x},${y}`;
      })
      .join(" ");
  }, [values]);

  return (
    <svg viewBox="0 0 100 100" className="h-16 w-full">
      <polyline fill="none" strokeWidth={4} stroke="currentColor" points={points} className="text-sky-500" />
      {labels?.map((label, index) => (
        <text key={label} x={(index / (values.length - 1 || 1)) * 100} y={95} className="text-[6px] fill-slate-500">
          {label}
        </text>
      ))}
    </svg>
  );
}

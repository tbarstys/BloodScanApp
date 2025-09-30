'use client';

import { useMemo } from 'react';

export function TrendSparkline({ values }: { values: number[] }) {
  const path = useMemo(() => {
    if (values.length === 0) return '';
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;
    return values
      .map((value, index) => {
        const x = (index / (values.length - 1 || 1)) * 100;
        const y = 100 - ((value - min) / range) * 100;
        return `${index === 0 ? 'M' : 'L'} ${x},${y}`;
      })
      .join(' ');
  }, [values]);

  return (
    <svg
      className="h-10 w-24"
      viewBox="0 0 100 100"
      role="img"
      aria-label="Trend sparkline"
      preserveAspectRatio="none"
    >
      <path d={path} fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" />
    </svg>
  );
}

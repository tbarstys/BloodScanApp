'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip
} from 'chart.js';
import { useMemo } from 'react';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Filler, Tooltip);

export interface TrendSparklineProps {
  values: number[];
  labels: string[];
  status?: 'low' | 'normal' | 'high';
}

const colorMap: Record<NonNullable<TrendSparklineProps['status']>, string> = {
  low: '#38bdf8',
  normal: '#34d399',
  high: '#f97316'
};

export const TrendSparkline = ({ values, labels, status = 'normal' }: TrendSparklineProps) => {
  const color = colorMap[status];
  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data: values,
          fill: true,
          borderColor: color,
          backgroundColor: `${color}33`,
          tension: 0.4,
          pointRadius: 0
        }
      ]
    }),
    [color, labels, values]
  );
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: {
        x: { display: false },
        y: { display: false }
      }
    }),
    []
  );

  return (
    <div className="h-16 w-full">
      <Line data={data} options={options} aria-hidden />
    </div>
  );
};

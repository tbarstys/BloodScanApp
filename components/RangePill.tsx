'use client';

import { clsx } from 'clsx';

export interface RangePillProps {
  value: string;
  unit: string;
  status?: 'low' | 'normal' | 'high';
}

const statusStyles: Record<Required<RangePillProps['status']>, string> = {
  low: 'bg-blue-100 text-blue-800',
  normal: 'bg-emerald-100 text-emerald-800',
  high: 'bg-orange-100 text-orange-800'
};

export const RangePill = ({ value, unit, status = 'normal' }: RangePillProps) => (
  <span
    className={clsx(
      'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold',
      statusStyles[status]
    )}
  >
    <span>{value}</span>
    <span aria-hidden>·</span>
    <span>{unit}</span>
  </span>
);

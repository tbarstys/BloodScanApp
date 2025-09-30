import { cn } from '@/lib/utils/cn';

type RangePillProps = {
  reference: string;
  status: 'ok' | 'flag-low' | 'flag-high' | 'critical';
};

const statusStyles: Record<RangePillProps['status'], string> = {
  ok: 'bg-emerald-100 text-emerald-700',
  'flag-low': 'bg-amber-100 text-amber-700',
  'flag-high': 'bg-amber-100 text-amber-700',
  critical: 'bg-red-100 text-red-700'
};

export function RangePill({ reference, status }: RangePillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
        statusStyles[status]
      )}
    >
      Ref: {reference}
    </span>
  );
}

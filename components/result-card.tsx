import { AdviceCallout } from '@/components/advice-callout';
import { RangePill } from '@/components/range-pill';

export type ResultCardProps = {
  result: {
    id: string;
    analyte: string;
    value: number;
    unit: string;
    reference: string;
    status: 'ok' | 'flag-low' | 'flag-high' | 'critical';
    source: string;
  };
};

const statusColors: Record<ResultCardProps['result']['status'], string> = {
  ok: 'text-emerald-600',
  'flag-low': 'text-amber-600',
  'flag-high': 'text-amber-600',
  critical: 'text-red-600'
};

export function ResultCard({ result }: ResultCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <header className="flex items-baseline justify-between gap-2">
        <h2 className="text-base font-semibold text-slate-900">{result.analyte}</h2>
        <span className={`text-sm font-semibold ${statusColors[result.status]}`}>{result.status}</span>
      </header>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-slate-900">
            {result.value}
            <span className="ml-1 text-sm font-normal text-slate-500">{result.unit}</span>
          </p>
          <p className="text-xs text-slate-500">Source: {result.source}</p>
        </div>
        <RangePill reference={result.reference} status={result.status} />
      </div>
      <AdviceCallout status={result.status} reference={result.reference} />
    </article>
  );
}

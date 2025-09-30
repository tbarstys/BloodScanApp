import type { ParsedAnalyte } from '../lib/types';
import { RangePill } from './RangePill';
import { AdviceCallout } from './AdviceCallout';

interface ResultCardProps {
  analyte: ParsedAnalyte;
}

export const ResultCard: React.FC<ResultCardProps> = ({ analyte }) => (
  <article className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm" aria-label={analyte.label}>
    <header className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">{analyte.label}</h3>
        <p className="text-xs text-slate-500">Confidence: {(analyte.confidence * 100).toFixed(0)}%</p>
      </div>
      <RangePill value={analyte.value.normalized} unit={analyte.value.unit} referenceRange={analyte.referenceRange} />
    </header>
    <AdviceCallout analyte={analyte} />
    <footer className="text-xs text-slate-500">
      Source page: {analyte.source.page + 1}
    </footer>
  </article>
);

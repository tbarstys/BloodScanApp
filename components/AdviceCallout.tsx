import type { ParsedAnalyte } from '../lib/types';

interface AdviceCalloutProps {
  analyte: ParsedAnalyte;
}

const severityStyles: Record<ParsedAnalyte['flags'][number]['severity'], string> = {
  critical: 'border-danger bg-red-50 text-danger',
  'flag-high': 'border-warning bg-amber-50 text-amber-700',
  'flag-low': 'border-warning bg-amber-50 text-amber-700',
  info: 'border-slate-200 bg-slate-50 text-slate-700',
};

export const AdviceCallout: React.FC<AdviceCalloutProps> = ({ analyte }) => {
  if (!analyte.flags.length) return null;
  return (
    <div className="space-y-2">
      {analyte.flags.map((flag, index) => (
        <div key={index} className={`rounded-lg border px-3 py-2 text-sm ${severityStyles[flag.severity]}`}>
          <p className="font-semibold">{analyte.label}</p>
          <p>{flag.message}</p>
          {flag.severity === 'critical' ? (
            <p className="text-xs font-medium">Discuss with your clinician.</p>
          ) : null}
        </div>
      ))}
    </div>
  );
};

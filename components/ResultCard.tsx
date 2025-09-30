'use client';

import { RangePill } from './RangePill';
import { AdviceCallout, AdviceSeverity } from './AdviceCallout';

export interface ResultCardProps {
  analyte: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'low' | 'normal' | 'high' | 'critical';
  advice: {
    message: string;
    severity: AdviceSeverity;
    reference?: string;
  }[];
}

export const ResultCard = ({ analyte, value, unit, referenceRange, status, advice }: ResultCardProps) => {
  return (
    <article className="space-y-3 rounded-2xl bg-white p-4 shadow-sm">
      <header className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{analyte}</h3>
          <p className="text-xs text-slate-500">{referenceRange}</p>
        </div>
        <RangePill value={value} unit={unit} status={status === 'critical' ? 'high' : status} />
      </header>
      <div className="space-y-2">
        {advice.map((item, index) => (
          <AdviceCallout
            key={`${analyte}-${index}`}
            analyte={analyte}
            message={item.message}
            severity={item.severity}
            reference={item.reference}
            sourceValue={`${value} ${unit}`}
          />
        ))}
      </div>
    </article>
  );
};

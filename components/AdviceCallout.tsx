'use client';

import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';

export type AdviceSeverity = 'info' | 'flag-low' | 'flag-high' | 'critical';

const severityStyles: Record<AdviceSeverity, string> = {
  info: 'border-slate-200 bg-white text-slate-700',
  'flag-low': 'border-blue-200 bg-blue-50 text-blue-900',
  'flag-high': 'border-orange-200 bg-orange-50 text-orange-900',
  critical: 'border-rose-200 bg-rose-50 text-rose-900'
};

interface AdviceCalloutProps {
  analyte: string;
  message: string;
  severity?: AdviceSeverity;
  reference?: string;
  sourceValue?: string;
}

export const AdviceCallout = ({
  analyte,
  message,
  severity = 'info',
  reference,
  sourceValue
}: AdviceCalloutProps) => {
  const { t } = useTranslation();
  return (
    <aside
      className={clsx(
        'rounded-xl border p-4 text-sm shadow-sm transition-colors',
        severityStyles[severity]
      )}
      role="note"
      aria-live={severity === 'critical' ? 'assertive' : 'polite'}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold">{analyte}</h3>
          <p className="mt-1 text-xs leading-5">{message}</p>
          {reference ? <p className="mt-2 text-[10px] text-slate-500">{reference}</p> : null}
        </div>
        {sourceValue ? (
          <span className="ml-4 rounded-full bg-white/60 px-2 py-1 text-[10px] font-semibold text-slate-600">
            {t('report.sourceValue', { value: sourceValue })}
          </span>
        ) : null}
      </div>
      {severity === 'critical' ? (
        <p className="mt-2 text-xs font-semibold text-rose-900">{t('report.criticalEscalation')}</p>
      ) : null}
    </aside>
  );
};

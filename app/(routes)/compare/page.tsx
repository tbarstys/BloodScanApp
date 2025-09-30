'use client';

import { TrendSparkline } from '@/components/trend-sparkline';
import { useI18n } from '@/components/i18n-provider';

const mockComparisons = [
  {
    analyte: 'Hemoglobin',
    baseline: 13.2,
    latest: 12.4,
    unit: 'g/dL',
    delta: -0.8,
    history: [13.5, 13.2, 12.4]
  },
  {
    analyte: 'LDL',
    baseline: 110,
    latest: 98,
    unit: 'mg/dL',
    delta: -12,
    history: [130, 110, 98]
  }
];

export default function ComparePage() {
  const { t } = useI18n();
  return (
    <main id="main-content" className="flex flex-1 flex-col gap-4 p-4 pb-24">
      <h1 className="text-lg font-semibold text-slate-900">{t('compare.title')}</h1>
      <ul className="space-y-3">
        {mockComparisons.map((item) => (
          <li key={item.analyte} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-base font-semibold text-slate-900">{item.analyte}</p>
                <p className="text-xs text-slate-500">
                  Baseline {item.baseline} {item.unit} → Latest {item.latest} {item.unit}
                </p>
              </div>
              <span className={`text-sm font-semibold ${item.delta >= 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {item.delta >= 0 ? '+' : ''}
                {item.delta.toFixed(1)} {item.unit}
              </span>
            </div>
            <div className="mt-3 text-brand">
              <TrendSparkline values={item.history} />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

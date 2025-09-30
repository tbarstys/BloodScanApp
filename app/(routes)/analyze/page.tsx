'use client';

import { ResultCard } from '@/components/result-card';
import { useI18n } from '@/components/i18n-provider';

const mockResults = [
  {
    id: '1',
    analyte: 'Hemoglobin',
    value: 13.8,
    unit: 'g/dL',
    reference: '12.0 - 15.5',
    status: 'ok' as const,
    source: 'cbc_1.pdf'
  },
  {
    id: '2',
    analyte: 'WBC',
    value: 3.1,
    unit: '10^3/uL',
    reference: '4.0 - 11.0',
    status: 'flag-low' as const,
    source: 'cbc_1.pdf'
  }
];

export default function AnalyzePage() {
  const { t } = useI18n();
  return (
    <main id="main-content" className="flex flex-1 flex-col gap-4 p-4 pb-24">
      <h1 className="text-lg font-semibold text-slate-900">{t('analyze.title')}</h1>
      <div className="space-y-3">
        {mockResults.map((result) => (
          <ResultCard key={result.id} result={result} />
        ))}
      </div>
    </main>
  );
}

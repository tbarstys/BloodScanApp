import { getI18n } from '../../../lib/i18n/server';
import { ResultCard } from '../../../components/ResultCard';
import { TrendSparkline } from '../../../components/TrendSparkline';

const demoData = {
  analyte: 'Hemoglobin',
  value: '13.6',
  unit: 'g/dL',
  reference: '12.0 - 15.5 g/dL',
  status: 'normal' as const,
  advice: [
    {
      message: 'Within the typical range. Continue current lifestyle and hydration.',
      severity: 'info' as const
    }
  ],
  trend: {
    labels: ['Jan', 'Mar', 'Jun'],
    values: [12.9, 13.2, 13.6]
  }
};

export default async function AnalyzePage() {
  const t = await getI18n();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold">{t('analyze.title')}</h1>
        <p className="text-sm text-slate-600">{t('analyze.subtitle')}</p>
      </header>
      <ResultCard
        analyte={demoData.analyte}
        value={demoData.value}
        unit={demoData.unit}
        referenceRange={demoData.reference}
        status={demoData.status}
        advice={demoData.advice}
      />
      <section className="space-y-3 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">{t('analyze.trendTitle')}</h2>
        <TrendSparkline values={demoData.trend.values} labels={demoData.trend.labels} status="normal" />
      </section>
    </main>
  );
}

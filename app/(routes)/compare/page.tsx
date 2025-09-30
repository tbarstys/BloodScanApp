import { getI18n } from '../../../lib/i18n/server';
import { TrendSparkline } from '../../../components/TrendSparkline';

const comparison = {
  analyte: 'LDL Cholesterol',
  current: 92,
  previous: 110,
  unit: 'mg/dL',
  values: [125, 118, 110, 104, 92],
  labels: ['2022 Q1', '2022 Q3', '2023 Q1', '2023 Q3', '2024 Q1']
};

export default async function ComparePage() {
  const t = await getI18n();
  const delta = comparison.current - comparison.previous;
  const direction = delta > 0 ? '↑' : delta < 0 ? '↓' : '→';

  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold">{t('compare.title')}</h1>
        <p className="text-sm text-slate-600">{t('compare.subtitle')}</p>
      </header>
      <section className="space-y-3 rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">{comparison.analyte}</h2>
            <p className="text-xs text-slate-500">{t('compare.delta', { value: Math.abs(delta).toFixed(1), unit: comparison.unit })}</p>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
            {direction} {comparison.current} {comparison.unit}
          </span>
        </div>
        <TrendSparkline
          values={comparison.values}
          labels={comparison.labels}
          status={delta <= 0 ? 'normal' : 'high'}
        />
      </section>
    </main>
  );
}

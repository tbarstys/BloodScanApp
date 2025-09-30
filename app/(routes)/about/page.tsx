import { getI18n } from '../../../lib/i18n/server';

export default async function AboutPage() {
  const t = await getI18n();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 text-sm text-slate-600">
      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">{t('about.title')}</h1>
        <p className="mt-2 leading-6">{t('about.body')}</p>
      </section>
      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">{t('about.safetyTitle')}</h2>
        <p className="mt-2 leading-6">{t('about.safetyBody')}</p>
      </section>
    </main>
  );
}

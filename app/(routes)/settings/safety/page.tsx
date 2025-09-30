import { getI18n } from '../../../../lib/i18n/server';

export default async function SafetyPage() {
  const t = await getI18n();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 text-sm text-slate-600">
      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">{t('safety.title')}</h1>
        <p className="mt-2 leading-6">{t('safety.body')}</p>
      </section>
      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">{t('safety.escalationTitle')}</h2>
        <p className="mt-2 leading-6">{t('safety.escalationBody')}</p>
      </section>
    </main>
  );
}

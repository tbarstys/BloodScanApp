import Link from 'next/link';
import { getI18n } from '../lib/i18n/server';

export default async function HomePage() {
  const t = await getI18n();
  return (
    <main className="flex flex-1 flex-col gap-6 p-4">
      <section className="rounded-xl bg-white p-4 shadow-sm">
        <h1 className="text-xl font-semibold">{t('home.title')}</h1>
        <p className="mt-2 text-sm text-slate-600">{t('home.tagline')}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/upload" className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">
            {t('actions.startScan')}
          </Link>
          <Link
            href="/compare"
            className="rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand"
          >
            {t('actions.compare')}
          </Link>
        </div>
      </section>
      <section className="rounded-xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold">{t('home.localFirstTitle')}</h2>
        <p className="mt-2 text-sm text-slate-600">{t('home.localFirstBody')}</p>
      </section>
    </main>
  );
}

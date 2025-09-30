import { getI18n } from '../../../lib/i18n/server';
import { SettingsForm } from '../../../components/SettingsForm';

export default async function SettingsPage() {
  const t = await getI18n();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold">{t('settings.title')}</h1>
        <p className="text-sm text-slate-600">{t('settings.subtitle')}</p>
      </header>
      <SettingsForm />
      <section className="space-y-2 rounded-2xl bg-white p-4 text-xs text-slate-600">
        <h2 className="text-sm font-semibold text-slate-900">{t('settings.privacyTitle')}</h2>
        <p>{t('settings.privacyBody')}</p>
      </section>
    </main>
  );
}

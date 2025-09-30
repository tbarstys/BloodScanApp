import { SettingsPanel } from '@/components/SettingsPanel';

export default function SettingsPage() {
  return (
    <section className="flex flex-col gap-6" aria-labelledby="settings-heading">
      <div>
        <h1 id="settings-heading" className="text-2xl font-semibold">
          Settings & privacy
        </h1>
        <p className="text-sm text-slate-600">
          Configure language, units, and optional cloud helpers. Everything is off by default.
        </p>
      </div>
      <SettingsPanel />
    </section>
  );
}

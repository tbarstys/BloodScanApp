'use client';

import { useState } from 'react';
import { useI18n } from '@/components/i18n-provider';

export default function SettingsPage() {
  const { t, locale, setLocale } = useI18n();
  const [useSIUnits, setUseSIUnits] = useState(true);
  const [cloudOCR, setCloudOCR] = useState(false);
  const [llmNormalization, setLlmNormalization] = useState(false);
  const [telemetry, setTelemetry] = useState(false);

  return (
    <main id="main-content" className="flex flex-1 flex-col gap-6 p-4 pb-24">
      <h1 className="text-lg font-semibold text-slate-900">{t('settings.title')}</h1>
      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Localization</h2>
        <label className="flex items-center justify-between text-sm">
          <span>Language</span>
          <select
            className="rounded-lg border border-slate-200 px-3 py-2"
            value={locale}
            onChange={(event) => setLocale(event.target.value as typeof locale)}
          >
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="lt">Lietuvių</option>
          </select>
        </label>
        <label className="flex items-center justify-between text-sm">
          <span>Units</span>
          <select
            className="rounded-lg border border-slate-200 px-3 py-2"
            value={useSIUnits ? 'si' : 'us'}
            onChange={(event) => setUseSIUnits(event.target.value === 'si')}
          >
            <option value="si">SI (mmol/L, g/L)</option>
            <option value="us">US Conventional (mg/dL, g/dL)</option>
          </select>
        </label>
      </section>
      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Consent toggles</h2>
        <Toggle label="Use cloud OCR" value={cloudOCR} onChange={setCloudOCR} description="Optional secure OCR service. Requires explicit consent." />
        <Toggle label="Use LLM normalization" value={llmNormalization} onChange={setLlmNormalization} description="Experimental enhancer. Deterministic rules remain source of truth." />
        <Toggle label="Anonymous telemetry" value={telemetry} onChange={setTelemetry} description="Aggregated metrics only. Off by default." />
      </section>
      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Data control</h2>
        <button className="w-full rounded-xl border border-brand px-4 py-2 text-sm font-semibold text-brand">
          Clear local data
        </button>
        <button className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
          Export PDF summary
        </button>
      </section>
    </main>
  );
}

type ToggleProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  description: string;
};

function Toggle({ label, value, onChange, description }: ToggleProps) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-medium">{label}</span>
      <span className="text-xs text-slate-500">{description}</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`mt-1 flex items-center justify-between rounded-full border px-3 py-2 text-xs ${value ? 'border-brand bg-brand/10 text-brand' : 'border-slate-200 text-slate-600'}`}
        aria-pressed={value}
      >
        <span>{value ? 'Enabled' : 'Disabled'}</span>
        <span className={`h-5 w-5 rounded-full ${value ? 'bg-brand' : 'bg-slate-300'}`} aria-hidden />
      </button>
    </label>
  );
}

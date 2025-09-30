'use client';

import { useState } from 'react';

export const SettingsPanel: React.FC = () => {
  const [language, setLanguage] = useState('en');
  const [units, setUnits] = useState<'us' | 'si'>('us');
  const [cloudOcr, setCloudOcr] = useState(false);
  const [useLlm, setUseLlm] = useState(false);
  const [telemetry, setTelemetry] = useState(false);

  return (
    <form className="space-y-4" aria-describedby="settings-policy">
      <p id="settings-policy" className="text-xs text-slate-500">
        Settings apply locally on this device. Cloud helpers are disabled by default and require explicit consent.
      </p>
      <fieldset className="rounded-lg border border-slate-200 bg-white p-4">
        <legend className="px-1 text-sm font-semibold">Localization</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex flex-col text-sm">
            Language
            <select className="mt-1 rounded-md border border-slate-300 px-2 py-1" value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="lt">Lietuvių</option>
            </select>
          </label>
          <label className="flex flex-col text-sm">
            Units
            <select className="mt-1 rounded-md border border-slate-300 px-2 py-1" value={units} onChange={(e) => setUnits(e.target.value as 'us' | 'si')}>
              <option value="us">US conventional</option>
              <option value="si">SI</option>
            </select>
          </label>
        </div>
      </fieldset>
      <fieldset className="rounded-lg border border-slate-200 bg-white p-4">
        <legend className="px-1 text-sm font-semibold">Consent</legend>
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" checked={cloudOcr} onChange={(e) => setCloudOcr(e.target.checked)} />
          <span>
            Use cloud OCR
            <span className="block text-xs text-slate-500">
              Enables secure upload to a configured endpoint. No data leaves the browser unless enabled.
            </span>
          </span>
        </label>
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" checked={useLlm} onChange={(e) => setUseLlm(e.target.checked)} />
          <span>
            Use LLM normalization (beta)
            <span className="block text-xs text-slate-500">
              Optional enhancer for naming consistency. Deterministic rules remain the source of truth.
            </span>
          </span>
        </label>
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" checked={telemetry} onChange={(e) => setTelemetry(e.target.checked)} />
          <span>
            Anonymous telemetry
            <span className="block text-xs text-slate-500">Collect minimal usage metrics. Disabled by default.</span>
          </span>
        </label>
      </fieldset>
    </form>
  );
};

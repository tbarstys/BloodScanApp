'use client';

import { useI18n } from '@/components/i18n-provider';

const locales = [
  { value: 'en', label: 'EN' },
  { value: 'de', label: 'DE' },
  { value: 'lt', label: 'LT' }
] as const;

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <label className="flex items-center gap-2 text-xs text-slate-600">
      <span className="sr-only">Language</span>
      <select
        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        value={locale}
        onChange={(event) => setLocale(event.target.value as (typeof locales)[number]['value'])}
      >
        {locales.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}

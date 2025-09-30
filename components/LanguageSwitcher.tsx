'use client';

import { useTranslation } from '../lib/i18n/client';
import { languages, type Language } from '../lib/i18n/settings';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="sr-only">Language</span>
      <select
        className="rounded-md border border-slate-200 bg-white px-2 py-1"
        aria-label="Language selector"
        value={language}
        onChange={(event) => setLanguage(event.target.value as Language)}
      >
        {languages.map((lng) => (
          <option key={lng} value={lng}>
            {lng.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
};

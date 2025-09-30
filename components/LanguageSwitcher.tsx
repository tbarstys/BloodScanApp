'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'lt', label: 'LT' }
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const stored = window.localStorage.getItem('lablens-lang');
    if (stored && stored !== i18n.language) {
      void i18n.changeLanguage(stored);
    }
  }, [i18n]);

  const changeLanguage = (code: string) => {
    void i18n.changeLanguage(code);
    window.localStorage.setItem('lablens-lang', code);
  };

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language selector">
      {locales.map((locale) => {
        const active = i18n.language === locale.code;
        return (
          <button
            key={locale.code}
            type="button"
            disabled={active}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              active ? 'bg-brand text-white' : 'bg-slate-200 text-slate-700'
            }`}
            onClick={() => changeLanguage(locale.code)}
          >
            {locale.label}
          </button>
        );
      })}
    </div>
  );
};

'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import en from '@/locales/en/common.json';
import de from '@/locales/de/common.json';
import lt from '@/locales/lt/common.json';

type Locale = 'en' | 'de' | 'lt';

const dictionaries: Record<Locale, Record<string, string>> = { en, de, lt };

type I18nContextValue = {
  locale: Locale;
  t: (key: string) => string;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  const value = useMemo<I18nContextValue>(() => {
    const dictionary = dictionaries[locale];
    return {
      locale,
      setLocale,
      t: (key) => dictionary[key] ?? key
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return ctx;
}

'use client';

import { useEffect, useMemo, useState } from 'react';
import { TranslationProvider, createTranslator } from './client';
import type { Language } from './settings';

interface Props {
  children: React.ReactNode;
}

export const I18nProvider: React.FC<Props> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const stored = window.localStorage.getItem('lablens-language') as Language | null;
    if (stored) {
      setLanguage(stored);
    }
  }, []);

  const value = useMemo(() => {
    const t = createTranslator(language);
    return {
      language,
      t,
      setLanguage: (next: Language) => {
        window.localStorage.setItem('lablens-language', next);
        setLanguage(next);
      },
    };
  }, [language]);

  return <TranslationProvider value={value}>{children}</TranslationProvider>;
};

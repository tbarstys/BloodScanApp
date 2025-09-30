'use client';

import { createContext, useContext } from 'react';
import type { Language } from './settings';
import { getTranslation } from './resources';

interface TranslationContextValue {
  language: Language;
  t: (key: string) => string;
  setLanguage: (language: Language) => void;
}

const TranslationContext = createContext<TranslationContextValue>({
  language: 'en',
  t: (key) => key,
  setLanguage: () => undefined,
});

export const TranslationProvider = TranslationContext.Provider;

export const useTranslation = () => {
  return useContext(TranslationContext);
};

export const createTranslator = (language: Language) => {
  const dictionary = getTranslation(language);
  return (key: string) => key.split('.').reduce<any>((acc, part) => acc?.[part], dictionary) ?? key;
};

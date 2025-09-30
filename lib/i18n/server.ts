import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { headers } from 'next/headers';
import { defaultNS } from './config';
import { loadLocale } from './loader';

export const getI18n = async () => {
  const instance = createInstance();
  const acceptLanguage = headers().get('accept-language');
  const locale = acceptLanguage?.split(',')[0]?.split('-')[0] ?? 'en';
  const resources = await loadLocale(locale as 'en' | 'de' | 'lt');

  await instance.use(initReactI18next).init({
    resources,
    lng: locale,
    fallbackLng: 'en',
    defaultNS,
    interpolation: { escapeValue: false }
  });

  return instance.getFixedT(locale, defaultNS);
};

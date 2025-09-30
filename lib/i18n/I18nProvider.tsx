'use client';

import { createInstance, Resource } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { useEffect, useState } from 'react';
import { defaultNS, resources, Locale } from './config';

const loadAllLocales = async (): Promise<Resource> => {
  const entries = await Promise.all(
    (Object.keys(resources) as Locale[]).map(async (locale) => [
      locale,
      {
        [defaultNS]: await resources[locale][defaultNS]()
      }
    ])
  );
  return Object.fromEntries(entries);
};

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [instance, setInstance] = useState(() => createInstance());

  useEffect(() => {
    const init = async () => {
      const locale = (navigator.language?.split('-')[0] as Locale) || 'en';
      const resourceStore = await loadAllLocales();
      const i18n = instance.cloneInstance();
      await i18n.use(initReactI18next).init({
        resources: resourceStore,
        lng: locale,
        fallbackLng: 'en',
        defaultNS,
        interpolation: { escapeValue: false }
      });
      setInstance(i18n);
    };

    void init();
  }, []);

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
};

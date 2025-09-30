import { defaultNS, Locale, resources } from './config';

export const loadLocale = async (locale: Locale) => {
  const data = await resources[locale][defaultNS]();
  return {
    [locale]: {
      [defaultNS]: data
    }
  };
};

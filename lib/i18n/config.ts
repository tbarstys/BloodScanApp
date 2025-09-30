export const defaultNS = 'common';
export const resources = {
  en: {
    common: () => import('../../public/locales/en/common.json').then((module) => module.default)
  },
  de: {
    common: () => import('../../public/locales/de/common.json').then((module) => module.default)
  },
  lt: {
    common: () => import('../../public/locales/lt/common.json').then((module) => module.default)
  }
};

export type Locale = keyof typeof resources;

import en from '../../public/locales/en/common.json';
import de from '../../public/locales/de/common.json';
import lt from '../../public/locales/lt/common.json';
import type { Language } from './settings';

type Namespace = typeof en;

const resources: Record<Language, Namespace> = {
  en,
  de,
  lt,
};

export const getTranslation = (locale: Language) => resources[locale];

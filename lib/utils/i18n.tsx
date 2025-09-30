"use client";

import i18next, { type i18n as I18nInstance } from "i18next";
import { initReactI18next, useTranslation as useI18NextTranslation } from "react-i18next";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import en from "@/public/locales/en/common.json";
import de from "@/public/locales/de/common.json";
import lt from "@/public/locales/lt/common.json";

const resources = {
  en: { translation: en },
  de: { translation: de },
  lt: { translation: lt }
};

const I18NContext = createContext<I18nInstance | null>(null);

export function I18nProvider({ children, locale }: { children: React.ReactNode; locale: string }) {
  const [instance, setInstance] = useState<I18nInstance | null>(null);

  useEffect(() => {
    const i18n = i18next.createInstance();
    i18n
      .use(initReactI18next)
      .init({
        resources,
        lng: locale,
        fallbackLng: "en",
        interpolation: { escapeValue: false },
        initImmediate: false
      })
      .then(() => setInstance(i18n))
      .catch(() => setInstance(i18n));
  }, [locale]);

  const value = useMemo(() => instance, [instance]);

  if (!value) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">Loading…</div>;
  }

  return <I18NContext.Provider value={value}>{children}</I18NContext.Provider>;
}

export function useTranslation() {
  const instance = useContext(I18NContext);
  if (!instance) {
    throw new Error("useTranslation must be used within I18nProvider");
  }
  return useI18NextTranslation(undefined, { i18n: instance });
}

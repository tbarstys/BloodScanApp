import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/utils/i18n";
import { cookies, headers } from "next/headers";
import { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";

const APP_NAME = "LabLens";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Local-first lab result companion",
  applicationName: APP_NAME
};

function resolveLocale(): string {
  const cookieStore = cookies();
  const localeFromCookie = cookieStore.get("NEXT_LOCALE")?.value;
  if (localeFromCookie) return localeFromCookie;
  const acceptLanguage = headers().get("accept-language");
  if (acceptLanguage) {
    const preferred = acceptLanguage.split(",")[0]?.split("-")[0];
    if (preferred && ["en", "de", "lt"].includes(preferred)) return preferred;
  }
  return "en";
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const locale = resolveLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:rounded-full focus:bg-white focus:px-3 focus:py-2 focus:text-slate-900">
          Skip to content
        </a>
        <I18nProvider locale={locale}>
          <AppShell>{children}</AppShell>
        </I18nProvider>
      </body>
    </html>
  );
}

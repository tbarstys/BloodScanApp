"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/utils/i18n";
import { ScanAction } from "@/components/ScanAction";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { clsx } from "clsx";
import type { ReactNode } from "react";

const NAV_ITEMS = [
  { href: "/upload", key: "upload" },
  { href: "/analyze", key: "analyze" },
  { href: "/compare", key: "compare" },
  { href: "/settings", key: "settings" },
  { href: "/about", key: "about" }
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <DisclaimerBanner />
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-3">
          <div>
            <p className="text-lg font-semibold">{t("appName")}</p>
            <p className="text-xs text-slate-500">{t("tagline")}</p>
          </div>
          <nav aria-label="Primary navigation" className="hidden gap-4 text-sm font-medium sm:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "rounded-full px-3 py-1 transition-colors",
                  pathname?.startsWith(item.href)
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                {t(`navigation.${item.key}`)}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="relative mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-6" id="main-content">
        {children}
      </main>
      <nav className="fixed bottom-4 left-1/2 z-20 flex w-full max-w-sm -translate-x-1/2 items-center justify-between rounded-full border border-slate-200 bg-white/90 px-4 py-2 shadow-lg sm:hidden">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "flex flex-1 justify-center rounded-full px-3 py-1 text-xs font-semibold",
              pathname?.startsWith(item.href)
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            {t(`navigation.${item.key}`)}
          </Link>
        ))}
      </nav>
      <ScanAction />
    </div>
  );
}

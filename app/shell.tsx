'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '../lib/i18n/client';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { FloatingScanButton } from '../components/FloatingScanButton';
import { PrivacyBadge } from '../components/PrivacyBadge';
import { SafetyDisclaimer } from '../components/SafetyDisclaimer';
import { clsx } from 'clsx';
import { AppTabs } from '../components/AppTabs';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const { t } = useTranslation();
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-2 px-4 py-3">
          <Link href="/" className="text-lg font-semibold" aria-label={t('appName')}>
            {t('appName')}
          </Link>
          <div className="flex items-center gap-3">
            <PrivacyBadge />
            <LanguageSwitcher />
          </div>
        </div>
        <SafetyDisclaimer />
        <AppTabs activePath={pathname} />
      </header>
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 pb-24 pt-6">
        {children}
      </main>
      <FloatingScanButton href="/upload" className={clsx(pathname === '/upload' && 'pointer-events-none opacity-40')} />
    </div>
  );
};

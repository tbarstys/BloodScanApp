'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { PrivacyBadge } from './PrivacyBadge';
import { clsx } from 'clsx';

const tabs = [
  { href: '/', key: 'nav.home' },
  { href: '/upload', key: 'nav.upload' },
  { href: '/analyze', key: 'nav.analyze' },
  { href: '/compare', key: 'nav.compare' },
  { href: '/settings', key: 'nav.settings' }
];

export const MobileShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { t } = useTranslation();
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-slate-100">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-3 shadow">
        <div className="flex flex-col">
          <span className="text-lg font-semibold">LabLens</span>
          <PrivacyBadge />
        </div>
        <LanguageSwitcher />
      </header>
      <div className="flex flex-1 flex-col pb-20">{children}</div>
      <nav aria-label={t('nav.label')} className="fixed bottom-4 left-1/2 z-20 w-full max-w-md -translate-x-1/2 px-4">
        <div className="flex rounded-full bg-white p-2 shadow-lg">
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={clsx(
                  'flex-1 rounded-full px-3 py-2 text-center text-xs font-semibold transition-colors',
                  active ? 'bg-brand text-white' : 'text-slate-600 hover:bg-slate-100'
                )}
              >
                {t(tab.key)}
              </Link>
            );
          })}
        </div>
      </nav>
      <button
        type="button"
        aria-label={t('actions.scan')}
        className="fixed bottom-20 right-6 z-30 rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white shadow-lg"
      >
        {t('actions.scan')}
      </button>
    </div>
  );
};

'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { useI18n } from '@/components/i18n-provider';
import { cn } from '@/lib/utils/cn';
import { LanguageSwitcher } from '@/components/language-switcher';

const tabs = [
  { href: '/upload', labelKey: 'nav.upload' },
  { href: '/analyze', labelKey: 'nav.analyze' },
  { href: '/compare', labelKey: 'nav.compare' },
  { href: '/settings', labelKey: 'nav.settings' },
  { href: '/about', labelKey: 'nav.about' },
  { href: '/demo', labelKey: 'nav.demo' }
];

export function AppShell({ children, activePath }: { children: ReactNode; activePath?: string }) {
  const { t } = useI18n();

  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
        <div>
          <p className="text-sm font-semibold text-brand">LabLens</p>
          <p className="text-xs text-slate-500">{t('tagline')}</p>
        </div>
        <LanguageSwitcher />
      </header>
      <nav aria-label={t('navigation')} className="bg-white px-2 shadow-sm">
        <ul className="flex overflow-x-auto text-sm">
          {tabs.map((tab) => (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                className={cn(
                  'flex h-12 items-center justify-center rounded-t-lg border-b-2 border-transparent px-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                  activePath === tab.href ? 'border-brand text-brand' : 'text-slate-500 hover:text-brand'
                )}
              >
                {t(tab.labelKey)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}

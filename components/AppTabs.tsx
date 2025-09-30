'use client';

import Link from 'next/link';
import { clsx } from 'clsx';
import { useTranslation } from '../lib/i18n/client';

const tabs = [
  { href: '/upload', key: 'nav.upload' },
  { href: '/analyze', key: 'nav.analyze' },
  { href: '/compare', key: 'nav.compare' },
  { href: '/settings', key: 'nav.settings' },
  { href: '/about', key: 'nav.about' },
];

export const AppTabs: React.FC<{ activePath: string | null }> = ({ activePath }) => {
  const { t } = useTranslation();
  return (
    <nav aria-label="Primary" className="border-b border-slate-200 bg-white">
      <ul className="flex justify-between gap-1 overflow-x-auto px-2 py-2 text-sm">
        {tabs.map((tab) => {
          const active = activePath?.startsWith(tab.href);
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                className={clsx(
                  'block rounded-full px-3 py-2 text-center transition',
                  active ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'
                )}
              >
                {t(tab.key)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

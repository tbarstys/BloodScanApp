'use client';

import Link from 'next/link';
import { useTranslation } from '../lib/i18n/client';
import { clsx } from 'clsx';

interface FloatingScanButtonProps {
  href: string;
  className?: string;
}

export const FloatingScanButton: React.FC<FloatingScanButtonProps> = ({ href, className }) => {
  const { t } = useTranslation();
  return (
    <Link
      href={href}
      className={clsx(
        'fixed bottom-6 right-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary',
        className
      )}
      aria-label={t('actions.scan')}
    >
      <span className="text-lg font-semibold">{t('actions.scan')}</span>
    </Link>
  );
};

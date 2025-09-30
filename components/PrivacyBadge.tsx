'use client';

import { useTranslation } from 'react-i18next';

export const PrivacyBadge = () => {
  const { t } = useTranslation();
  return (
    <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700">
      <svg aria-hidden="true" focusable="false" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 0 2 3v6c0 5.25 3.53 10.74 8 11 4.47-.26 8-5.75 8-11V3L10 0Zm0 4.18 4 1.6v3.22c0 3.4-2.13 7.04-4 7.25-1.87-.21-4-3.85-4-7.25V5.78l4-1.6Z" />
      </svg>
      {t('privacy.localFirst')}
    </span>
  );
};

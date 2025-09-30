'use client';

import { useTranslation } from '../lib/i18n/client';

export const SafetyDisclaimer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="border-b border-slate-200 bg-amber-50 px-4 py-2 text-xs text-amber-800" role="note">
      <p className="font-semibold">{t('disclaimer')}</p>
      <p>{t('safety.info')}</p>
    </div>
  );
};

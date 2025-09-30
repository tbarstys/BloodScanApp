'use client';

import { useTranslation } from 'react-i18next';

export const DisclaimerBanner = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-amber-100 px-4 py-2 text-xs text-amber-900 shadow-sm">
      <p className="max-w-4xl mx-auto">
        {t('disclaimer.medicalSafety')} {t('disclaimer.emergencyEscalation')}
      </p>
    </div>
  );
};

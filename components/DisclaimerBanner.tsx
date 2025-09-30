"use client";

import { useTranslation } from "@/lib/utils/i18n";

export function DisclaimerBanner() {
  const { t } = useTranslation();
  return (
    <div className="bg-amber-100 text-amber-900 text-xs px-4 py-2 text-center" role="status">
      <strong>{t("disclaimer")}</strong>
    </div>
  );
}

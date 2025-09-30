"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/utils/i18n";

export function ScanAction() {
  const { t } = useTranslation();
  return (
    <Link
      href="/upload"
      className="fixed bottom-20 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-sky-600 text-white shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 sm:hidden"
      aria-label={t("actions.scan")}
    >
      ⊕
    </Link>
  );
}

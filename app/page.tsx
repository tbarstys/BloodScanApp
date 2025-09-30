"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { useTranslation } from "@/lib/utils/i18n";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-2xl font-semibold">{t("appName")}</h1>
        <p className="text-sm text-slate-600">{t("tagline")}</p>
      </Card>
      <Card>
        <h2 className="text-lg font-semibold">Core flows</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>Upload blood work from PDF, images, or camera capture.</li>
          <li>Run local-first OCR, normalization, and rule-based explanations.</li>
          <li>Compare trends and export privacy-safe summaries.</li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link className="rounded-full bg-slate-900 px-4 py-2 text-white" href="/upload">
            {t("actions.start")}
          </Link>
          <Link className="rounded-full border border-slate-900 px-4 py-2 text-slate-900" href="/about">
            Learn more
          </Link>
        </div>
      </Card>
    </div>
  );
}

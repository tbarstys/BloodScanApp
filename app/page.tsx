'use client';

import Link from 'next/link';
import { FloatingScanAction } from '@/components/floating-scan-action';
import { AppShell } from '@/components/app-shell';
import { PrivacyBadge } from '@/components/privacy-badge';
import { useI18n } from '@/components/i18n-provider';

export default function HomePage() {
  const { t } = useI18n();
  return (
    <AppShell activePath="/upload">
      <main id="main-content" className="flex flex-1 flex-col gap-6 p-4 pb-24">
        <section className="rounded-xl bg-white p-4 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">LabLens</h1>
          <p className="mt-2 text-sm text-slate-600">
            {t('tagline')}
          </p>
          <div className="mt-4 flex gap-3 text-sm">
            <Link href="/upload" className="rounded-full bg-brand px-4 py-2 font-medium text-white">
              Start a scan
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-brand px-4 py-2 font-medium text-brand"
            >
              Learn more
            </Link>
          </div>
        </section>
        <section className="rounded-xl bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Privacy at core</h2>
          <p className="mt-2 text-sm text-slate-600">
            LabLens runs OCR, parsing, and interpretation locally whenever possible. Nothing leaves
            your browser unless you opt-in to secure cloud helpers.
          </p>
          <PrivacyBadge className="mt-4" />
        </section>
      </main>
      <FloatingScanAction />
    </AppShell>
  );
}

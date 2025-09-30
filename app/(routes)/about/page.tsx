'use client';

import Link from 'next/link';
import { useI18n } from '@/components/i18n-provider';

export default function AboutPage() {
  const { t } = useI18n();
  return (
    <main id="main-content" className="flex flex-1 flex-col gap-4 p-4 pb-24">
      <h1 className="text-lg font-semibold text-slate-900">{t('about.title')}</h1>
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
        <p>
          LabLens is developed with a privacy-first approach. OCR, parsing, and rules evaluation run
          locally whenever possible. Cloud helpers remain opt-in and disabled by default.
        </p>
        <p>
          Deterministic YAML rules are reviewed with clinical advisors and versioned for auditability.
        </p>
        <p>
          For questions or accessibility feedback, reach out via the repository issue tracker.
        </p>
        <p>
          <Link href="/docs/architecture" className="text-brand underline">
            View architecture
          </Link>
        </p>
      </div>
    </main>
  );
}

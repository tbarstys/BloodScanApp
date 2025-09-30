'use client';

import { UploadArea } from '@/components/UploadArea';
import { CameraCapture } from '@/components/CameraCapture';
import { useI18n } from '@/components/i18n-provider';

export default function UploadPage() {
  const { t } = useI18n();

  return (
    <main id="main-content" className="flex flex-1 flex-col gap-6 p-4 pb-24">
      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <h1 className="text-lg font-semibold text-slate-900">{t('upload.title')}</h1>
        <p className="text-sm text-slate-600">{t('upload.subtitle')}</p>
        <div className="mt-4 space-y-6">
          <UploadArea onFiles={() => {}} />
          <CameraCapture onCapture={() => {}} />
        </div>
      </section>
      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Manual entry</h2>
        <p className="text-sm text-slate-600">
          Type in values when documents are unavailable. Structured validation protects against unit
          mistakes.
        </p>
        <button
          type="button"
          className="mt-4 w-full rounded-xl border border-brand px-4 py-2 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          Start manual form
        </button>
      </section>
    </main>
  );
}

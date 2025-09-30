import { UploadArea } from '../../../components/UploadArea';
import { getI18n } from '../../../lib/i18n/server';

export default async function UploadPage() {
  const t = await getI18n();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-xl font-semibold">{t('upload.title')}</h1>
      <UploadArea />
      <section className="rounded-2xl bg-white p-4 text-xs text-slate-600">
        <h2 className="text-sm font-semibold text-slate-900">{t('upload.supportedFormats')}</h2>
        <ul className="mt-2 list-disc space-y-1 pl-4">
          <li>{t('upload.format.pdf')}</li>
          <li>{t('upload.format.image')}</li>
          <li>{t('upload.format.manual')}</li>
        </ul>
      </section>
    </main>
  );
}

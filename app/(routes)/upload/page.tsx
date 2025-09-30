import { UploadArea } from '@/components/UploadArea';
import { ManualEntryForm } from '@/components/ManualEntryForm';

export default function UploadPage() {
  return (
    <section className="flex flex-col gap-6" aria-labelledby="upload-heading">
      <div>
        <h1 id="upload-heading" className="text-2xl font-semibold">
          Import results
        </h1>
        <p className="text-sm text-slate-600">
          Files stay on this device. Choose PDF, images, or capture live photos to extract lab data.
        </p>
      </div>
      <UploadArea />
      <ManualEntryForm />
    </section>
  );
}

import { UploadArea } from "@/components/UploadArea";
import { Card } from "@/components/ui/Card";

export default function UploadPage() {
  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-xl font-semibold">Import lab results</h1>
        <p className="text-sm text-slate-600">
          Files are processed locally. Enable cloud features in settings only if you consent.
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Prefer manual entry? Tap any extracted value to edit it after processing.
        </p>
      </Card>
      <UploadArea />
    </div>
  );
}

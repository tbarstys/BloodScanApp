import { Card } from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <div className="space-y-4">
      <Card>
        <h1 className="text-xl font-semibold">About LabLens</h1>
        <p className="mt-2 text-sm text-slate-600">
          LabLens is a local-first companion that helps you make sense of blood test reports with deterministic
          rules. It never provides medical advice.
        </p>
      </Card>
      <Card>
        <h2 className="text-lg font-semibold">Privacy</h2>
        <p className="mt-2 text-sm text-slate-600">
          OCR and parsing run in your browser by default. Enable cloud services only when you consent to send
          data securely to our managed endpoint.
        </p>
      </Card>
    </div>
  );
}

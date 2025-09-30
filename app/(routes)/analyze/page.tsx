import { ResultDashboard } from '@/components/ResultDashboard';

export default function AnalyzePage() {
  return (
    <section className="flex flex-col gap-6" aria-labelledby="analyze-heading">
      <div>
        <h1 id="analyze-heading" className="text-2xl font-semibold">
          Report
        </h1>
        <p className="text-sm text-slate-600">
          Review normalized values, reference ranges, and friendly explanations.
        </p>
      </div>
      <ResultDashboard />
    </section>
  );
}

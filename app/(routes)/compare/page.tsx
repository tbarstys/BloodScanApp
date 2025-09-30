import { CompareResults } from '@/components/CompareResults';

export default function ComparePage() {
  return (
    <section className="flex flex-col gap-6" aria-labelledby="compare-heading">
      <div>
        <h1 id="compare-heading" className="text-2xl font-semibold">
          What changed?
        </h1>
        <p className="text-sm text-slate-600">
          Highlight deltas across two saved analyses with clear trend arrows.
        </p>
      </div>
      <CompareResults />
    </section>
  );
}

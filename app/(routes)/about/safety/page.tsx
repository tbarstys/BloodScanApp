export default function SafetyPage() {
  return (
    <section className="space-y-4" aria-labelledby="safety-heading">
      <h1 id="safety-heading" className="text-2xl font-semibold">
        Safety mode
      </h1>
      <p className="text-sm text-slate-600">
        Safety mode ensures all interpretations remain non-diagnostic. Deterministic rules power every flag and explanation.
      </p>
      <ul className="space-y-2 text-sm text-slate-700">
        <li>• Critical findings prompt an explicit “Discuss with your clinician” message.</li>
        <li>• Potential oncologic terms are highlighted with caution banners.</li>
        <li>• Manual edits require confirmation before saving.</li>
      </ul>
    </section>
  );
}

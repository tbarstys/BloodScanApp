export default function AboutPage() {
  return (
    <section className="flex flex-col gap-6" aria-labelledby="about-heading">
      <div>
        <h1 id="about-heading" className="text-2xl font-semibold">
          About LabLens
        </h1>
        <p className="text-sm text-slate-600">
          LabLens is a local-first companion for interpreting laboratory data safely. It processes PDFs, images, and camera capture on-device whenever possible.
        </p>
      </div>
      <div className="space-y-3 text-sm text-slate-700">
        <p>
          All outputs are generated from deterministic rules derived from published reference ranges. No medical advice is provided. Critical findings prompt clinician follow-up guidance.
        </p>
        <p>
          Deployment and compliance notes are documented in PRIVACY.md and SECURITY.md within the repository.
        </p>
      </div>
    </section>
  );
}

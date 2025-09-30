import Link from 'next/link';

export function SafetyBanner() {
  return (
    <div className="bg-amber-100 px-4 py-2 text-xs text-amber-900 shadow-sm">
      <p className="font-semibold">Not medical advice.</p>
      <p>
        LabLens helps interpret lab trends but never provides diagnoses or treatment plans. For
        urgent or oncologic concerns, contact your clinician immediately.
      </p>
      <p className="mt-1">
        <Link href="/about" className="underline">
          Read safety guidance
        </Link>
      </p>
    </div>
  );
}

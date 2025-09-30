'use client';

export const PrivacyBadge: React.FC = () => (
  <span
    className="inline-flex items-center gap-1 rounded-full border border-emerald-500 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
    aria-label="Privacy first"
  >
    <span aria-hidden>🔒</span>
    Local-first
  </span>
);

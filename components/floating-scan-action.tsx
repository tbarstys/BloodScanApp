'use client';

import Link from 'next/link';
import { FiCamera } from 'react-icons/fi';

export function FloatingScanAction() {
  return (
    <Link
      href="/upload"
      className="fixed bottom-20 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40"
      aria-label="Start scan"
    >
      <FiCamera className="h-6 w-6" aria-hidden="true" />
    </Link>
  );
}

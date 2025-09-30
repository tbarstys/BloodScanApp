import { cn } from '@/lib/utils/cn';

export function PrivacyBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700',
        className
      )}
      role="status"
      aria-live="polite"
    >
      <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
      <span>Local-first • GDPR / FADP aligned</span>
    </div>
  );
}

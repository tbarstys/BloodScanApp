const defaultMessages: Record<string, string> = {
  ok: 'Within expected reference range. Continue clinician follow-up as planned.',
  'flag-low': 'Below reference. Discuss context with your clinician.',
  'flag-high': 'Above reference. Discuss context with your clinician.',
  critical: 'Critical variance detected. Please contact your clinician promptly.'
};

export function AdviceCallout({
  status,
  reference
}: {
  status: 'ok' | 'flag-low' | 'flag-high' | 'critical';
  reference: string;
}) {
  return (
    <div className="mt-4 rounded-xl bg-slate-100 p-3 text-xs text-slate-700">
      <p className="font-semibold">Safety note</p>
      <p>
        {defaultMessages[status]} Source range: <strong>{reference}</strong>.
      </p>
    </div>
  );
}

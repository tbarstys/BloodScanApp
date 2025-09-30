interface RangePillProps {
  value: number;
  unit: string;
  referenceRange?: { low: number; high: number };
}

export const RangePill: React.FC<RangePillProps> = ({ value, unit, referenceRange }) => {
  const withinRange = referenceRange ? value >= referenceRange.low && value <= referenceRange.high : true;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${withinRange ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}
    >
      {value} {unit}
      {referenceRange ? (
        <span className="text-[10px] text-slate-500">
          ({referenceRange.low}–{referenceRange.high})
        </span>
      ) : null}
    </span>
  );
};

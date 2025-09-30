'use client';

import { useState } from 'react';
import { useAnalysisStore } from '../lib/store';

export const CompareResults: React.FC = () => {
  const analyses = useAnalysisStore((state) => state.analyses);
  const compare = useAnalysisStore((state) => state.compare);
  const [firstId, setFirstId] = useState<string>('');
  const [secondId, setSecondId] = useState<string>('');
  const comparison = firstId && secondId ? compare(firstId, secondId) : undefined;

  if (!analyses.length) {
    return <p className="text-sm text-slate-600">Save at least two analyses to compare changes.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col text-sm">
          Baseline
          <select className="mt-1 rounded-md border border-slate-300 px-2 py-1" value={firstId} onChange={(e) => setFirstId(e.target.value)}>
            <option value="">Select analysis</option>
            {analyses.map((analysis) => (
              <option key={analysis.id} value={analysis.id}>
                {new Date(analysis.createdAt).toLocaleString()}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col text-sm">
          Comparison
          <select className="mt-1 rounded-md border border-slate-300 px-2 py-1" value={secondId} onChange={(e) => setSecondId(e.target.value)}>
            <option value="">Select analysis</option>
            {analyses.map((analysis) => (
              <option key={analysis.id} value={analysis.id}>
                {new Date(analysis.createdAt).toLocaleString()}
              </option>
            ))}
          </select>
        </label>
      </div>
      {comparison ? (
        <ul className="space-y-2 text-sm">
          {comparison.deltas.map((delta) => (
            <li key={delta.key} className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2">
              <span className="font-medium">{delta.key}</span>
              <span className="flex items-center gap-2">
                <span>{delta.delta.toFixed(2)}</span>
                <span aria-hidden>{delta.trend === 'up' ? '⬆️' : delta.trend === 'down' ? '⬇️' : '➡️'}</span>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-slate-500">Choose two analyses to see deltas.</p>
      )}
    </div>
  );
};

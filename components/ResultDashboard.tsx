'use client';

import { useMemo } from 'react';
import { useAnalysisStore } from '../lib/store';
import { ResultCard } from './ResultCard';
import { TrendSparkline } from './TrendSparkline';
import { exportSummaryPdf } from '../lib/export/pdf';

export const ResultDashboard: React.FC = () => {
  const current = useAnalysisStore((state) => state.current);
  const analyses = useAnalysisStore((state) => state.analyses);
  const saveAnalysis = useAnalysisStore((state) => state.saveAnalysis);

  const trendData = useMemo(() => {
    if (!current) return [];
    return analyses
      .filter((entry) => entry.analytes.some((analyte) => current.analytes[0]?.key === analyte.key))
      .map((entry) => entry.analytes[0]?.value.normalized ?? 0);
  }, [analyses, current]);

  if (!current) {
    return <p className="text-sm text-slate-600">Upload or enter lab data to see a report.</p>;
  }

  const handleExport = async () => {
    const html = `<!doctype html><html><body><h1>LabLens Summary</h1><p>Not medical advice.</p>${current.analytes
      .map((analyte) => `<div><strong>${analyte.label}</strong>: ${analyte.value.normalized} ${analyte.value.unit}</div>`)
      .join('')}</body></html>`;
    await exportSummaryPdf(html);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Current analysis</h2>
          <p className="text-xs text-slate-500">Generated {new Date(current.createdAt).toLocaleString()}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="rounded-md border border-slate-200 px-4 py-2 text-sm" onClick={() => saveAnalysis(current)}>
            Save to local history
          </button>
          <button type="button" className="rounded-md bg-primary px-4 py-2 text-sm text-white" onClick={handleExport}>
            Export PDF
          </button>
        </div>
      </div>
      {trendData.length > 1 ? <TrendSparkline points={trendData} /> : null}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {current.analytes.map((analyte) => (
          <ResultCard key={analyte.key} analyte={analyte} />
        ))}
      </div>
    </div>
  );
};

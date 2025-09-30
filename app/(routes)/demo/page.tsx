'use client';

import { useEffect, useState } from 'react';
import { ResultCard } from '@/components/result-card';

type DemoData = {
  file: string;
  analytes: Array<{ analyte: string; value: number; unit: string; reference: string }>;
};

export default function DemoPage() {
  const [demo, setDemo] = useState<DemoData | null>(null);

  useEffect(() => {
    fetch('/fixtures/demo/cbc_demo.json')
      .then((response) => response.json())
      .then((data) => setDemo(data))
      .catch(() => setDemo(null));
  }, []);

  return (
    <main id="main-content" className="flex flex-1 flex-col gap-4 p-4 pb-24">
      <h1 className="text-lg font-semibold text-slate-900">Demo mode</h1>
      <p className="text-sm text-slate-600">
        Load sample analyses to explore LabLens when you do not have personal results available.
      </p>
      {demo ? (
        <div className="space-y-3">
          {demo.analytes.map((item, index) => (
            <ResultCard
              key={index}
              result={{
                id: `${index}`,
                analyte: item.analyte,
                value: item.value,
                unit: item.unit,
                reference: item.reference,
                status: 'ok',
                source: demo.file
              }}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">Loading demo dataset…</p>
      )}
    </main>
  );
}

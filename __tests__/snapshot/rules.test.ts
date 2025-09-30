import { describe, expect, it } from 'vitest';
import { applyRules } from '../../lib/rules/engine';
import type { AnalysisResult } from '../../lib/types';

const sample: AnalysisResult = {
  id: 'sample',
  createdAt: new Date().toISOString(),
  context: { locale: 'en', units: 'us' },
  analytes: [
    {
      key: 'hemoglobin',
      label: 'Hemoglobin',
      value: { raw: 6.8, normalized: 6.8, unit: 'g/dL' },
      referenceRange: undefined,
      flags: [],
      source: { page: 0 },
      confidence: 0.9,
    },
  ],
};

describe('applyRules', () => {
  it('adds deterministic advice', () => {
    const result = applyRules(sample, { locale: 'en', units: 'us' });
    expect(result).toMatchSnapshot();
  });
});

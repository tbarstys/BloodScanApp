import { describe, expect, it } from 'vitest';
import { SafeQaClient } from '../../lib/qa';
import type { AnalysisResult } from '../../lib/types';

const mockAnalysis: AnalysisResult = {
  id: '1',
  createdAt: new Date().toISOString(),
  context: { locale: 'en', units: 'us' },
  analytes: [
    {
      key: 'hemoglobin',
      label: 'Hemoglobin',
      value: { raw: 13, normalized: 13, unit: 'g/dL' },
      referenceRange: { low: 12, high: 15.5 },
      flags: [],
      source: { page: 0 },
      confidence: 0.95,
    },
  ],
};

describe('SafeQaClient', () => {
  it('rejects treatment questions', async () => {
    const client = new SafeQaClient(async () => '');
    await expect(client.ask('Should I change my medication?', mockAnalysis)).resolves.toMatch(/clinician/);
  });

  it('throws when response lacks citation', async () => {
    const client = new SafeQaClient(async () => 'No values to show.');
    await expect(client.ask('What is my hemoglobin?', mockAnalysis)).rejects.toThrow(/citation/);
  });

  it('returns response when valid', async () => {
    const client = new SafeQaClient(async () => 'Hemoglobin 13 g/dL per panel.');
    await expect(client.ask('What is my hemoglobin?', mockAnalysis)).resolves.toContain('Hemoglobin');
  });
});

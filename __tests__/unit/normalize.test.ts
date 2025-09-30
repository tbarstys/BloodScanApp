import { describe, expect, it } from 'vitest';
import { normalizeRows } from '@/lib/normalize/index';

describe('normalizeRows', () => {
  it('normalizes glucose to mmol/L for SI preference', () => {
    const rows = [
      { analyte: 'Glucose', value: 90, unit: 'mg/dL', reference: '70-99', confidence: 0.9 }
    ];
    const normalized = normalizeRows(rows, 'si');
    expect(normalized[0].unit).toBe('mmol/L');
  });
});

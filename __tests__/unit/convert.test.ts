import { describe, expect, it } from 'vitest';
import { convertValue } from '../../lib/units/convert';

describe('convertValue', () => {
  it('converts glucose to SI', () => {
    expect(convertValue('Glucose', 90, 'mg/dL', 'si')).toEqual({ value: 5, unit: 'mmol/L' });
  });

  it('converts hemoglobin to US', () => {
    expect(convertValue('Hemoglobin', 140, 'g/L', 'us')).toEqual({ value: 14, unit: 'g/dL' });
  });
});

import { describe, it, expect } from 'vitest';
import { convertValue } from '../../lib/units/convert';

describe('convertValue', () => {
  it('converts glucose mg/dL to mmol/L', () => {
    expect(convertValue({ value: 90, unit: 'mg/dL', analyteKey: 'glucose', targetSystem: 'si' })).toEqual({
      value: 5,
      unit: 'mmol/L',
    });
  });

  it('converts hemoglobin g/dL to g/L', () => {
    expect(convertValue({ value: 13.5, unit: 'g/dL', analyteKey: 'hemoglobin', targetSystem: 'si' })).toEqual({
      value: 135,
      unit: 'g/L',
    });
  });
});

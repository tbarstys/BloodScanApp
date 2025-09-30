import { describe, expect, it } from 'vitest';
import { convertUnit } from '@/lib/units/convert';

describe('convertUnit', () => {
  it('converts glucose mg/dL to mmol/L', () => {
    expect(convertUnit('glucose:mg/dL:mmol/L', 90)).toBeCloseTo(5, 2);
  });

  it('converts hemoglobin g/dL to g/L', () => {
    expect(convertUnit('hemoglobin:g/dL:g/L', 14)).toBe(140);
  });
});

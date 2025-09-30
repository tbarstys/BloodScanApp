import { describe, expect, it } from 'vitest';
import { parseTableEntries } from '../../lib/parse/table';
import lipidsFixture from '../../fixtures/lipids_img.expected.json';

describe('parseTableEntries', () => {
  it('parses analytes from OCR text', () => {
    const text = `LDL    160    mg/dL    0-129\nHDL    45    mg/dL    40-59\nTriglycerides    220    mg/dL    0-149`;
    const parsed = parseTableEntries(text);
    expect(parsed.analytes.length).toBe(3);
    expect(parsed.analytes[0].key).toBe('ldl');
  });

  it('matches expected fixture structure', () => {
    const text = `LDL    160    mg/dL    0-129\nHDL    45    mg/dL    40-59\nTriglycerides    220    mg/dL    0-149`;
    const parsed = parseTableEntries(text);
    expect(parsed).toMatchObject(lipidsFixture);
  });
});

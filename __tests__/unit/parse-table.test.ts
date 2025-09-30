import { describe, expect, it } from 'vitest';
import { parseTableFromText } from '@/lib/parse/table';

const fixtureText = `LDL  120  mg/dL  0-100\nHDL 48 mg/dL 40-60\nTriglycerides 150 mg/dL 0-150`;

describe('parseTableFromText', () => {
  it('parses analyte rows', () => {
    const rows = parseTableFromText(fixtureText);
    expect(rows).toHaveLength(3);
    expect(rows[0].analyte).toBe('LDL');
  });
});

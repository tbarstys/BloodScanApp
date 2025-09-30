import { describe, expect, it } from 'vitest';
import { parseTableText } from '../../lib/parse/table';
import fixture from '../../fixtures/lipids_img.expected.json';

describe('parseTableText', () => {
  it('parses lipids table text deterministically', () => {
    const parsed = parseTableText(fixture.rawText);
    expect(parsed.rows).toMatchSnapshot();
  });
});

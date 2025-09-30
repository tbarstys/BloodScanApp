import { describe, expect, it } from 'vitest';
import { runRules } from '../../lib/rules/engine';
import cbcFixture from '../../fixtures/cbc_sample.json';
import { parseTableText } from '../../lib/parse/table';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('rules engine', () => {
  it('produces deterministic advice', () => {
    const table = parseTableText(cbcFixture.rawText);
    const rules = {
      cbc: readFileSync(join(process.cwd(), 'rules/cbc.yml'), 'utf-8')
    };
    const output = runRules(table, rules, { locale: 'en', sex: 'female' });
    expect(output).toMatchSnapshot();
  });
});

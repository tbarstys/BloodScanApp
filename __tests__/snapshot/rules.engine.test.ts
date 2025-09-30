import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { evaluatePanel, parseRuleYaml } from '@/lib/rules/engine';

describe('rules engine snapshots', () => {
  it('evaluates hemoglobin flags deterministically', () => {
    const source = fs.readFileSync(path.join(process.cwd(), 'rules/cbc.yml'), 'utf8');
    const panel = parseRuleYaml(source);
    const outcomes = evaluatePanel(panel, [
      { key: 'hemoglobin', value: 6.5, unit: 'g/dL', context: { demographic: 'female' } },
      { key: 'wbc', value: 12, unit: '10^3/uL' }
    ]);
    expect(outcomes).toMatchSnapshot();
  });
});

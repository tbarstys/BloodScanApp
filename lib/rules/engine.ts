import yaml from 'js-yaml';
import { RulePanel } from './types';
import { normalizeParsedTable, NormalizedResult } from '../normalize';
import type { ParsedTable } from '../parse/table';
import { convertValue } from '../units/convert';

export interface RuleContext {
  sex?: 'male' | 'female';
  age?: number;
  locale?: 'en' | 'de' | 'lt';
  preferredUnits?: 'si' | 'us';
}

export interface AdviceOutput {
  analyte: string;
  normalized: NormalizedResult;
  flags: {
    severity: string;
    message: string;
    rule: string;
  }[];
}

const parseRuleFile = (source: string): RulePanel => yaml.load(source) as RulePanel;

const evaluateCondition = (value: number, range: [number, number] | undefined, condition: string) => {
  if (condition.includes('ref_low') && range) {
    const [low] = range;
    return evalCondition(value, condition.replace('ref_low', low.toString()));
  }
  if (condition.includes('ref_high') && range) {
    const [, high] = range;
    return evalCondition(value, condition.replace('ref_high', high.toString()));
  }
  return evalCondition(value, condition);
};

const evalCondition = (value: number, expression: string) => {
  const sanitized = expression.replace(/[^0-9<>!=.\-+*/\s]/g, '');
  // eslint-disable-next-line no-new-func
  const fn = new Function('value', `return value ${sanitized};`);
  return Boolean(fn(value));
};

const matchAnalyte = (panel: RulePanel, analyte: string) =>
  panel.analytes.find((entry) =>
    [entry.key, ...entry.synonyms].map((x) => x.toLowerCase()).includes(analyte.toLowerCase())
  );

const normalizeRange = (
  analyte: string,
  range: [number, number],
  fromUnit: string,
  context: RuleContext,
  normalizedUnit: string
) => {
  const system = context.preferredUnits ?? 'si';
  const low = convertValue(analyte, range[0], fromUnit, system);
  const high = convertValue(analyte, range[1], fromUnit, system);
  const useLow = normalizedUnit === low.unit ? low.value : range[0];
  const useHigh = normalizedUnit === high.unit ? high.value : range[1];
  return [useLow, useHigh] as [number, number];
};

export const runRules = (
  table: ParsedTable,
  ruleFiles: Record<string, string>,
  context: RuleContext = {}
): AdviceOutput[] => {
  const locale = context.locale ?? 'en';
  const normalized = normalizeParsedTable(table, context.preferredUnits ?? 'si');
  const outputs: AdviceOutput[] = [];

  for (const result of normalized) {
    for (const [panelName, ruleSource] of Object.entries(ruleFiles)) {
      const panel = parseRuleFile(ruleSource);
      const analyteRule = matchAnalyte(panel, result.analyte);
      if (!analyteRule) continue;
      const refKey = context.sex ?? Object.keys(analyteRule.ref_range)[0];
      const rawRange = analyteRule.ref_range[refKey] ?? analyteRule.ref_range[Object.keys(analyteRule.ref_range)[0]];
      const range = normalizeRange(
        analyteRule.key,
        rawRange,
        analyteRule.unit,
        context,
        result.normalizedUnit
      );
      const flags = analyteRule.logic
        .filter((logic) => evaluateCondition(result.normalizedValue, range, logic.if))
        .map((logic) => ({
          severity: logic.severity,
          message: logic.message[locale],
          rule: `${panelName}:${analyteRule.key}:${logic.if}`
        }));
      outputs.push({ analyte: result.analyte, normalized: result, flags });
    }
  }

  return outputs;
};

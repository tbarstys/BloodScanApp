import yaml from 'js-yaml';
import type { AnalysisContext, AnalysisResult, ParsedAnalyte } from '../types';
import { convertValue } from '../units/convert';
import cbcYaml from '../../rules/cbc.yml';
import cmpYaml from '../../rules/cmp.yml';
import lipidsYaml from '../../rules/lipids.yml';
import thyroidYaml from '../../rules/thyroid.yml';

interface RuleMessage {
  en: string;
  de: string;
  lt: string;
}

interface RuleDefinition {
  if: string;
  severity: ParsedAnalyte['flags'][number]['severity'];
  message: RuleMessage;
}

interface RuleAnalyte {
  key: string;
  synonyms: string[];
  unit: string;
  ref_range: Record<string, [number, number]>;
  logic: RuleDefinition[];
}

interface RulePanel {
  panel: string;
  locale_notes: RuleMessage;
  analytes: RuleAnalyte[];
}

const sources: Record<string, string> = {
  cbc: cbcYaml,
  cmp: cmpYaml,
  lipids: lipidsYaml,
  thyroid: thyroidYaml,
};

const ruleCache = new Map<string, RulePanel>();

const loadRuleFile = (panel: string): RulePanel => {
  if (!sources[panel]) {
    throw new Error(`Unknown panel: ${panel}`);
  }
  if (ruleCache.has(panel)) {
    return ruleCache.get(panel)!;
  }
  const parsed = yaml.load(sources[panel]) as RulePanel;
  ruleCache.set(panel, parsed);
  return parsed;
};

const evaluateCondition = (condition: string, value: number, refRange?: { low: number; high: number }) => {
  if (condition.includes('ref_low') && refRange) {
    const threshold = refRange.low;
    return evaluateCondition(condition.replace('ref_low', threshold.toString()), value, undefined);
  }
  if (condition.includes('ref_high') && refRange) {
    const threshold = refRange.high;
    return evaluateCondition(condition.replace('ref_high', threshold.toString()), value, undefined);
  }
  const [operator, thresholdRaw] = condition.split(/\s+/);
  const threshold = Number.parseFloat(thresholdRaw);
  switch (operator) {
    case '<':
      return value < threshold;
    case '<=':
      return value <= threshold;
    case '>':
      return value > threshold;
    case '>=':
      return value >= threshold;
    default:
      return false;
  }
};

const panels = Object.keys(sources);

const findPanelForAnalyte = (key: string): RulePanel | undefined => {
  const normalizedKey = key.toLowerCase();
  for (const panel of panels) {
    const definition = loadRuleFile(panel);
    if (
      definition.analytes.some(
        (analyte) =>
          analyte.key === normalizedKey || analyte.synonyms.map((s) => s.toLowerCase()).includes(normalizedKey)
      )
    ) {
      return definition;
    }
  }
  return undefined;
};

export const applyRules = (result: AnalysisResult, context: AnalysisContext): AnalysisResult => {
  const enriched: AnalysisResult = {
    ...result,
    analytes: result.analytes.map((analyte) => {
      const definition = findPanelForAnalyte(analyte.key);
      if (!definition) return analyte;
      const normalizedKey = analyte.key.toLowerCase();
      const analyteRules = definition.analytes.find(
        (item) => item.key === normalizedKey || item.synonyms.map((syn) => syn.toLowerCase()).includes(normalizedKey)
      );
      if (!analyteRules) return analyte;
      const refRangeTuple = analyteRules.ref_range[context.sex ?? 'adult'] ?? analyteRules.ref_range['fasting'];
      const refRange = refRangeTuple ? { low: refRangeTuple[0], high: refRangeTuple[1] } : undefined;
      const normalized = convertValue({
        value: analyte.value.raw,
        unit: analyte.value.unit,
        analyteKey: analyte.key,
        targetSystem: context.units,
      });
      const flags: ParsedAnalyte['flags'] = [];
      for (const rule of analyteRules.logic) {
        if (evaluateCondition(rule.if, normalized.value, refRange)) {
          flags.push({
            severity: rule.severity,
            message: rule.message[context.locale as keyof RuleMessage] ?? rule.message.en,
          });
        }
      }
      return {
        ...analyte,
        value: { ...analyte.value, normalized: normalized.value, unit: normalized.unit },
        referenceRange: refRange,
        flags,
      };
    }),
  };
  return enriched;
};

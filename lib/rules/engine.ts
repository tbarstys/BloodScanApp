import yaml from 'js-yaml';

export type RuleMessage = {
  en: string;
  de: string;
  lt: string;
};

export type RuleCondition = {
  if: string;
  severity: 'critical' | 'flag-low' | 'flag-high' | 'info';
  message: RuleMessage;
};

export type AnalyteRule = {
  key: string;
  synonyms: string[];
  unit: string;
  ref_range: Record<string, [number, number]>;
  logic: RuleCondition[];
};

export type PanelRule = {
  panel: string;
  locale_notes: RuleMessage;
  analytes: AnalyteRule[];
};

export type AnalyteObservation = {
  key: string;
  value: number;
  unit: string;
  context?: {
    demographic?: 'male' | 'female' | 'adult';
  };
};

export type RuleOutcome = {
  analyte: string;
  severity: RuleCondition['severity'];
  triggeredCondition: string;
  message: string;
};

export function parseRuleYaml(source: string): PanelRule {
  return yaml.load(source) as PanelRule;
}

function evaluateCondition(value: number, ref: [number, number], expression: string): boolean {
  const [low, high] = ref;
  const context = {
    value,
    ref_low: low,
    ref_high: high
  } as const;

  if (expression.includes('<=')) {
    const target = Number(expression.split('<=')[1].trim());
    return value <= target;
  }
  if (expression.includes('>=')) {
    const target = Number(expression.split('>=')[1].trim());
    return value >= target;
  }
  if (expression.includes('<')) {
    const token = expression.split('<')[1].trim();
    return value < (token === 'ref_low' ? context.ref_low : Number(token));
  }
  if (expression.includes('>')) {
    const token = expression.split('>')[1].trim();
    return value > (token === 'ref_high' ? context.ref_high : Number(token));
  }
  if (expression.includes('==')) {
    const target = Number(expression.split('==')[1].trim());
    return value === target;
  }
  return false;
}

export function evaluatePanel(panel: PanelRule, observations: AnalyteObservation[], locale: keyof RuleMessage = 'en') {
  const outcomes: RuleOutcome[] = [];
  panel.analytes.forEach((rule) => {
    const observation = observations.find((obs) => {
      if (obs.key === rule.key) return true;
      return rule.synonyms.some((synonym) => synonym.toLowerCase() === obs.key.toLowerCase());
    });
    if (!observation) return;

    const demographic = observation.context?.demographic ?? Object.keys(rule.ref_range)[0];
    const ref = rule.ref_range[demographic] ?? Object.values(rule.ref_range)[0];

    rule.logic.forEach((condition) => {
      if (evaluateCondition(observation.value, ref, condition.if)) {
        outcomes.push({
          analyte: rule.key,
          severity: condition.severity,
          triggeredCondition: condition.if,
          message: condition.message[locale]
        });
      }
    });
  });

  return outcomes;
}

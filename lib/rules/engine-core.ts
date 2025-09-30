import { convertUnit } from "@/lib/units/convert";
import { type LabRecord } from "@/lib/types";
import { type RulePanel } from "@/lib/rules/loader";

export type EvaluationContext = {
  sex?: "male" | "female";
  age?: number;
};

export type RuleResult = LabRecord & {
  messages: {
    severity: string;
    message: string;
  }[];
};

export function evaluateWithRules(
  records: LabRecord[],
  rules: RulePanel[],
  context: EvaluationContext = {}
): RuleResult[] {
  const results: RuleResult[] = [];

  for (const record of records) {
    const panelMatch = rules.flatMap((panel) => panel.analytes);
    const analyteRule = panelMatch.find((rule) => {
      const target = record.analyte.toLowerCase();
      return rule.key.toLowerCase() === target || rule.synonyms?.some((syn) => syn.toLowerCase() === target);
    });

    if (!analyteRule) {
      results.push({ ...record, messages: [] });
      continue;
    }

    const converted =
      convertUnit(record.value, record.unit, analyteRule.unit, record.analyte) ?? record.value;
    let status: LabRecord["status"] = "normal";
    const messages: RuleResult["messages"] = [];

    const ref = analyteRule.ref_range;
    const [low, high] = Array.isArray(ref)
      ? (ref as [number, number])
      : (ref[(context.sex ?? "male")] as [number, number]);

    if (converted < low) status = "low";
    if (converted > high) status = status === "low" ? "critical" : "high";

    for (const logic of analyteRule.logic) {
      if (evaluateCondition(converted, logic.if, { ref_low: low, ref_high: high })) {
        messages.push({ severity: logic.severity, message: logic.message.en });
        if (logic.severity === "critical") status = "critical";
      }
    }

    results.push({
      ...record,
      status,
      normalizedValue: converted,
      normalizedUnit: analyteRule.unit,
      reference: { low, high, unit: analyteRule.unit },
      messages
    });
  }

  return results;
}

function evaluateCondition(value: number, condition: string, context: { ref_low: number; ref_high: number }) {
  if (condition.includes("ref_low")) {
    const comparator = condition.replace("ref_low", String(context.ref_low));
    return compare(value, comparator);
  }
  if (condition.includes("ref_high")) {
    const comparator = condition.replace("ref_high", String(context.ref_high));
    return compare(value, comparator);
  }
  return compare(value, condition);
}

function compare(value: number, expression: string) {
  if (expression.startsWith("<=")) return value <= Number(expression.slice(2));
  if (expression.startsWith(">=")) return value >= Number(expression.slice(2));
  if (expression.startsWith("<")) return value < Number(expression.slice(1));
  if (expression.startsWith(">")) return value > Number(expression.slice(1));
  if (expression.startsWith("==")) return value === Number(expression.slice(2));
  return false;
}

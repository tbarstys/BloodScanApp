import { loadRules, type RulePanel } from "@/lib/rules/loader";
import { type LabRecord } from "@/lib/types";
import { evaluateWithRules, type RuleResult, type EvaluationContext } from "@/lib/rules/engine-core";

export { evaluateWithRules } from "@/lib/rules/engine-core";
export type { RuleResult, EvaluationContext } from "@/lib/rules/engine-core";

export function evaluateRecords(records: LabRecord[], context: EvaluationContext = {}): RuleResult[] {
  const rules = loadRules();
  return evaluateWithRules(records, rules as RulePanel[], context);
}

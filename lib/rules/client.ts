import yaml from "js-yaml";
import type { RulePanel } from "@/lib/rules/loader";

const RULE_FILES = ["cbc.yml", "cmp.yml", "lipids.yml", "thyroid.yml"];

let promise: Promise<RulePanel[]> | null = null;

export function fetchRulesClient(): Promise<RulePanel[]> {
  if (!promise) {
    promise = Promise.all(
      RULE_FILES.map(async (file) => {
        const response = await fetch(`/api/rules/${file}`);
        const text = await response.text();
        return yaml.load(text) as RulePanel;
      })
    );
  }
  return promise;
}

import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export type RuleMessage = {
  en: string;
  de?: string;
  lt?: string;
};

export type RuleLogic = {
  if: string;
  severity: "info" | "flag-low" | "flag-high" | "critical";
  message: RuleMessage;
};

export type RuleAnalyte = {
  key: string;
  synonyms?: string[];
  unit: string;
  ref_range: any;
  logic: RuleLogic[];
};

export type RulePanel = {
  panel: string;
  locale_notes: RuleMessage;
  analytes: RuleAnalyte[];
};

let cache: RulePanel[] | null = null;

export function loadRules(): RulePanel[] {
  if (cache) return cache;
  if (typeof window !== "undefined") {
    throw new Error("loadRules is server-only in this build. Use fetchRulesClient on the client.");
  }
  const directory = path.join(process.cwd(), "rules");
  const files = fs.readdirSync(directory).filter((file) => file.endsWith(".yml"));
  cache = files.map((file) => yaml.load(fs.readFileSync(path.join(directory, file), "utf8")) as RulePanel);
  return cache;
}

export function resetRuleCache() {
  cache = null;
}

import { loadRules } from "@/lib/rules/loader";

export function lookupReference(analyte: string, context?: { sex?: "male" | "female"; age?: number }) {
  const rules = loadRules();
  for (const panel of rules) {
    for (const item of panel.analytes) {
      if (item.key.toLowerCase() === analyte.toLowerCase() || item.synonyms?.some((s) => s.toLowerCase() === analyte.toLowerCase())) {
        const ref = item.ref_range;
        if (typeof ref === "object" && "male" in ref) {
          const sex = context?.sex ?? "male";
          const [low, high] = ref[sex];
          return { low, high, unit: item.unit };
        }
        if (Array.isArray(ref)) {
          const [low, high] = ref as [number, number];
          return { low, high, unit: item.unit };
        }
      }
    }
  }
  return undefined;
}

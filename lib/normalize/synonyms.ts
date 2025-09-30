const SYNONYM_MAP: Record<string, string> = {
  hb: "Hemoglobin",
  hgb: "Hemoglobin",
  hemoglobin: "Hemoglobin",
  wbc: "White Blood Cells",
  rbc: "Red Blood Cells",
  glucose: "Glucose",
  cholesterol: "Cholesterol",
  triglycerides: "Triglycerides",
  tsh: "TSH"
};

export function mapSynonym(input: string): string {
  const normalized = input.trim().toLowerCase();
  return SYNONYM_MAP[normalized] ?? input.trim();
}

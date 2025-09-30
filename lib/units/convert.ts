const conversionMap: Record<string, (value: number) => number> = {
  "glucose:mg/dl->mmol/l": (value) => value / 18,
  "glucose:mmol/l->mg/dl": (value) => value * 18,
  "cholesterol:mg/dl->mmol/l": (value) => value / 38.67,
  "cholesterol:mmol/l->mg/dl": (value) => value * 38.67,
  "triglycerides:mg/dl->mmol/l": (value) => value / 88.57,
  "triglycerides:mmol/l->mg/dl": (value) => value * 88.57,
  "hemoglobin:g/dl->g/l": (value) => value * 10,
  "hemoglobin:g/l->g/dl": (value) => value / 10,
  "white blood cells:10^3/µl->10^9/l": (value) => value * 1,
  "white blood cells:10^9/l->10^3/µl": (value) => value * 1,
  "platelets:10^3/µl->10^9/l": (value) => value * 1,
  "platelets:10^9/l->10^3/µl": (value) => value * 1
};

export function convertUnit(value: number, fromUnit: string, toUnit: string | undefined, analyte?: string) {
  if (!toUnit || !fromUnit) return undefined;
  if (fromUnit.toLowerCase() === toUnit.toLowerCase()) return value;
  const key = `${(analyte ?? "").toLowerCase()}:${fromUnit.toLowerCase()}->${toUnit.toLowerCase()}`;
  const altKey = `${fromUnit.toLowerCase()}->${toUnit.toLowerCase()}`;
  const converter = conversionMap[key] ?? conversionMap[altKey];
  return converter ? Number(converter(value).toFixed(3)) : undefined;
}

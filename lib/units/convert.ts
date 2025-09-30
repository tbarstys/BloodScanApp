export type UnitPair = 'mg/dL' | 'mmol/L' | 'g/dL' | 'g/L' | '10^3/uL' | '10^9/L';

const conversionMap: Record<string, (value: number) => number> = {
  'glucose:mg/dL:mmol/L': (value) => value / 18,
  'glucose:mmol/L:mg/dL': (value) => value * 18,
  'cholesterol:mg/dL:mmol/L': (value) => value / 38.67,
  'cholesterol:mmol/L:mg/dL': (value) => value * 38.67,
  'triglycerides:mg/dL:mmol/L': (value) => value / 88.57,
  'triglycerides:mmol/L:mg/dL': (value) => value * 88.57,
  'hemoglobin:g/dL:g/L': (value) => value * 10,
  'hemoglobin:g/L:g/dL': (value) => value / 10,
  'wbc:10^3/uL:10^9/L': (value) => value,
  'wbc:10^9/L:10^3/uL': (value) => value,
  'platelets:10^3/uL:10^9/L': (value) => value,
  'platelets:10^9/L:10^3/uL': (value) => value
};

export type UnitConversionKey = keyof typeof conversionMap;

export function convertUnit(key: UnitConversionKey, value: number, precision = 3) {
  const converter = conversionMap[key];
  if (!converter) throw new Error(`Unsupported conversion ${key}`);
  const result = converter(value);
  return Number(result.toPrecision(precision));
}

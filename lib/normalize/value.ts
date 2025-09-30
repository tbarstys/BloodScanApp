import { convertUnit } from "@/lib/units/convert";
import { type LabRecord } from "@/lib/types";

export function normalizeValue(value: number, unit: string) {
  const normalizedUnit = unit || "";
  const normalizedValue = convertUnit(value, unit, normalizedUnit) ?? value;
  return { value: normalizedValue, unit: normalizedUnit };
}

export function applyNormalization(record: LabRecord, context: { sex?: "male" | "female"; age?: number } = {}) {
  const targetUnit = record.unit;
  const converted = convertUnit(record.value, record.unit, targetUnit);
  const normalizedValue = converted ?? record.value;
  return { ...record, normalizedValue, normalizedUnit: targetUnit };
}

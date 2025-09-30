import { convertValue } from '../units/convert';
import type { ParsedTable } from '../parse/table';

export interface NormalizedResult {
  analyte: string;
  value: number;
  unit: string;
  normalizedUnit: string;
  normalizedValue: number;
  referenceRange?: string;
  confidence: number;
}

export const normalizeParsedTable = (
  table: ParsedTable,
  preferredUnit: 'si' | 'us' = 'si'
): NormalizedResult[] => {
  return table.rows.map((row) => {
    const { value, unit } = row;
    const { value: normalizedValue, unit: normalizedUnit } = convertValue(row.analyte, value, unit, preferredUnit);
    return {
      analyte: row.analyte,
      value,
      unit,
      normalizedValue,
      normalizedUnit,
      referenceRange: row.referenceRange,
      confidence: row.confidence
    };
  });
};

import { ParsedRow } from '@/lib/parse/table';
import { convertUnit } from '@/lib/units/convert';

export type NormalizedAnalyte = ParsedRow & { key: string };

const synonymMap: Record<string, string> = {
  hb: 'hemoglobin',
  hgb: 'hemoglobin',
  hemoglobin: 'hemoglobin',
  wbc: 'wbc',
  ldl: 'ldl',
  hdl: 'hdl',
  tsh: 'tsh'
};

export function normalizeRows(rows: ParsedRow[], preferredUnits: 'si' | 'us'): NormalizedAnalyte[] {
  return rows.map((row) => {
    const key = synonymMap[row.analyte.toLowerCase()] ?? row.analyte.toLowerCase();
    let value = row.value;
    let unit = row.unit;

    if (preferredUnits === 'si' && unit === 'mg/dL' && key === 'glucose') {
      value = convertUnit('glucose:mg/dL:mmol/L', value);
      unit = 'mmol/L';
    }

    if (preferredUnits === 'us' && unit === 'mmol/L' && key === 'glucose') {
      value = convertUnit('glucose:mmol/L:mg/dL', value);
      unit = 'mg/dL';
    }

    return { ...row, key, value, unit };
  });
}

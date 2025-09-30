import { z } from 'zod';
import { parseNumber } from './number';

const rowSchema = z.object({
  analyte: z.string(),
  value: z.string(),
  unit: z.string().optional(),
  reference: z.string().optional(),
});

export interface ParsedTableResult {
  analytes: Array<{
    key: string;
    label: string;
    rawValue: number;
    unit: string;
    referenceRange?: { low: number; high: number };
    confidence: number;
  }>;
}

const analyteSynonyms: Record<string, string> = {
  hb: 'hemoglobin',
  hgb: 'hemoglobin',
  'white blood cells': 'wbc',
};

const normalizeKey = (label: string) => {
  const raw = label.toLowerCase().replace(/[^a-z0-9]/g, '');
  return analyteSynonyms[raw] ?? raw;
};

const parseReferenceRange = (value?: string) => {
  if (!value) return undefined;
  const [low, high] = value
    .split(/[-–~]/)
    .map((part) => part.trim())
    .map((part) => {
      try {
        return parseNumber(part);
      } catch (error) {
        return undefined;
      }
    });
  if (low === undefined || high === undefined) return undefined;
  return { low, high };
};

export const parseTableEntries = (text: string): ParsedTableResult => {
  const rows: ParsedTableResult['analytes'] = [];
  const lines = text.split(/\n|\r/);
  for (const line of lines) {
    const segments = line.split(/\s{2,}|\t/).map((segment) => segment.trim()).filter(Boolean);
    if (segments.length < 2) continue;
    const candidate = rowSchema.safeParse({
      analyte: segments[0],
      value: segments[1],
      unit: segments[2],
      reference: segments[3],
    });
    if (!candidate.success) continue;
    try {
      const rawValue = parseNumber(candidate.data.value);
      rows.push({
        key: normalizeKey(candidate.data.analyte),
        label: candidate.data.analyte,
        rawValue,
        unit: candidate.data.unit ?? '',
        referenceRange: parseReferenceRange(candidate.data.reference),
        confidence: 0.8,
      });
    } catch (error) {
      // skip invalid values
    }
  }
  return { analytes: rows };
};

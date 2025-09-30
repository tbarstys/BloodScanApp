import { z } from 'zod';
import { mapSynonym } from '../normalize/synonyms';

const lineRegex = /([A-Za-z %\/\.\-]+)\s+(\d+[\d.,]*)\s*([\w^\/-]+)\s*(\d+[\d.,]*\s*-\s*\d+[\d.,]*)?/;

const analyteSchema = z.object({
  analyte: z.string(),
  value: z.number(),
  unit: z.string(),
  referenceRange: z.string().optional(),
  confidence: z.number().min(0).max(1)
});

export type ParsedRow = z.infer<typeof analyteSchema>;

export interface ParsedTable {
  rows: ParsedRow[];
  rawText: string;
}

const normaliseDecimal = (input: string) => Number(input.replace(',', '.'));

export const parseTableText = (text: string): ParsedTable => {
  const lines = text.split(/\n+/);
  const rows: ParsedRow[] = [];
  for (const line of lines) {
    const match = lineRegex.exec(line);
    if (!match) continue;
    const [, analyte, value, unit, referenceRange] = match;
    const parsed = analyteSchema.safeParse({
      analyte: mapSynonym(analyte.trim()),
      value: normaliseDecimal(value),
      unit: unit.trim(),
      referenceRange: referenceRange?.trim(),
      confidence: 0.95
    });
    if (parsed.success) {
      rows.push(parsed.data);
    }
  }

  return { rows, rawText: text };
};

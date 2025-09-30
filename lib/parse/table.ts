import { z } from 'zod';

const RowSchema = z.object({
  analyte: z.string(),
  value: z.coerce.number(),
  unit: z.string(),
  reference: z.string().optional(),
  confidence: z.number().min(0).max(1)
});

export type ParsedRow = z.infer<typeof RowSchema>;

export function parseTableFromText(text: string): ParsedRow[] {
  const lines = text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const rows: ParsedRow[] = [];

  lines.forEach((line) => {
    const parts = line.split(/\s{2,}|\t/).map((part) => part.trim()).filter(Boolean);
    if (parts.length < 2) return;
    const [analyteRaw, valueRaw, unitRaw, referenceRaw] = parts;
    const analyte = analyteRaw.replace(/[:]/g, '');
    const value = parseFloat(valueRaw.replace(',', '.'));
    const unit = unitRaw ?? '';
    const reference = referenceRaw ?? '';
    if (Number.isFinite(value) && analyte) {
      const parsed = RowSchema.safeParse({ analyte, value, unit, reference, confidence: 0.8 });
      if (parsed.success) {
        rows.push(parsed.data);
      }
    }
  });

  return rows;
}

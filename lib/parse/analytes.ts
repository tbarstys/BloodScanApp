import { nanoid } from "nanoid";
import { z } from "zod";
import { mapSynonym } from "@/lib/normalize/synonyms";
import { normalizeValue } from "@/lib/normalize/value";
import { type LabRecord } from "@/lib/types";

const rowSchema = z.tuple([z.string(), z.string(), z.string().optional().default(""), z.string().optional().default("")]);

export function parseAnalytes(table: { rows: string[][] }, context: { fileName: string; page?: number }): LabRecord[] {
  return table.rows
    .map((row) => {
      const parsed = rowSchema.safeParse(row);
      if (!parsed.success) return null;
      const [rawName, rawValue, rawUnit] = parsed.data;
      const analyte = mapSynonym(rawName);
      const value = parseFloat(rawValue.replace(/,/g, "."));
      if (Number.isNaN(value)) return null;
      const unit = rawUnit || "";
      const normalized = normalizeValue(value, unit);
      return {
        id: nanoid(),
        analyte,
        value,
        unit: unit || normalized.unit,
        normalizedValue: normalized.value,
        normalizedUnit: normalized.unit,
        source: { fileName: context.fileName, page: context.page, confidence: 0.9 }
      } satisfies LabRecord;
    })
    .filter((record): record is LabRecord => Boolean(record));
}

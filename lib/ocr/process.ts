import { nanoid } from 'nanoid';
import { parsePdf } from './pdf';
import { parseImage } from './image';
import { parseTableEntries } from '../parse/table';
import { normalizeAnalytes } from '../normalize';
import { applyRules } from '../rules/engine';
import { scrubPhi } from '../security/phi';
import type { AnalysisResult } from '../types';

export const processFiles = async (files: File[]): Promise<AnalysisResult> => {
  const parsedPages = [] as Array<{ text: string; analytes: ReturnType<typeof parseTableEntries>['analytes'] }>;
  for (const file of files) {
    const mime = file.type || 'application/octet-stream';
    let text = '';
    if (mime === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      text = await parsePdf(file);
    } else {
      text = await parseImage(file);
    }
    const scrubbed = scrubPhi(text);
    const table = parseTableEntries(scrubbed);
    parsedPages.push({ text: scrubbed, analytes: table.analytes });
  }

  const context = { locale: 'en', units: 'us' } as AnalysisResult['context'];
  const analytes = normalizeAnalytes(parsedPages.flatMap((page) => page.analytes), context.units);
  const result: AnalysisResult = {
    id: nanoid(),
    createdAt: new Date().toISOString(),
    context,
    analytes,
  };
  return applyRules(result, context);
};

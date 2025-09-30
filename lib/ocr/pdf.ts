import { createWorker } from 'tesseract.js';
import type { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import { getDocument } from 'pdfjs-dist';
import { PHIScrubber } from '@/lib/security/phi-scrubber';

export type OCRPageResult = {
  text: string;
  confidence: number;
};

export type PDFExtractionResult = {
  pages: OCRPageResult[];
};

async function renderPageToCanvas(pdf: PDFDocumentProxy, index: number): Promise<HTMLCanvasElement> {
  const page = await pdf.getPage(index + 1);
  const viewport = page.getViewport({ scale: 2 });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas context unavailable');
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  await page.render({ canvasContext: context, viewport }).promise;
  return canvas;
}

export async function extractTextFromPdf(buffer: ArrayBuffer, locale: 'en' | 'de' | 'lt' = 'en') {
  const pdf = await getDocument({ data: buffer }).promise;
  const pages: OCRPageResult[] = [];
  const worker = await createWorker({ logger: () => undefined });
  await worker.load();
  await worker.loadLanguage(locale);
  await worker.initialize(locale);

  try {
    for (let index = 0; index < pdf.numPages; index += 1) {
      const canvas = await renderPageToCanvas(pdf, index);
      const { data } = await worker.recognize(canvas);
      pages.push({
        text: PHIScrubber.mask(data.text),
        confidence: data.confidence
      });
    }
  } finally {
    await worker.terminate();
  }

  return { pages } satisfies PDFExtractionResult;
}

import type { PDFDocumentProxy } from 'pdfjs-dist';
import { createWorker } from 'tesseract.js';
import { parseTableText } from '../parse/table';
import { scrubPhi } from '../security/phi';
import { WorkerPool } from './workers/pool';

export interface PdfExtractionOptions {
  languages?: string[];
  onProgress?: (progress: number) => void;
}

const pool = new WorkerPool(2);

const initWorker = async (languages: string[], onProgress?: (progress: number) => void) => {
  const worker = await createWorker({
    logger: ({ progress }) => onProgress?.(progress ?? 0)
  });
  const lang = languages.join('+');
  await worker.loadLanguage(lang);
  await worker.initialize(lang);
  return worker;
};

export const extractFromPdf = async (file: File, options: PdfExtractionOptions = {}) => {
  const pdfjs = await import('pdfjs-dist/build/pdf');
  const pdfWorker = await import('pdfjs-dist/build/pdf.worker.entry');
  (pdfjs as unknown as { GlobalWorkerOptions: { workerSrc: string } }).GlobalWorkerOptions.workerSrc = pdfWorker;

  const arrayBuffer = await file.arrayBuffer();
  const pdf: PDFDocumentProxy = await (pdfjs as any).getDocument({ data: arrayBuffer }).promise;
  const worker = await initWorker(['eng', ...(options.languages ?? [])], options.onProgress);

  const pages: string[] = [];
  for (let i = 1; i <= pdf.numPages; i += 1) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = new OffscreenCanvas(viewport.width, viewport.height);
    const context = canvas.getContext('2d');
    if (!context) continue;
    const renderTask = page.render({ canvasContext: context as any, viewport });
    await renderTask.promise;
    const blob = await canvas.convertToBlob({ type: 'image/png' });
    const result = await pool.enqueue(() => worker.recognize(blob));
    pages.push(result.data.text);
  }

  await worker.terminate();

  const mergedText = scrubPhi(pages.join('\n'));
  return parseTableText(mergedText);
};

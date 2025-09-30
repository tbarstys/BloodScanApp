import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { recognize } from './workerPool';
import { preprocessCanvas } from './preprocess';

GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export const parsePdf = async (file: File, languages: string[] = ['eng']): Promise<string> => {
  const buffer = await file.arrayBuffer();
  const pdf: PDFDocumentProxy = await getDocument({ data: buffer }).promise;
  let combinedText = '';
  for (let pageIndex = 1; pageIndex <= pdf.numPages; pageIndex += 1) {
    const page = await pdf.getPage(pageIndex);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) continue;
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: context, viewport }).promise;
    const processed = preprocessCanvas(canvas);
    const pageText = await recognize(processed, languages);
    combinedText += `\n${pageText}`;
  }
  return combinedText.trim();
};

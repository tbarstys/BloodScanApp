import { createWorker } from 'tesseract.js';
import { PHIScrubber } from '@/lib/security/phi-scrubber';

export type ImageExtractionResult = {
  text: string;
  confidence: number;
};

async function loadImage(data: ArrayBuffer): Promise<HTMLCanvasElement> {
  const blob = new Blob([data]);
  const bitmap = await createImageBitmap(blob);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas context unavailable');
  context.drawImage(bitmap, 0, 0);
  return canvas;
}

export async function extractTextFromImage(buffer: ArrayBuffer, locale: 'en' | 'de' | 'lt' = 'en') {
  const canvas = await loadImage(buffer);
  const worker = await createWorker({ logger: () => undefined });
  await worker.load();
  await worker.loadLanguage(locale);
  await worker.initialize(locale);
  try {
    const { data } = await worker.recognize(canvas);
    return {
      text: PHIScrubber.mask(data.text),
      confidence: data.confidence
    } satisfies ImageExtractionResult;
  } finally {
    await worker.terminate();
  }
}

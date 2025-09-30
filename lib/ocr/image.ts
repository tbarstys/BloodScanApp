import { createWorker } from 'tesseract.js';
import { parseTableText } from '../parse/table';
import { scrubPhi } from '../security/phi';
import { WorkerPool } from './workers/pool';

export interface ImageExtractionOptions {
  languages?: string[];
  onProgress?: (progress: number) => void;
  stripExif?: boolean;
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

const applyPreprocessing = async (imageBitmap: ImageBitmap) => {
  const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
  const context = canvas.getContext('2d');
  if (!context) return canvas;
  context.drawImage(imageBitmap, 0, 0);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    const binary = avg > 200 ? 255 : avg < 55 ? 0 : avg;
    data[i] = data[i + 1] = data[i + 2] = binary;
  }
  context.putImageData(imageData, 0, 0);
  return canvas;
};

export const extractFromImage = async (file: File, options: ImageExtractionOptions = {}) => {
  if (file.size > 15 * 1024 * 1024) {
    throw new Error('File size exceeds 15MB limit.');
  }

  const arrayBuffer = await file.arrayBuffer();
  const blob = new Blob([arrayBuffer]);
  const imageBitmap = await createImageBitmap(blob, { imageOrientation: 'from-image' });
  const processedCanvas = await applyPreprocessing(imageBitmap);

  const worker = await initWorker(['eng', ...(options.languages ?? [])], options.onProgress);
  const result = await pool.enqueue(async () => {
    const preppedBlob = await processedCanvas.convertToBlob({ type: 'image/png' });
    return worker.recognize(preppedBlob);
  });
  await worker.terminate();

  const text = scrubPhi(result.data.text ?? '');
  return parseTableText(text);
};

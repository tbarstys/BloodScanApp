import { preprocessCanvas, correctSkew } from './preprocess';
import { recognize } from './workerPool';

const readImage = (file: File): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = reject;
    image.src = url;
  });

export const parseImage = async (file: File, languages: string[] = ['eng']): Promise<string> => {
  if (file.size > 15 * 1024 * 1024) {
    throw new Error('Images must be under 15 MB.');
  }
  const image = await readImage(file);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Unable to create canvas context.');
  }
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);
  const processed = preprocessCanvas(correctSkew(canvas));
  return recognize(processed, languages);
};

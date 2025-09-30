export const preprocessCanvas = (canvas: HTMLCanvasElement): HTMLCanvasElement => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    const value = avg > 200 ? 255 : avg < 55 ? 0 : avg;
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas;
};

export const correctSkew = (canvas: HTMLCanvasElement): HTMLCanvasElement => {
  // Placeholder for deskew; in production integrate OpenCV.js Hough transform.
  return canvas;
};

"use client";

import { createWorker } from "tesseract.js";
import { extractTable } from "@/lib/parse/table";
import { parseAnalytes } from "@/lib/parse/analytes";
import { type LabRecord } from "@/lib/types";
import { redactSensitive } from "@/lib/security/redact";

async function preprocessImage(file: File | Blob): Promise<HTMLCanvasElement> {
  const imageBitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  if (!ctx) return canvas;
  ctx.drawImage(imageBitmap, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
    const value = avg > 180 ? 255 : 0;
    imageData.data[i] = value;
    imageData.data[i + 1] = value;
    imageData.data[i + 2] = value;
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

export async function processImageFiles(file: File | Blob): Promise<LabRecord[]> {
  const canvas = await preprocessImage(file);
  const worker = await createWorker({ logger: () => undefined });
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const {
    data: { text }
  } = await worker.recognize(canvas);
  await worker.terminate();
  const table = extractTable(redactSensitive(text));
  const fileName = file instanceof File ? file.name : "camera";
  return parseAnalytes(table, { fileName });
}

"use client";

import { createWorker } from "tesseract.js";
import { extractTable } from "@/lib/parse/table";
import { parseAnalytes } from "@/lib/parse/analytes";
import { type LabRecord } from "@/lib/types";
import { redactSensitive } from "@/lib/security/redact";

export async function processPdfFiles(file: File): Promise<LabRecord[]> {
  const pdfjs = await import("pdfjs-dist/build/pdf");
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjs.GlobalWorkerOptions.workerSrc ?? "/pdf.worker.min.js";
  const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  const worker = await createWorker({
    logger: () => undefined
  });
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const results: LabRecord[] = [];

  for (let pageIndex = 1; pageIndex <= pdf.numPages; pageIndex++) {
    const page = await pdf.getPage(pageIndex);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    if (!context) continue;
    const renderContext = { canvasContext: context, viewport };
    await page.render(renderContext).promise;
    const {
      data: { text }
    } = await worker.recognize(canvas);
    const cleaned = redactSensitive(text);
    const table = extractTable(cleaned);
    const parsed = parseAnalytes(table, { fileName: file.name, page: pageIndex });
    results.push(...parsed);
  }

  await worker.terminate();
  return results;
}

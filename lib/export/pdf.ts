import { PDFDocument, StandardFonts } from 'pdf-lib';

interface PdfExportInput {
  title: string;
  disclaimer: string;
  rows: { analyte: string; value: string; unit: string; flag?: string }[];
}

export const createPdfSummary = async ({ title, disclaimer, rows }: PdfExportInput) => {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.setTitle(title);
  const page = pdfDoc.addPage([595.28, 841.89]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const { width } = page.getSize();
  let y = 780;
  page.drawText(title, { x: 40, y, size: 18, font });
  y -= 30;
  page.drawText(disclaimer, { x: 40, y, size: 10, font, maxWidth: width - 80, lineHeight: 12 });
  y -= 60;
  rows.forEach((row) => {
    const line = `${row.analyte}: ${row.value} ${row.unit}${row.flag ? ` (${row.flag})` : ''}`;
    page.drawText(line, { x: 40, y, size: 12, font });
    y -= 18;
  });
  const timestamp = new Date().toISOString();
  page.drawText(`Generated: ${timestamp}`, { x: 40, y: 60, size: 9, font });
  page.drawText('Not medical advice', { x: width - 180, y: 60, size: 9, font });
  const bytes = await pdfDoc.save();
  return new Blob([bytes], { type: 'application/pdf' });
};

export type ExportPayload = {
  analytes: Array<{
    name: string;
    value: number;
    unit: string;
    reference: string;
    message: string;
  }>;
  generatedAt: string;
};

export async function createSummaryPdf(_payload: ExportPayload): Promise<Blob> {
  const content = `LabLens Summary\nGenerated: ${new Date().toISOString()}`;
  return new Blob([content], { type: 'application/pdf' });
}

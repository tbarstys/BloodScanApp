export const exportSummaryPdf = async (html: string) => {
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `lablens-summary-${Date.now()}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
};

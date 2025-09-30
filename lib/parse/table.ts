export type TableExtraction = {
  rows: string[][];
};

export function extractTable(text: string): TableExtraction {
  const sanitized = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const rows = sanitized
    .map((line) => line.split(/\s{2,}/).map((cell) => cell.trim()).filter(Boolean))
    .filter((row) => row.length >= 2);
  return { rows };
}

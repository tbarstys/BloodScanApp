export const parseNumber = (value: string): number => {
  const normalized = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '');
  const parsed = Number.parseFloat(normalized);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid numeric value: ${value}`);
  }
  return parsed;
};

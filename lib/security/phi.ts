const patterns: RegExp[] = [
  /\b\d{2}[./-]\d{2}[./-]\d{4}\b/g, // dates
  /\b(?:MRN|ID)[:\s]*[A-Z0-9-]{4,}\b/gi,
  /\b[A-Z][a-z]+\s[A-Z][a-z]+\b/g, // simple name heuristic
];

export const scrubPhi = (text: string): string => {
  let result = text;
  for (const pattern of patterns) {
    result = result.replace(pattern, '[redacted]');
  }
  return result;
};

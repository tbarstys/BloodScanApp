const patterns = [
  /\b\d{2}\/\d{2}\/\d{4}\b/g, // dates
  /\b(?:[A-Z][a-z]+\s){1,3}[A-Z][a-z]+\b/g, // names
  /\b\d{2,4}-\d{2,4}-\d{3,4}\b/g // MRN like patterns
];

export function redactSensitive(text: string): string {
  return patterns.reduce((acc, pattern) => acc.replace(pattern, "███"), text);
}

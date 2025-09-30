const patterns = [
  /\b([A-Z][a-z]+\s[A-Z][a-z]+)\b/g, // names
  /\b\d{2}[/.-]\d{2}[/.-]\d{4}\b/g, // dates
  /\b\d{3}-\d{2}-\d{4}\b/g, // SSN like
  /MRN\s*[:#]?\s*\d+/gi
];

export const scrubPhi = (text: string) => {
  return patterns.reduce((acc, regex) => acc.replace(regex, '[redacted]'), text);
};

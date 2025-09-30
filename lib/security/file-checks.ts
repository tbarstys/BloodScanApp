export function validateFile(file: File): { valid: boolean; reason?: string } {
  const maxSize = 15 * 1024 * 1024;
  if (file.size > maxSize) return { valid: false, reason: "File too large" };
  const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
  if (!allowedTypes.includes(file.type)) return { valid: false, reason: "Unsupported file type" };
  return { valid: true };
}

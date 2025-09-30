const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];

export const validateFile = (file: File) => {
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Unsupported file type');
  }
  if (file.size > 15 * 1024 * 1024) {
    throw new Error('File too large');
  }
  return true;
};

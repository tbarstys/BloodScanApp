'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { clsx } from 'clsx';

interface DropzoneProps {
  onFiles: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onFiles, accept, maxSize = 15 * 1024 * 1024 }) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejected) => {
      if (rejected.length > 0) {
        setError('Some files were rejected. Please verify type and size.');
        return;
      }
      const valid = acceptedFiles.filter((file) => file.size <= maxSize);
      if (valid.length !== acceptedFiles.length) {
        setError('Some files exceeded the size limit of 15 MB.');
      }
      setError(null);
      onFiles(valid);
    },
    [onFiles, maxSize]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: true,
  });

  return (
    <div>
      <div
        {...getRootProps({
          className: clsx(
            'flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-white text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            isDragActive && 'border-primary bg-blue-50'
          ),
        })}
      >
        <input {...getInputProps()} aria-label="Upload lab results" />
        <p className="text-sm text-slate-600">Drop PDFs, images, or CSV exports here</p>
        <p className="text-xs text-slate-400">All processing happens locally unless you opt in.</p>
      </div>
      {error ? <p className="mt-2 text-xs text-danger">{error}</p> : null}
    </div>
  );
};

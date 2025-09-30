'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

interface DropzoneProps {
  onFiles: (files: File[]) => void;
  accept?: string;
}

export const Dropzone = ({ onFiles, accept }: DropzoneProps) => {
  const { t } = useTranslation();
  const onDrop = useCallback(
    (files: File[]) => {
      onFiles(files.slice(0, 5));
    },
    [onFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: 5,
    maxSize: 15 * 1024 * 1024
  });

  return (
    <div
      {...getRootProps({
        className: `flex h-40 flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 text-center text-sm transition-colors ${
          isDragActive ? 'border-brand bg-brand/5 text-brand' : 'border-slate-300 bg-white text-slate-600'
        }`
      })}
    >
      <input {...getInputProps()} aria-label={t('upload.inputLabel')} />
      <p>{t('upload.dropzonePrimary')}</p>
      <p className="mt-2 text-xs text-slate-400">{t('upload.dropzoneSecondary')}</p>
    </div>
  );
};

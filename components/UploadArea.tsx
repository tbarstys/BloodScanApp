'use client';

import { useState } from 'react';
import { Dropzone } from './Dropzone';
import { CameraCapture } from './CameraCapture';
import { processFiles } from '../lib/ocr/process';
import { useAnalysisStore } from '../lib/store';

export const UploadArea: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setCurrent = useAnalysisStore((state) => state.setCurrent);

  const handleFiles = async (files: File[]) => {
    setIsProcessing(true);
    setError(null);
    try {
      const result = await processFiles(files);
      setCurrent(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to process files');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Dropzone
        onFiles={handleFiles}
        accept={{
          'application/pdf': ['.pdf'],
          'image/*': ['.jpg', '.jpeg', '.png'],
        }}
      />
      <CameraCapture onCapture={(file) => handleFiles([file])} />
      {isProcessing ? <p className="text-sm text-slate-600">Processing locally…</p> : null}
      {error ? <p className="text-xs text-danger">{error}</p> : null}
    </div>
  );
};

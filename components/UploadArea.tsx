'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { PHIScrubber } from '@/lib/security/phi-scrubber';
import { parseFileAsArrayBuffer } from '@/lib/parse/file';
import { Dropzone } from '@/components/dropzone';

const ACCEPTED_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png'
];

export type UploadAreaProps = {
  onFiles: (files: File[]) => void;
};

export function UploadArea({ onFiles }: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList);

    const invalid = files.find((file) => !ACCEPTED_TYPES.includes(file.type) || file.size > 15 * 1024 * 1024);
    if (invalid) {
      setError('Only PDF or image files up to 15MB are allowed.');
      return;
    }

    await Promise.all(
      files.map(async (file) => {
        await parseFileAsArrayBuffer(file);
        PHIScrubber.assertSafeName(file.name);
      })
    );

    setError(null);
    onFiles(files);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    void handleFiles(event.target.files);
    event.target.value = '';
  };

  return (
    <div className="flex flex-col gap-2">
      <Dropzone onDrop={(files) => void handleFiles(files)}>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-3 text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <FiUploadCloud className="h-10 w-10 text-brand" aria-hidden="true" />
          <div>
            <p className="text-base font-semibold">Drop or select files</p>
            <p className="text-sm text-slate-500">PDF (multi-page), JPG, PNG, or use camera</p>
          </div>
        </button>
      </Dropzone>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        multiple
        hidden
        onChange={onChange}
      />
      {error ? <p className="text-sm text-red-600" role="alert">{error}</p> : null}
    </div>
  );
}

'use client';

import { PropsWithChildren, useCallback, useState, DragEvent } from 'react';

export type DropzoneProps = PropsWithChildren<{
  onDrop: (files: FileList | null) => void;
}>;

export function Dropzone({ onDrop, children }: DropzoneProps) {
  const [isActive, setIsActive] = useState(false);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsActive(false);
      onDrop(event.dataTransfer.files);
    },
    [onDrop]
  );

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setIsActive(true);
      }}
      onDragLeave={() => setIsActive(false)}
      onDrop={handleDrop}
      className={`rounded-2xl border-2 border-dashed px-6 py-12 text-center transition ${
        isActive ? 'border-brand bg-brand/5' : 'border-slate-200 bg-white'
      }`}
    >
      {children}
    </div>
  );
}

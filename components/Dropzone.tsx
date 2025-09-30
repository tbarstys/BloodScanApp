"use client";

import { useCallback, useRef, useState } from "react";
import { clsx } from "clsx";

export type DropzoneProps = {
  onFiles: (files: File[]) => void;
  accept?: string;
};

export function Dropzone({ onFiles, accept = "application/pdf,image/*" }: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isOver, setIsOver] = useState(false);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsOver(false);
      const files = Array.from(event.dataTransfer.files ?? []);
      if (files.length > 0) onFiles(files);
    },
    [onFiles]
  );

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          inputRef.current?.click();
        }
      }}
      className={clsx(
        "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center",
        isOver ? "border-sky-500 bg-sky-50" : "border-slate-300"
      )}
      role="button"
      tabIndex={0}
    >
      <p className="text-sm font-medium">Drop PDF or images here</p>
      <p className="text-xs text-slate-500">Files remain on your device unless you opt in to cloud features.</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={(event) => {
          const files = Array.from(event.target.files ?? []);
          if (files.length > 0) onFiles(files);
        }}
      />
    </div>
  );
}

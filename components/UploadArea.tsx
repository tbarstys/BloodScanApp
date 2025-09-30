"use client";

import { useState } from "react";
import { Dropzone } from "@/components/Dropzone";
import { CameraCapture } from "@/components/CameraCapture";
import { processPdfFiles } from "@/lib/ocr/pdf";
import { processImageFiles } from "@/lib/ocr/image";
import { useLabStore } from "@/lib/store/labs";
import { validateFile } from "@/lib/security/file-checks";

export function UploadArea() {
  const [status, setStatus] = useState<string>("");
  const addRecords = useLabStore((state) => state.addRecords);

  const handleFiles = async (files: File[]) => {
    setStatus("Processing...");
    try {
      const results: Array<Awaited<ReturnType<typeof processPdfFiles>>> = [];
      for (const file of files) {
        const validation = validateFile(file);
        if (!validation.valid) {
          setStatus(validation.reason ?? "Unsupported file");
          continue;
        }
        if (file.type === "application/pdf") {
          results.push(await processPdfFiles(file));
        } else {
          results.push(await processImageFiles(file));
        }
      }
      const flattened = results.flat();
      addRecords(flattened);
      setStatus(`Processed ${flattened.length} entries`);
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong while processing. No files were saved.");
    }
  };

  const handleCapture = async (blob: Blob) => {
    const file = new File([blob], `capture-${Date.now()}.jpg`, { type: "image/jpeg" });
    await handleFiles([file]);
  };

  return (
    <div className="space-y-6">
      <Dropzone onFiles={handleFiles} />
      <CameraCapture onCapture={handleCapture} />
      {status ? <p className="text-sm text-slate-600" role="status">{status}</p> : null}
    </div>
  );
}

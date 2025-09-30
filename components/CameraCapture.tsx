"use client";

import { useEffect, useRef, useState } from "react";

export type CameraCaptureProps = {
  onCapture: (blob: Blob) => void;
};

export function CameraCapture({ onCapture }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError((err as Error).message);
      }
    }
    void init();
    return () => {
      const tracks = (videoRef.current?.srcObject as MediaStream | null)?.getTracks();
      tracks?.forEach((track) => track.stop());
    };
  }, []);

  const handleCapture = async () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0);
    const blob = await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b as Blob), "image/jpeg", 0.95));
    onCapture(blob);
  };

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-2xl border border-slate-300">
        <video
          ref={videoRef}
          className="h-64 w-full bg-black object-cover"
          autoPlay
          playsInline
          aria-label="Live camera preview"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-full w-full border border-white/60" aria-hidden="true" />
        </div>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="button"
        onClick={handleCapture}
        className="w-full rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white"
      >
        Capture
      </button>
    </div>
  );
}

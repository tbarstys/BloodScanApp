'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FiCamera } from 'react-icons/fi';

type CameraCaptureProps = {
  onCapture: (file: File) => void;
};

export function CameraCapture({ onCapture }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const constraints: MediaStreamConstraints = {
      video: { facingMode: 'environment' }
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          void videoRef.current.play();
        }
      })
      .catch(() => setError('Camera access denied.'));

    return () => {
      if (videoRef.current?.srcObject instanceof MediaStream) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isActive]);

  const capture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
      onCapture(file);
    }, 'image/jpeg', 0.92);
  }, [onCapture]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-semibold text-slate-900">Camera capture</p>
          <p className="text-xs text-slate-600">Align document within grid. Avoid glare.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsActive((prev) => !prev)}
          className="rounded-full border border-brand px-3 py-1 text-xs font-semibold text-brand"
        >
          {isActive ? 'Stop' : 'Start'}
        </button>
      </div>
      <div className="mt-4 aspect-[3/4] overflow-hidden rounded-xl border border-slate-200 bg-black/40">
        {isActive ? (
          <div className="relative h-full w-full">
            <video ref={videoRef} className="h-full w-full object-cover" aria-label="Live camera feed" />
            <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3 gap-px border-2 border-white/60">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="border border-white/20" />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            <FiCamera className="h-10 w-10" aria-hidden="true" />
          </div>
        )}
      </div>
      {isActive ? (
        <button
          type="button"
          onClick={capture}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <FiCamera aria-hidden />
          Capture photo
        </button>
      ) : null}
      <canvas ref={canvasRef} className="hidden" />
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

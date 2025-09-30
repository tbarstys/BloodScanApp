'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CameraCaptureProps {
  onCapture: (files: File[]) => void;
}

export const CameraCapture = ({ onCapture }: CameraCaptureProps) => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let activeStream: MediaStream | null = null;
    const enableStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        activeStream = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError(t('camera.permissionError'));
      }
    };

    void enableStream();

    return () => {
      activeStream?.getTracks().forEach((track) => track.stop());
    };
  }, [t]);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
        onCapture([file]);
      }
    }, 'image/jpeg', 0.95);
  };

  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-black">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="h-full w-full object-cover"
          aria-label={t('camera.previewLabel')}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[80%] w-[80%] border-2 border-white/60">
            <div className="absolute inset-x-0 top-4 text-center text-xs text-white/90">
              {t('camera.alignmentTip')}
            </div>
          </div>
        </div>
      </div>
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
      <button
        type="button"
        onClick={handleCapture}
        className="w-full rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white"
      >
        {t('camera.captureButton')}
      </button>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

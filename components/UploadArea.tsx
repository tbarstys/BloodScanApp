'use client';

import { useState } from 'react';
import { Dropzone } from './Dropzone';
import { CameraCapture } from './CameraCapture';
import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';
import { useLabStore } from '../lib/store/StoreProvider';
import { validateFile } from '../lib/security/files';

interface UploadAreaProps {
  onInput?: (files: File[]) => void;
}

export const UploadArea = ({ onInput }: UploadAreaProps) => {
  const { t } = useTranslation();
  const setFiles = useLabStore((state) => state.setFiles);
  const [activeTab, setActiveTab] = useState<'upload' | 'camera' | 'manual'>('upload');

  const handleFiles = (files: File[]) => {
    const validated = files.filter((file) => {
      try {
        validateFile(file);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    });
    setFiles(validated);
    onInput?.(validated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2" role="tablist" aria-label={t('upload.tabLabel')}>
        {[
          { key: 'upload', label: t('upload.tabs.upload') },
          { key: 'camera', label: t('upload.tabs.camera') },
          { key: 'manual', label: t('upload.tabs.manual') }
        ].map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            type="button"
            className={clsx(
              'flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-colors',
              activeTab === tab.key ? 'bg-brand text-white' : 'bg-slate-200 text-slate-700'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === 'upload' ? <Dropzone onFiles={handleFiles} accept=".pdf,image/*" /> : null}
      {activeTab === 'camera' ? <CameraCapture onCapture={handleFiles} /> : null}
      {activeTab === 'manual' ? (
        <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
          <p>{t('upload.manualPrompt')}</p>
          <button
            type="button"
            className="rounded-full border border-brand px-3 py-2 text-xs font-semibold text-brand"
          >
            {t('upload.openManualForm')}
          </button>
        </div>
      ) : null}
    </div>
  );
};

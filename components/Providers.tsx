'use client';

import { useEffect } from 'react';
import { I18nProvider } from '../lib/i18n/I18nProvider';
import { StoreProvider } from '../lib/store/StoreProvider';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if ('virtualKeyboard' in navigator) {
      // @ts-expect-error virtualKeyboard is experimental
      navigator.virtualKeyboard.overlaysContent = true;
    }
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <StoreProvider>
        <I18nProvider>{children}</I18nProvider>
        <Toaster richColors position="top-center" expand={false} />
      </StoreProvider>
    </ThemeProvider>
  );
};

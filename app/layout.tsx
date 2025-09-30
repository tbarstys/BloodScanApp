import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { I18nProvider } from '@/components/i18n-provider';
import { SafetyBanner } from '@/components/safety-banner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LabLens',
  description:
    'LabLens keeps your lab data private while helping you understand values with safe, accessible explanations.',
  applicationName: 'LabLens',
  metadataBase: new URL('https://lablens.local'),
  robots: {
    index: false,
    follow: false
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-50`}>
        <I18nProvider>
          <div className="flex min-h-screen flex-col">
            <SafetyBanner />
            {children}
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}

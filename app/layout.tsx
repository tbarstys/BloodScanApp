import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '../lib/i18n/provider';
import { AppShell } from './shell';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  title: 'LabLens',
  description:
    'LabLens ingests lab reports privately and offers friendly, non-diagnostic explanations.',
  metadataBase: new URL('https://lablens.local'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="min-h-full">
      <body className={`${roboto.className} min-h-screen bg-slate-50`}>
        <I18nProvider>
          <AppShell>{children}</AppShell>
        </I18nProvider>
      </body>
    </html>
  );
}

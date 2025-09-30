import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '../components/Providers';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { MobileShell } from '../components/MobileShell';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'LabLens',
  description: 'Local-first lab report companion with safe guidance',
  robots: {
    index: false
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900`}>
        <Providers>
          <DisclaimerBanner />
          <MobileShell>{children}</MobileShell>
        </Providers>
      </body>
    </html>
  );
}

'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AppShell } from '@/components/app-shell';

export default function RoutesLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <AppShell activePath={pathname}>{children}</AppShell>;
}

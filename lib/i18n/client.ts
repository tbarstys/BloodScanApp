'use client';

import { useRouter } from 'next/navigation';

export const setLocale = (locale: string, pathname: string) => {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  url.pathname = pathname;
  url.searchParams.set('locale', locale);
  window.location.assign(url);
};

export const useLocaleRouter = () => {
  const router = useRouter();
  return router;
};

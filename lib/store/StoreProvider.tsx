'use client';

import { ReactNode, createContext, useContext, useRef } from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface LabState {
  files: File[];
  setFiles: (files: File[]) => void;
}

type LabStore = ReturnType<typeof createLabStore>;

const createLabStore = () =>
  create<LabState>()(
    devtools((set) => ({
      files: [],
      setFiles: (files) => set({ files })
    }))
  );

const StoreContext = createContext<LabStore | null>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<LabStore>();
  if (!storeRef.current) {
    storeRef.current = createLabStore();
  }
  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
};

export const useLabStore = <T,>(
  selector: (state: LabState) => T = (state) => state as unknown as T
) => {
  const store = useContext(StoreContext);
  if (!store) throw new Error('useLabStore must be used within StoreProvider');
  return store(selector);
};

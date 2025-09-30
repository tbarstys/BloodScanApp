"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type LabRecord } from "@/lib/types";

interface LabState {
  records: LabRecord[];
  addRecords: (records: LabRecord[]) => void;
  clear: () => void;
}

export const useLabStore = create<LabState>()(
  persist(
    (set) => ({
      records: [],
      addRecords: (records) =>
        set((state) => ({ records: [...state.records, ...records].slice(-200) })),
      clear: () => set({ records: [] })
    }),
    {
      name: "lablens-records"
    }
  )
);

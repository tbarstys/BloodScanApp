import { create } from 'zustand';
import type { ParsedAnalyte, AnalysisResult } from './types';

interface AnalysisState {
  analyses: AnalysisResult[];
  current?: AnalysisResult;
  setCurrent: (result: AnalysisResult) => void;
  saveAnalysis: (result: AnalysisResult) => void;
  compare: (firstId: string, secondId: string) => { deltas: Array<{ key: string; delta: number; trend: 'up' | 'down' | 'flat' }>; } | undefined;
}

export const useAnalysisStore = create<AnalysisState>((set, get) => ({
  analyses: [],
  current: undefined,
  setCurrent: (result) => set({ current: result }),
  saveAnalysis: (result) =>
    set((state) => ({
      analyses: [...state.analyses.filter((entry) => entry.id !== result.id), result],
      current: result,
    })),
  compare: (firstId, secondId) => {
    const { analyses } = get();
    const first = analyses.find((a) => a.id === firstId);
    const second = analyses.find((a) => a.id === secondId);
    if (!first || !second) return undefined;
    const deltas = second.analytes
      .map((analyte) => {
        const prior = first.analytes.find((item) => item.key === analyte.key);
        if (!prior) return undefined;
        const delta = analyte.value.normalized - prior.value.normalized;
        const trend = delta > 0.05 ? 'up' : delta < -0.05 ? 'down' : 'flat';
        return { key: analyte.key, delta, trend };
      })
      .filter((value): value is { key: string; delta: number; trend: 'up' | 'down' | 'flat' } => Boolean(value));
    return { deltas };
  },
}));

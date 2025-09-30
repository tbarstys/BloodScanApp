import { nanoid } from 'nanoid';
import { parseNumber } from './number';
import { AnalysisResult } from '../types';

export const buildManualAnalysis = ({ analyte, value, unit }: { analyte: string; value: string; unit: string }): AnalysisResult => {
  const numericValue = parseNumber(value);
  return {
    id: nanoid(),
    createdAt: new Date().toISOString(),
    context: { locale: 'en', units: 'us' },
    notes: 'Manual entry',
    analytes: [
      {
        key: analyte.toLowerCase(),
        label: analyte,
        value: { raw: numericValue, normalized: numericValue, unit },
        flags: [],
        source: { page: 0 },
        confidence: 1,
      },
    ],
  };
};

export interface ParsedField {
  text: string;
  confidence: number;
}

export interface ParsedAnalyte {
  key: string;
  label: string;
  value: {
    raw: number;
    normalized: number;
    unit: string;
  };
  referenceRange?: {
    low: number;
    high: number;
  };
  flags: Array<{
    severity: 'critical' | 'flag-high' | 'flag-low' | 'info';
    message: string;
  }>;
  source: {
    page: number;
    coordinates?: [number, number, number, number];
  };
  confidence: number;
}

export interface AnalysisContext {
  sex?: 'male' | 'female';
  age?: number;
  locale: string;
  units: 'si' | 'us';
}

export interface AnalysisResult {
  id: string;
  createdAt: string;
  analytes: ParsedAnalyte[];
  context: AnalysisContext;
  notes?: string;
}

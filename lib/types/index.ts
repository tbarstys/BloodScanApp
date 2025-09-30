export type ReferenceRange = {
  low: number;
  high: number;
  unit: string;
  severity?: "flag-low" | "flag-high" | "critical";
};

export type LabRecord = {
  id: string;
  analyte: string;
  value: number;
  unit: string;
  normalizedValue?: number;
  normalizedUnit?: string;
  reference?: ReferenceRange;
  source?: {
    fileName: string;
    page?: number;
    confidence?: number;
  };
  status?: "low" | "normal" | "high" | "critical";
  advice?: string;
};

export type LabPanel = {
  panel: string;
  analytes: LabRecord[];
};

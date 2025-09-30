export interface RuleMessage {
  en: string;
  de: string;
  lt: string;
}

export interface RuleLogic {
  if: string;
  severity: 'info' | 'flag-low' | 'flag-high' | 'critical';
  message: RuleMessage;
}

export interface RuleAnalyte {
  key: string;
  synonyms: string[];
  unit: string;
  ref_range: Record<string, [number, number]>;
  logic: RuleLogic[];
}

export interface RulePanel {
  panel: string;
  locale_notes: RuleMessage;
  analytes: RuleAnalyte[];
}

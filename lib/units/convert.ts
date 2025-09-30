const conversionTable = {
  glucose: {
    'mg/dL': {
      system: 'us',
      si: { factor: 1 / 18, unit: 'mmol/L' },
    },
    'mmol/L': {
      system: 'si',
      us: { factor: 18, unit: 'mg/dL' },
    },
  },
  cholesterol: {
    'mg/dL': {
      system: 'us',
      si: { factor: 1 / 38.67, unit: 'mmol/L' },
    },
    'mmol/L': {
      system: 'si',
      us: { factor: 38.67, unit: 'mg/dL' },
    },
  },
  triglycerides: {
    'mg/dL': {
      system: 'us',
      si: { factor: 1 / 88.57, unit: 'mmol/L' },
    },
    'mmol/L': {
      system: 'si',
      us: { factor: 88.57, unit: 'mg/dL' },
    },
  },
  hemoglobin: {
    'g/dL': {
      system: 'us',
      si: { factor: 10, unit: 'g/L' },
    },
    'g/L': {
      system: 'si',
      us: { factor: 0.1, unit: 'g/dL' },
    },
  },
  wbc: {
    '10^3/uL': {
      system: 'us',
      si: { factor: 1, unit: '10^9/L' },
    },
    '10^9/L': {
      system: 'si',
      us: { factor: 1, unit: '10^3/uL' },
    },
  },
  platelets: {
    '10^3/uL': {
      system: 'us',
      si: { factor: 1, unit: '10^9/L' },
    },
    '10^9/L': {
      system: 'si',
      us: { factor: 1, unit: '10^3/uL' },
    },
  },
} as const;

type TargetSystem = 'us' | 'si';

type ConvertOptions = {
  value: number;
  unit: string;
  analyteKey?: string;
  targetSystem: TargetSystem;
};

const roundValue = (value: number) => {
  if (value === 0) return 0;
  const magnitude = Math.pow(10, Math.max(0, 2 - Math.floor(Math.log10(Math.abs(value)))));
  return Math.round(value * magnitude) / magnitude;
};

export const convertValue = ({ value, unit, analyteKey, targetSystem }: ConvertOptions): { value: number; unit: string } => {
  const key = analyteKey ?? unit.toLowerCase();
  const conversions = conversionTable[key as keyof typeof conversionTable];
  if (!conversions) {
    return { value: roundValue(value), unit };
  }
  const entry = conversions[unit as keyof typeof conversions];
  if (!entry) {
    return { value: roundValue(value), unit };
  }
  const target = (entry as any)[targetSystem];
  if (!target) {
    return { value: roundValue(value), unit };
  }
  return {
    value: roundValue(value * target.factor),
    unit: target.unit,
  };
};

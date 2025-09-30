const conversionMap: Record<string, { si: { factor: number; unit: string }; us: { factor: number; unit: string } }> = {
  glucose: {
    si: { factor: 1 / 18, unit: 'mmol/L' },
    us: { factor: 18, unit: 'mg/dL' }
  },
  cholesterol: {
    si: { factor: 1 / 38.67, unit: 'mmol/L' },
    us: { factor: 38.67, unit: 'mg/dL' }
  },
  triglycerides: {
    si: { factor: 1 / 88.57, unit: 'mmol/L' },
    us: { factor: 88.57, unit: 'mg/dL' }
  },
  hemoglobin: {
    si: { factor: 10, unit: 'g/L' },
    us: { factor: 0.1, unit: 'g/dL' }
  },
  'white blood cells': {
    si: { factor: 1, unit: '10^9/L' },
    us: { factor: 1, unit: '10^3/µL' }
  },
  platelets: {
    si: { factor: 1, unit: '10^9/L' },
    us: { factor: 1, unit: '10^3/µL' }
  }
};

const toKey = (analyte: string) => analyte.toLowerCase();

export const convertValue = (
  analyte: string,
  value: number,
  unit: string,
  targetSystem: 'si' | 'us'
) => {
  const key = toKey(analyte);
  const conversion = conversionMap[key];
  if (!conversion) {
    return { value, unit };
  }
  const config = conversion[targetSystem];
  if (unit.toLowerCase() === config.unit.toLowerCase()) {
    return { value, unit };
  }
  const converted = Number((value * config.factor).toPrecision(3));
  return { value: converted, unit: config.unit };
};

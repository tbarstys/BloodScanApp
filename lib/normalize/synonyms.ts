const synonymMap: Record<string, string> = {
  hb: 'Hemoglobin',
  hgb: 'Hemoglobin',
  haemoglobin: 'Hemoglobin',
  wbc: 'White Blood Cells',
  rbc: 'Red Blood Cells',
  glu: 'Glucose',
  glucose: 'Glucose',
  ldlcholesterol: 'LDL Cholesterol',
  hdlcholesterol: 'HDL Cholesterol',
  tsh: 'TSH'
};

export const mapSynonym = (input: string) => {
  const key = input.replace(/[^a-zA-Z]/g, '').toLowerCase();
  return synonymMap[key] ?? input;
};

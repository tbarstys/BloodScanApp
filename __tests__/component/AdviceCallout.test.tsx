import { render, screen } from '@testing-library/react';
import { AdviceCallout } from '../../components/AdviceCallout';
import type { ParsedAnalyte } from '../../lib/types';

test('renders advice callout when flags present', () => {
  const analyte = {
    key: 'hemoglobin',
    label: 'Hemoglobin',
    value: { raw: 6.8, normalized: 6.8, unit: 'g/dL' },
    referenceRange: { low: 12, high: 15.5 },
    flags: [
      {
        severity: 'critical',
        message: 'Severely low hemoglobin. Please discuss with your clinician promptly.',
      },
    ],
    source: { page: 0 },
    confidence: 0.9,
  } satisfies ParsedAnalyte;

  render(<AdviceCallout analyte={analyte} />);
  expect(screen.getByText(/Severely low hemoglobin/)).toBeInTheDocument();
});

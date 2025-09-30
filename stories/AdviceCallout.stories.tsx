import type { Meta, StoryObj } from '@storybook/react';
import { AdviceCallout } from '../components/AdviceCallout';

const meta: Meta<typeof AdviceCallout> = {
  title: 'LabLens/AdviceCallout',
  component: AdviceCallout,
};

export default meta;

type Story = StoryObj<typeof AdviceCallout>;

export const Critical: Story = {
  args: {
    analyte: {
      key: 'hemoglobin',
      label: 'Hemoglobin',
      value: { raw: 6.2, normalized: 6.2, unit: 'g/dL' },
      referenceRange: { low: 12, high: 15.5 },
      flags: [
        {
          severity: 'critical',
          message: 'Severely low hemoglobin. Please discuss with your clinician promptly.',
        },
      ],
      source: { page: 0 },
      confidence: 0.88,
    },
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { ResultCard } from '../components/ResultCard';

const meta: Meta<typeof ResultCard> = {
  title: 'LabLens/ResultCard',
  component: ResultCard,
};

export default meta;

type Story = StoryObj<typeof ResultCard>;

export const Default: Story = {
  args: {
    analyte: {
      key: 'hemoglobin',
      label: 'Hemoglobin',
      value: { raw: 12.3, normalized: 12.3, unit: 'g/dL' },
      referenceRange: { low: 12, high: 15.5 },
      flags: [
        {
          severity: 'flag-low',
          message: 'Below the typical range for hemoglobin.',
        },
      ],
      source: { page: 0 },
      confidence: 0.92,
    },
  },
};

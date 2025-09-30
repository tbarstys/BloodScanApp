import type { Meta, StoryObj } from '@storybook/react';
import { ResultCard } from '../components/ResultCard';

const meta: Meta<typeof ResultCard> = {
  title: 'Components/ResultCard',
  component: ResultCard,
  parameters: { layout: 'padded' }
};

export default meta;

type Story = StoryObj<typeof ResultCard>;

export const Normal: Story = {
  args: {
    analyte: 'Hemoglobin',
    value: '13.4',
    unit: 'g/dL',
    referenceRange: '12.0 – 15.5 g/dL',
    status: 'normal',
    advice: [
      {
        message: 'Within the typical range. Keep following clinician guidance.',
        severity: 'info'
      }
    ]
  }
};

import type { Meta, StoryObj } from '@storybook/react';
import { AdviceCallout } from '../components/AdviceCallout';

const meta: Meta<typeof AdviceCallout> = {
  title: 'Components/AdviceCallout',
  component: AdviceCallout,
  parameters: { layout: 'centered' }
};

export default meta;

type Story = StoryObj<typeof AdviceCallout>;

export const Critical: Story = {
  args: {
    analyte: 'Hemoglobin',
    message: 'Severely low hemoglobin. Please discuss with your clinician urgently.',
    severity: 'critical',
    sourceValue: '6.8 g/dL'
  }
};

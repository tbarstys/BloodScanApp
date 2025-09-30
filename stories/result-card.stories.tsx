import type { Meta, StoryObj } from '@storybook/react';
import { ResultCard } from '@/components/result-card';

const meta: Meta<typeof ResultCard> = {
  title: 'Components/ResultCard',
  component: ResultCard
};

export default meta;

type Story = StoryObj<typeof ResultCard>;

export const Default: Story = {
  args: {
    result: {
      id: '1',
      analyte: 'Hemoglobin',
      value: 13.8,
      unit: 'g/dL',
      reference: '12.0 - 15.5',
      status: 'ok',
      source: 'cbc_1.pdf'
    }
  }
};

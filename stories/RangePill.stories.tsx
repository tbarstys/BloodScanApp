import type { Meta, StoryObj } from '@storybook/react';
import { RangePill } from '../components/RangePill';

const meta: Meta<typeof RangePill> = {
  title: 'LabLens/RangePill',
  component: RangePill,
};

export default meta;

type Story = StoryObj<typeof RangePill>;

export const WithinRange: Story = {
  args: {
    value: 14.2,
    unit: 'g/dL',
    referenceRange: { low: 12, high: 16 },
  },
};

export const OutOfRange: Story = {
  args: {
    value: 9.1,
    unit: 'g/dL',
    referenceRange: { low: 12, high: 16 },
  },
};

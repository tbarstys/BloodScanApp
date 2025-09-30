import type { Meta, StoryObj } from '@storybook/react';
import { RangePill } from '@/components/range-pill';

const meta: Meta<typeof RangePill> = {
  title: 'Components/RangePill',
  component: RangePill,
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['ok', 'flag-low', 'flag-high', 'critical']
    }
  }
};

export default meta;

type Story = StoryObj<typeof RangePill>;

export const Default: Story = {
  args: {
    reference: '12.0 - 15.5',
    status: 'ok'
  }
};

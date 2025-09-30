import type { Meta, StoryObj } from '@storybook/react';
import { RangePill } from '../components/RangePill';

const meta: Meta<typeof RangePill> = {
  title: 'Components/RangePill',
  component: RangePill,
  parameters: { layout: 'centered' }
};

export default meta;

type Story = StoryObj<typeof RangePill>;

export const High: Story = {
  args: {
    value: '190',
    unit: 'mg/dL',
    status: 'high'
  }
};

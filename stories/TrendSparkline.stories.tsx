import type { Meta, StoryObj } from '@storybook/react';
import { TrendSparkline } from '../components/TrendSparkline';

const meta: Meta<typeof TrendSparkline> = {
  title: 'Components/TrendSparkline',
  component: TrendSparkline,
  parameters: { layout: 'padded' }
};

export default meta;

type Story = StoryObj<typeof TrendSparkline>;

export const Improving: Story = {
  args: {
    labels: ['Jan', 'Mar', 'Jun', 'Sep'],
    values: [140, 132, 120, 110],
    status: 'normal'
  }
};

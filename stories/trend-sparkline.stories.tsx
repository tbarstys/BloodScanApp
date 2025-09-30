import type { Meta, StoryObj } from '@storybook/react';
import { TrendSparkline } from '@/components/trend-sparkline';

const meta: Meta<typeof TrendSparkline> = {
  title: 'Components/TrendSparkline',
  component: TrendSparkline
};

export default meta;

type Story = StoryObj<typeof TrendSparkline>;

export const Default: Story = {
  args: {
    values: [12.4, 13.1, 13.6, 13.2, 12.9]
  }
};

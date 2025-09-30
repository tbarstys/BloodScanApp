import type { Meta, StoryObj } from '@storybook/react';
import { TrendSparkline } from '../components/TrendSparkline';

const meta: Meta<typeof TrendSparkline> = {
  title: 'LabLens/TrendSparkline',
  component: TrendSparkline,
};

export default meta;

type Story = StoryObj<typeof TrendSparkline>;

export const Example: Story = {
  args: {
    points: [4.1, 4.5, 5.2, 5.0, 5.5],
  },
};

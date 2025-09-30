import type { Meta, StoryObj } from '@storybook/react';
import { AdviceCallout } from '@/components/advice-callout';

const meta: Meta<typeof AdviceCallout> = {
  title: 'Components/AdviceCallout',
  component: AdviceCallout,
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['ok', 'flag-low', 'flag-high', 'critical']
    }
  }
};

export default meta;

type Story = StoryObj<typeof AdviceCallout>;

export const Default: Story = {
  args: {
    status: 'ok',
    reference: '12.0 - 15.5'
  }
};

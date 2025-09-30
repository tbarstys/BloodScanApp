import type { Meta, StoryObj } from "@storybook/react";
import { TrendSparkline } from "./TrendSparkline";

const meta: Meta<typeof TrendSparkline> = {
  title: "Components/TrendSparkline",
  component: TrendSparkline,
  args: {
    values: [10, 12, 11, 14, 13],
    labels: ["Jan", "Feb", "Mar", "Apr", "May"]
  }
};

export default meta;

type Story = StoryObj<typeof TrendSparkline>;

export const Default: Story = {};

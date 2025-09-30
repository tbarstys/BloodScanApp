import type { Meta, StoryObj } from "@storybook/react";
import { RangePill } from "./RangePill";

const meta: Meta<typeof RangePill> = {
  title: "Components/RangePill",
  component: RangePill,
  args: {
    label: "Hemoglobin",
    value: "13.4 g/dL",
    status: "normal"
  }
};

export default meta;

type Story = StoryObj<typeof RangePill>;

export const Normal: Story = {};
export const Low: Story = {
  args: {
    status: "low"
  }
};
export const High: Story = {
  args: {
    status: "high"
  }
};

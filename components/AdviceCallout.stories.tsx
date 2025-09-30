import type { Meta, StoryObj } from "@storybook/react";
import { AdviceCallout } from "./AdviceCallout";

const meta: Meta<typeof AdviceCallout> = {
  title: "Components/AdviceCallout",
  component: AdviceCallout,
  args: {
    tone: "info",
    title: "General guidance",
    message: "Review your latest labs with your care team."
  }
};

export default meta;

type Story = StoryObj<typeof AdviceCallout>;

export const Info: Story = {};
export const Critical: Story = {
  args: {
    tone: "critical",
    title: "Urgent",
    message: "Discuss this result with your clinician."
  }
};

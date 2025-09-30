import type { Meta, StoryObj } from "@storybook/react";
import { ResultCard } from "./ResultCard";

const meta: Meta<typeof ResultCard> = {
  title: "Components/ResultCard",
  component: ResultCard,
  args: {
    analyte: "Hemoglobin",
    value: "13.4",
    unit: "g/dL",
    status: "normal",
    reference: "12.0 – 16.0 g/dL",
    message: "Within reference range."
  }
};

export default meta;

type Story = StoryObj<typeof ResultCard>;

export const Default: Story = {};
export const Critical: Story = {
  args: {
    status: "critical",
    message: "Severely low hemoglobin. Discuss with your clinician.",
    value: "6.8"
  }
};

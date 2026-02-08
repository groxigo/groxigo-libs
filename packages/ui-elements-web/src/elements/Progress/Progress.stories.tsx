import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "UI Elements/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: { control: "number" },
    min: { control: "number" },
    max: { control: "number" },
    size: {
      control: "select",
      options: ["xs", "sm", "md"],
    },
    variant: {
      control: "select",
      options: ["determinate", "indeterminate"],
    },
    hasStripe: { control: "boolean" },
    isAnimated: { control: "boolean" },
    showValue: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
    size: "md",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  render: () => (
    <div style={{ width: "400px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <Progress value={60} size="xs" />
      <Progress value={60} size="sm" />
      <Progress value={60} size="md" />
    </div>
  ),
};

export const WithStripe: Story = {
  render: () => (
    <div style={{ width: "400px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <Progress value={70} hasStripe size="md" />
      <Progress value={70} hasStripe isAnimated size="md" />
    </div>
  ),
};

export const Indeterminate: Story = {
  args: {
    variant: "indeterminate",
    size: "md",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithValue: Story = {
  render: () => (
    <div style={{ width: "400px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <Progress value={25} showValue size="md" />
      <Progress value={50} showValue size="md" />
      <Progress value={75} showValue size="md" />
      <Progress value={100} showValue size="md" />
    </div>
  ),
};

export const DifferentValues: Story = {
  render: () => (
    <div style={{ width: "400px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <Progress value={0} size="md" />
      <Progress value={25} size="md" />
      <Progress value={50} size="md" />
      <Progress value={75} size="md" />
      <Progress value={100} size="md" />
    </div>
  ),
};

export const WithCustomFormat: Story = {
  args: {
    value: 45,
    showValue: true,
    formatValue: (value: number, max: number) => `${value}/${max}`,
    size: "md",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithCustomRange: Story = {
  args: {
    value: 500,
    min: 0,
    max: 1000,
    showValue: true,
    size: "md",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

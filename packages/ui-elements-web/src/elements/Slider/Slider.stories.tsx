import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "UI Elements/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    showValue: { control: "boolean" },
    showTooltip: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 50,
  },
};

export const WithLabel: Story = {
  args: {
    label: "Volume",
    defaultValue: 70,
  },
};

export const WithValue: Story = {
  args: {
    label: "Brightness",
    defaultValue: 60,
    showValue: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "300px" }}>
      <Slider size="sm" label="Small" defaultValue={30} showValue />
      <Slider size="md" label="Medium" defaultValue={50} showValue />
      <Slider size="lg" label="Large" defaultValue={70} showValue />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: "Volume",
    defaultValue: 50,
    disabled: true,
    showValue: true,
  },
};

export const WithTooltip: Story = {
  args: {
    label: "Volume",
    defaultValue: 50,
    showTooltip: true,
    tooltipVisibility: "focus",
  },
};

export const CustomRange: Story = {
  args: {
    label: "Price Range",
    min: 0,
    max: 1000,
    step: 10,
    defaultValue: 500,
    showValue: true,
    formatValue: (value) => `$${value}`,
  },
};

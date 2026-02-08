import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "UI Elements/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    labelPosition: {
      control: "select",
      options: ["left", "right"],
    },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Enable notifications",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Switch size="sm" label="Small switch" />
      <Switch size="md" label="Medium switch" />
      <Switch size="lg" label="Large switch" />
    </div>
  ),
};

export const LabelLeft: Story = {
  args: {
    label: "Enable dark mode",
    labelPosition: "left",
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Switch disabled label="Disabled unchecked" />
      <Switch disabled checked label="Disabled checked" />
    </div>
  ),
};

export const WithHelperText: Story = {
  args: {
    label: "Email notifications",
    helperText: "Receive email updates about your account activity",
  },
};

export const WithError: Story = {
  args: {
    label: "Accept terms",
    error: "You must accept the terms to continue",
  },
};

export const FormExample: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
      <Switch
        label="Push notifications"
        helperText="Receive push notifications on your device"
        defaultChecked
      />
      <Switch
        label="Email newsletters"
        helperText="Get weekly updates via email"
      />
      <Switch
        label="SMS alerts"
        helperText="Receive important alerts via SMS"
        disabled
      />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "UI Elements/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    colorScheme: {
      control: "select",
      options: ["primary", "secondary", "accent", "success", "warning", "error"],
    },
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

export const Checked: Story = {
  args: {
    label: "Checked checkbox",
    checked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="md" label="Medium checkbox" />
      <Checkbox size="lg" label="Large checkbox" />
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Checkbox colorScheme="primary" label="Primary" checked />
      <Checkbox colorScheme="secondary" label="Secondary" checked />
      <Checkbox colorScheme="accent" label="Accent" checked />
      <Checkbox colorScheme="success" label="Success" checked />
      <Checkbox colorScheme="warning" label="Warning" checked />
      <Checkbox colorScheme="error" label="Error" checked />
    </div>
  ),
};

export const Indeterminate: Story = {
  args: {
    label: "Select all items",
    indeterminate: true,
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Checkbox disabled label="Disabled unchecked" />
      <Checkbox disabled checked label="Disabled checked" />
    </div>
  ),
};

export const WithDescription: Story = {
  args: {
    label: "Marketing emails",
    description: "Receive emails about new products and promotions",
  },
};

export const WithError: Story = {
  args: {
    label: "I agree to the terms",
    error: "You must accept the terms to continue",
  },
};

export const CheckboxGroup: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <p style={{ fontWeight: 500, marginBottom: "8px" }}>Select your interests:</p>
      <Checkbox label="Technology" />
      <Checkbox label="Design" />
      <Checkbox label="Business" />
      <Checkbox label="Marketing" />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
      <Checkbox
        label="Remember me"
        description="Keep me signed in on this device"
      />
      <Checkbox
        label="Subscribe to newsletter"
        description="Get weekly updates on new features"
        checked
      />
      <Checkbox
        label="Accept terms of service"
        error="Required field"
      />
    </div>
  ),
};

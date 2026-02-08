import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "UI Elements/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "subtle", "soft"],
    },
    colorScheme: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "error", "info", "neutral"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    rounded: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="subtle">Subtle</Badge>
      <Badge variant="soft">Soft</Badge>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <Badge colorScheme="primary">Primary</Badge>
      <Badge colorScheme="secondary">Secondary</Badge>
      <Badge colorScheme="success">Success</Badge>
      <Badge colorScheme="warning">Warning</Badge>
      <Badge colorScheme="error">Error</Badge>
      <Badge colorScheme="info">Info</Badge>
      <Badge colorScheme="neutral">Neutral</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Badge size="xs">XS</Badge>
      <Badge size="sm">SM</Badge>
      <Badge size="md">MD</Badge>
      <Badge size="lg">LG</Badge>
    </div>
  ),
};

export const Rounded: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px" }}>
      <Badge rounded>Rounded</Badge>
      <Badge rounded colorScheme="success">Success</Badge>
      <Badge rounded colorScheme="error">Error</Badge>
    </div>
  ),
};

export const SolidColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <Badge variant="solid" colorScheme="primary">Primary</Badge>
      <Badge variant="solid" colorScheme="secondary">Secondary</Badge>
      <Badge variant="solid" colorScheme="success">Success</Badge>
      <Badge variant="solid" colorScheme="warning">Warning</Badge>
      <Badge variant="solid" colorScheme="error">Error</Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <Badge variant="soft" colorScheme="success" rounded>Active</Badge>
      <Badge variant="soft" colorScheme="warning" rounded>Pending</Badge>
      <Badge variant="soft" colorScheme="error" rounded>Inactive</Badge>
      <Badge variant="soft" colorScheme="info" rounded>Draft</Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px" }}>
      <Badge
        colorScheme="success"
        leftIcon={
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        }
      >
        Verified
      </Badge>
      <Badge
        colorScheme="error"
        leftIcon={
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        }
      >
        Rejected
      </Badge>
    </div>
  ),
};

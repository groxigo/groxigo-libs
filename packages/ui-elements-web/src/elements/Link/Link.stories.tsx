import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "UI Elements/Link",
  component: Link,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
    },
    colorScheme: {
      control: "select",
      options: ["default", "primary", "muted"],
    },
    underline: {
      control: "select",
      options: [true, false, "always", "hover", "none"],
    },
    disabled: { control: "boolean" },
    isExternal: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "#",
    children: "Click here to learn more",
    size: "md",
    colorScheme: "primary",
  },
};

export const External: Story = {
  args: {
    href: "https://example.com",
    children: "Visit external website",
    isExternal: true,
    size: "md",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Link href="#" size="sm">Small link text</Link>
      <Link href="#" size="md">Medium link text</Link>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Link href="#" colorScheme="default">Default color scheme</Link>
      <Link href="#" colorScheme="primary">Primary color scheme</Link>
      <Link href="#" colorScheme="muted">Muted color scheme</Link>
    </div>
  ),
};

export const UnderlineVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Link href="#" underline="always">Always underlined</Link>
      <Link href="#" underline="hover">Underline on hover</Link>
      <Link href="#" underline="none">No underline</Link>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    href: "#",
    children: "Disabled link",
    disabled: true,
    size: "md",
  },
};

export const WithExternalIcon: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Link href="https://example.com" isExternal>
        External link with icon
      </Link>
      <Link href="https://github.com" isExternal colorScheme="primary">
        Visit GitHub
      </Link>
    </div>
  ),
};

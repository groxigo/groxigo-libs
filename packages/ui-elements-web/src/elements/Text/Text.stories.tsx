import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "UI Elements/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "body", "bodyLarge", "bodySmall", "caption", "label", "overline"],
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"],
    },
    color: { control: "color" },
    truncate: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is a text component",
    variant: "body",
  },
};

export const Headings: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="h5">Heading 5</Text>
      <Text variant="h6">Heading 6</Text>
    </div>
  ),
};

export const BodyVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Text variant="bodyLarge">Body Large - Lorem ipsum dolor sit amet</Text>
      <Text variant="body">Body - Lorem ipsum dolor sit amet</Text>
      <Text variant="bodySmall">Body Small - Lorem ipsum dolor sit amet</Text>
      <Text variant="caption">Caption - Lorem ipsum dolor sit amet</Text>
      <Text variant="overline">OVERLINE TEXT</Text>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Text>Default color</Text>
      <Text color="var(--brand-primary, #2563eb)">Primary color</Text>
      <Text color="var(--color-orange-500, #f97316)">Secondary color</Text>
      <Text color="var(--status-success, #16a34a)">Success color</Text>
      <Text color="var(--status-warning, #eab308)">Warning color</Text>
      <Text color="var(--status-error, #dc2626)">Error color</Text>
      <Text color="var(--text-muted, #6b7280)">Muted color</Text>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "300px" }}>
      <Text align="left">Left aligned text</Text>
      <Text align="center">Center aligned text</Text>
      <Text align="right">Right aligned text</Text>
    </div>
  ),
};

export const Truncated: Story = {
  args: {
    children: "This is a very long text that should be truncated when it overflows the container",
    truncate: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "200px" }}>
        <Story />
      </div>
    ),
  ],
};

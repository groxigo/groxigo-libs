import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";
import { Text } from "../Text";
import { Button } from "../Button";

const meta: Meta<typeof Card> = {
  title: "UI Elements/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["elevated", "outline", "filled", "unstyled"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    pressable: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <Text variant="h4">Card Title</Text>
        <Text color="var(--text-muted, #6b7280)">This is some card content.</Text>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <div style={{ width: "200px" }}>
        <Card variant="elevated">
          <Text variant="h5">Elevated</Text>
          <Text variant="bodySmall" color="var(--text-muted, #6b7280)">With shadow</Text>
        </Card>
      </div>
      <div style={{ width: "200px" }}>
        <Card variant="outline">
          <Text variant="h5">Outline</Text>
          <Text variant="bodySmall" color="var(--text-muted, #6b7280)">With border</Text>
        </Card>
      </div>
      <div style={{ width: "200px" }}>
        <Card variant="filled">
          <Text variant="h5">Filled</Text>
          <Text variant="bodySmall" color="var(--text-muted, #6b7280)">With background</Text>
        </Card>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-start" }}>
      <div style={{ width: "180px" }}>
        <Card size="sm">
          <Text variant="h6">Small</Text>
          <Text variant="caption">Less padding</Text>
        </Card>
      </div>
      <div style={{ width: "200px" }}>
        <Card size="md">
          <Text variant="h5">Medium</Text>
          <Text variant="bodySmall">Default padding</Text>
        </Card>
      </div>
      <div style={{ width: "220px" }}>
        <Card size="lg">
          <Text variant="h4">Large</Text>
          <Text>More padding</Text>
        </Card>
      </div>
    </div>
  ),
};

export const WithSections: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <Card>
        <CardHeader>
          <Text variant="h5">Card Header</Text>
        </CardHeader>
        <CardBody>
          <Text color="var(--text-muted, #6b7280)">
            This is the card body content. It can contain any elements you need.
          </Text>
        </CardBody>
        <CardFooter>
          <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button size="sm">Save</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const Pressable: Story = {
  args: {
    pressable: true,
    onPress: () => alert("Card clicked!"),
    children: (
      <div>
        <Text variant="h5">Clickable Card</Text>
        <Text variant="bodySmall" color="var(--text-muted, #6b7280)">Click me to trigger an action</Text>
      </div>
    ),
  },
};

export const ProductCard: Story = {
  render: () => (
    <div style={{ width: "280px" }}>
      <Card>
        <div style={{
          height: "160px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          margin: "-16px -16px 16px -16px",
          borderRadius: "8px 8px 0 0"
        }} />
        <Text variant="caption" color="var(--text-muted, #6b7280)">Electronics</Text>
        <Text variant="h5">Wireless Headphones</Text>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
          <Text variant="h4" color="var(--brand-primary, #2563eb)">$129.99</Text>
          <Button size="sm">Add to Cart</Button>
        </div>
      </Card>
    </div>
  ),
};

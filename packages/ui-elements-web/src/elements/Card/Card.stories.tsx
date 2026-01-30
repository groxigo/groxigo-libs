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
        <Text colorScheme="muted">This is some card content.</Text>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Card variant="elevated" style={{ width: "200px" }}>
        <Text variant="h5">Elevated</Text>
        <Text variant="bodySmall" colorScheme="muted">With shadow</Text>
      </Card>
      <Card variant="outline" style={{ width: "200px" }}>
        <Text variant="h5">Outline</Text>
        <Text variant="bodySmall" colorScheme="muted">With border</Text>
      </Card>
      <Card variant="filled" style={{ width: "200px" }}>
        <Text variant="h5">Filled</Text>
        <Text variant="bodySmall" colorScheme="muted">With background</Text>
      </Card>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-start" }}>
      <Card size="sm" style={{ width: "180px" }}>
        <Text variant="h6">Small</Text>
        <Text variant="caption">Less padding</Text>
      </Card>
      <Card size="md" style={{ width: "200px" }}>
        <Text variant="h5">Medium</Text>
        <Text variant="bodySmall">Default padding</Text>
      </Card>
      <Card size="lg" style={{ width: "220px" }}>
        <Text variant="h4">Large</Text>
        <Text>More padding</Text>
      </Card>
    </div>
  ),
};

export const WithSections: Story = {
  render: () => (
    <Card style={{ width: "320px" }}>
      <CardHeader>
        <Text variant="h5">Card Header</Text>
      </CardHeader>
      <CardBody>
        <Text colorScheme="muted">
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
  ),
};

export const Pressable: Story = {
  args: {
    pressable: true,
    onPress: () => alert("Card clicked!"),
    children: (
      <div>
        <Text variant="h5">Clickable Card</Text>
        <Text variant="bodySmall" colorScheme="muted">Click me to trigger an action</Text>
      </div>
    ),
  },
};

export const ProductCard: Story = {
  render: () => (
    <Card style={{ width: "280px" }}>
      <div style={{
        height: "160px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        margin: "-16px -16px 16px -16px",
        borderRadius: "8px 8px 0 0"
      }} />
      <Text variant="caption" colorScheme="muted">Electronics</Text>
      <Text variant="h5">Wireless Headphones</Text>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
        <Text variant="h4" colorScheme="primary">$129.99</Text>
        <Button size="sm">Add to Cart</Button>
      </div>
    </Card>
  ),
};

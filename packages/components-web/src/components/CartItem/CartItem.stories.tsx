import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { CartItem } from "./CartItem";

const meta: Meta<typeof CartItem> = {
  title: "Components/CartItem",
  component: CartItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    currency: {
      control: "select",
      options: ["USD", "EUR", "GBP", "INR"],
    },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItem = {
  id: "1",
  title: "Organic Avocados (3 pack)",
  imageUrl: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400",
  price: 5.99,
  quantity: 2,
};

export const Default: Story = {
  args: {
    ...sampleItem,
    onQuantityChange: action("onQuantityChange"),
    onRemove: action("onRemove"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithDescription: Story = {
  args: {
    ...sampleItem,
    description: "Organic, Fresh from California",
    onQuantityChange: action("onQuantityChange"),
    onRemove: action("onRemove"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    ...sampleItem,
    disabled: true,
    onQuantityChange: action("onQuantityChange"),
    onRemove: action("onRemove"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithoutRemove: Story = {
  args: {
    ...sampleItem,
    onQuantityChange: action("onQuantityChange"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const DifferentCurrency: Story = {
  args: {
    ...sampleItem,
    currency: "EUR",
    onQuantityChange: action("onQuantityChange"),
    onRemove: action("onRemove"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const CartList: Story = {
  render: () => (
    <div style={{ width: "400px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <CartItem
        id="1"
        title="Organic Avocados (3 pack)"
        imageUrl="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400"
        price={5.99}
        quantity={2}
        onQuantityChange={action("onQuantityChange-1")}
        onRemove={action("onRemove-1")}
      />
      <CartItem
        id="2"
        title="Fresh Organic Bananas"
        imageUrl="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400"
        description="1 bunch"
        price={2.99}
        quantity={1}
        onQuantityChange={action("onQuantityChange-2")}
        onRemove={action("onRemove-2")}
      />
      <CartItem
        id="3"
        title="Organic Whole Milk"
        imageUrl="https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400"
        description="1 gallon"
        price={6.99}
        quantity={1}
        onQuantityChange={action("onQuantityChange-3")}
        onRemove={action("onRemove-3")}
      />
    </div>
  ),
};

export const ReadOnly: Story = {
  args: {
    ...sampleItem,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

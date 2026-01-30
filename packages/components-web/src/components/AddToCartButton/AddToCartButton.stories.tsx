import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AddToCartButton } from "./AddToCartButton";

const meta: Meta<typeof AddToCartButton> = {
  title: "Components/AddToCartButton",
  component: AddToCartButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    inCart: { control: "boolean" },
    loading: { control: "boolean" },
    outOfStock: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: action("onClick"),
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <AddToCartButton size="sm" onClick={action("onClick-sm")} />
      <AddToCartButton size="md" onClick={action("onClick-md")} />
      <AddToCartButton size="lg" onClick={action("onClick-lg")} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <AddToCartButton variant="solid" onClick={action("onClick-solid")} />
      <AddToCartButton variant="outline" onClick={action("onClick-outline")} />
      <AddToCartButton variant="ghost" onClick={action("onClick-ghost")} />
    </div>
  ),
};

export const InCart: Story = {
  args: {
    inCart: true,
    quantity: 2,
    onClick: action("onClick"),
  },
};

export const InCartWithQuantity: Story = {
  args: {
    inCart: true,
    quantity: 5,
    onClick: action("onClick"),
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    onClick: action("onClick"),
  },
};

export const OutOfStock: Story = {
  args: {
    outOfStock: true,
    onClick: action("onClick"),
  },
};

export const CustomLabel: Story = {
  args: {
    label: "Buy Now",
    onClick: action("onClick"),
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    onClick: action("onClick"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "300px" }}>
        <Story />
      </div>
    ),
  ],
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "200px" }}>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#6b7280" }}>Default</p>
        <AddToCartButton fullWidth onClick={action("onClick-default")} />
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#6b7280" }}>Loading</p>
        <AddToCartButton fullWidth loading onClick={action("onClick-loading")} />
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#6b7280" }}>In Cart</p>
        <AddToCartButton fullWidth inCart quantity={2} onClick={action("onClick-inCart")} />
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#6b7280" }}>Out of Stock</p>
        <AddToCartButton fullWidth outOfStock onClick={action("onClick-outOfStock")} />
      </div>
    </div>
  ),
};

export const InProductCard: Story = {
  render: () => (
    <div
      style={{
        width: "220px",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300"
        alt="Product"
        style={{ width: "100%", height: "160px", objectFit: "cover" }}
      />
      <div style={{ padding: "16px" }}>
        <h3 style={{ fontWeight: 500, marginBottom: "4px" }}>Fresh Avocados</h3>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "8px" }}>3 count</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <span style={{ fontWeight: 600, color: "#16a34a" }}>$5.99</span>
          <span style={{ fontSize: "14px", color: "#9ca3af", textDecoration: "line-through" }}>
            $7.99
          </span>
        </div>
        <AddToCartButton fullWidth size="sm" onClick={action("onClick")} />
      </div>
    </div>
  ),
};

export const InProductDetail: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <h2 style={{ fontWeight: 600, fontSize: "24px", marginBottom: "8px" }}>
        Organic Avocados (3 pack)
      </h2>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
        <span style={{ fontSize: "28px", fontWeight: 600, color: "#16a34a" }}>$5.99</span>
        <span style={{ color: "#9ca3af", textDecoration: "line-through" }}>$7.99</span>
        <span
          style={{
            padding: "4px 8px",
            background: "#dcfce7",
            color: "#16a34a",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          Save 25%
        </span>
      </div>
      <p style={{ color: "#6b7280", marginBottom: "24px" }}>
        Fresh, ripe avocados sourced from local farms. Perfect for guacamole, salads, or on toast.
      </p>
      <AddToCartButton size="lg" fullWidth onClick={action("onClick")} />
    </div>
  ),
};

export const QuickAdd: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
        width: "600px",
      }}
    >
      {[
        { name: "Bananas", price: 2.99, img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200" },
        { name: "Apples", price: 3.99, img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200" },
        { name: "Oranges", price: 4.49, img: "https://images.unsplash.com/photo-1547514701-42782101795e?w=200" },
      ].map((item, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "12px",
          }}
        >
          <img
            src={item.img}
            alt={item.name}
            style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "6px", marginBottom: "8px" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontWeight: 500, fontSize: "14px" }}>{item.name}</p>
              <p style={{ color: "#16a34a", fontWeight: 600 }}>${item.price}</p>
            </div>
            <AddToCartButton size="sm" variant="outline" label="" onClick={action(`onClick-${item.name}`)} />
          </div>
        </div>
      ))}
    </div>
  ),
};

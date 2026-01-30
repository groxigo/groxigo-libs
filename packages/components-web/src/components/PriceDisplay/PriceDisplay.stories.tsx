import type { Meta, StoryObj } from "@storybook/react";
import { PriceDisplay } from "./PriceDisplay";

const meta: Meta<typeof PriceDisplay> = {
  title: "Components/PriceDisplay",
  component: PriceDisplay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    currency: {
      control: "select",
      options: ["USD", "EUR", "GBP", "INR", "JPY"],
    },
    showCurrency: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    price: 29.99,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#6b7280" }}>Small</p>
        <PriceDisplay price={29.99} size="sm" />
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#6b7280" }}>Medium</p>
        <PriceDisplay price={29.99} size="md" />
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#6b7280" }}>Large</p>
        <PriceDisplay price={29.99} size="lg" />
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#6b7280" }}>Extra Large</p>
        <PriceDisplay price={29.99} size="xl" />
      </div>
    </div>
  ),
};

export const WithDiscount: Story = {
  args: {
    price: 19.99,
    originalPrice: 29.99,
  },
};

export const DiscountSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <PriceDisplay price={19.99} originalPrice={29.99} size="sm" />
      <PriceDisplay price={19.99} originalPrice={29.99} size="md" />
      <PriceDisplay price={19.99} originalPrice={29.99} size="lg" />
      <PriceDisplay price={19.99} originalPrice={29.99} size="xl" />
    </div>
  ),
};

export const DifferentCurrencies: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "60px", fontSize: "12px", color: "#6b7280" }}>USD:</span>
        <PriceDisplay price={29.99} currency="USD" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "60px", fontSize: "12px", color: "#6b7280" }}>EUR:</span>
        <PriceDisplay price={27.99} currency="EUR" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "60px", fontSize: "12px", color: "#6b7280" }}>GBP:</span>
        <PriceDisplay price={24.99} currency="GBP" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "60px", fontSize: "12px", color: "#6b7280" }}>INR:</span>
        <PriceDisplay price={2499} currency="INR" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "60px", fontSize: "12px", color: "#6b7280" }}>JPY:</span>
        <PriceDisplay price={4500} currency="JPY" />
      </div>
    </div>
  ),
};

export const WithoutCurrencySymbol: Story = {
  args: {
    price: 29.99,
    showCurrency: false,
  },
};

export const LargePrice: Story = {
  args: {
    price: 1299.99,
    size: "lg",
  },
};

export const SmallPrice: Story = {
  args: {
    price: 0.99,
    size: "md",
  },
};

export const InProductCard: Story = {
  render: () => (
    <div
      style={{
        width: "200px",
        padding: "16px",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200"
        alt="Product"
        style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "8px" }}
      />
      <p style={{ fontWeight: 500, margin: "12px 0 4px" }}>Organic Avocados</p>
      <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>3 count</p>
      <PriceDisplay price={5.99} originalPrice={7.99} size="md" />
    </div>
  ),
};

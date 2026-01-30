import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { QuantitySelector } from "./QuantitySelector";

const meta: Meta<typeof QuantitySelector> = {
  title: "Components/QuantitySelector",
  component: QuantitySelector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1,
    onChange: action("onChange"),
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#6b7280" }}>Small</p>
        <QuantitySelector size="sm" value={1} onChange={action("onChange-sm")} />
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#6b7280" }}>Medium</p>
        <QuantitySelector size="md" value={1} onChange={action("onChange-md")} />
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#6b7280" }}>Large</p>
        <QuantitySelector size="lg" value={1} onChange={action("onChange-lg")} />
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    value: 1,
    label: "Quantity",
    onChange: action("onChange"),
  },
};

export const WithMax: Story = {
  args: {
    value: 8,
    max: 10,
    onChange: action("onChange"),
  },
};

export const AtMinimum: Story = {
  args: {
    value: 0,
    min: 0,
    onChange: action("onChange"),
  },
};

export const AtMaximum: Story = {
  args: {
    value: 10,
    max: 10,
    onChange: action("onChange"),
  },
};

export const Disabled: Story = {
  args: {
    value: 3,
    disabled: true,
    onChange: action("onChange"),
  },
};

export const WithStep: Story = {
  args: {
    value: 5,
    step: 5,
    max: 25,
    onChange: action("onChange"),
  },
};

export const Interactive: Story = {
  render: () => {
    // Using a simple state demonstration
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
        <p style={{ fontSize: "14px", color: "#6b7280" }}>
          Click the buttons to see the quantity change
        </p>
        <QuantitySelector
          value={3}
          min={1}
          max={10}
          onChange={action("onChange")}
        />
      </div>
    );
  },
};

export const InContext: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "16px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        width: "300px",
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=100"
        alt="Product"
        style={{ width: "60px", height: "60px", borderRadius: "8px", objectFit: "cover" }}
      />
      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: 500, marginBottom: "4px" }}>Avocados</p>
        <p style={{ fontSize: "14px", color: "#6b7280" }}>$5.99</p>
      </div>
      <QuantitySelector size="sm" value={2} onChange={action("onChange")} />
    </div>
  ),
};

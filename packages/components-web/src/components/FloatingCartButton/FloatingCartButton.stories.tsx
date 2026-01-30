import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { FloatingCartButton } from "./FloatingCartButton";

const meta: Meta<typeof FloatingCartButton> = {
  title: "Components/FloatingCartButton",
  component: FloatingCartButton,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: ["bottom-right", "bottom-left", "bottom-center"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    itemCount: 3,
    totalPrice: 24.99,
    onClick: action("onClick"),
  },
  decorators: [
    (Story) => (
      <div style={{ height: "300px", position: "relative", background: "#f9fafb" }}>
        <Story />
      </div>
    ),
  ],
};

export const SingleItem: Story = {
  args: {
    itemCount: 1,
    totalPrice: 5.99,
    onClick: action("onClick"),
  },
  decorators: [
    (Story) => (
      <div style={{ height: "300px", position: "relative", background: "#f9fafb" }}>
        <Story />
      </div>
    ),
  ],
};

export const ManyItems: Story = {
  args: {
    itemCount: 15,
    totalPrice: 149.99,
    onClick: action("onClick"),
  },
  decorators: [
    (Story) => (
      <div style={{ height: "300px", position: "relative", background: "#f9fafb" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithPreviewImage: Story = {
  args: {
    itemCount: 3,
    totalPrice: 24.99,
    previewImage: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=100",
    onClick: action("onClick"),
  },
  decorators: [
    (Story) => (
      <div style={{ height: "300px", position: "relative", background: "#f9fafb" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithoutPrice: Story = {
  args: {
    itemCount: 5,
    onClick: action("onClick"),
  },
  decorators: [
    (Story) => (
      <div style={{ height: "300px", position: "relative", background: "#f9fafb" }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomLabel: Story = {
  args: {
    itemCount: 3,
    totalPrice: 24.99,
    label: "Checkout",
    onClick: action("onClick"),
  },
  decorators: [
    (Story) => (
      <div style={{ height: "300px", position: "relative", background: "#f9fafb" }}>
        <Story />
      </div>
    ),
  ],
};

export const BottomLeft: Story = {
  args: {
    itemCount: 3,
    totalPrice: 24.99,
    position: "bottom-left",
    onClick: action("onClick"),
  },
  decorators: [
    (Story) => (
      <div style={{ height: "300px", position: "relative", background: "#f9fafb" }}>
        <Story />
      </div>
    ),
  ],
};

export const BottomCenter: Story = {
  args: {
    itemCount: 3,
    totalPrice: 24.99,
    position: "bottom-center",
    onClick: action("onClick"),
  },
  decorators: [
    (Story) => (
      <div style={{ height: "300px", position: "relative", background: "#f9fafb" }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomOffset: Story = {
  args: {
    itemCount: 3,
    totalPrice: 24.99,
    bottomOffset: 80,
    onClick: action("onClick"),
  },
  decorators: [
    (Story) => (
      <div style={{ height: "300px", position: "relative", background: "#f9fafb" }}>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60px",
            background: "white",
            borderTop: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6b7280",
          }}
        >
          Bottom Navigation
        </div>
        <Story />
      </div>
    ),
  ],
};

export const Hidden: Story = {
  args: {
    itemCount: 0,
    onClick: action("onClick"),
  },
  decorators: [
    (Story) => (
      <div style={{ height: "300px", position: "relative", background: "#f9fafb" }}>
        <p style={{ padding: "20px", color: "#6b7280" }}>
          The button is hidden because itemCount is 0
        </p>
        <Story />
      </div>
    ),
  ],
};

export const ForceVisible: Story = {
  args: {
    itemCount: 0,
    visible: true,
    label: "Start Shopping",
    onClick: action("onClick"),
  },
  decorators: [
    (Story) => (
      <div style={{ height: "300px", position: "relative", background: "#f9fafb" }}>
        <Story />
      </div>
    ),
  ],
};

export const InPageContext: Story = {
  render: () => (
    <div style={{ height: "600px", position: "relative", background: "#f9fafb" }}>
      {/* Header */}
      <div
        style={{
          padding: "16px",
          background: "white",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <h1 style={{ fontWeight: 600 }}>Groxigo</h1>
      </div>

      {/* Content */}
      <div style={{ padding: "16px" }}>
        <h2 style={{ fontWeight: 500, marginBottom: "16px" }}>Featured Products</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              style={{
                padding: "12px",
                background: "white",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  height: "80px",
                  background: "#dcfce7",
                  borderRadius: "6px",
                  marginBottom: "8px",
                }}
              />
              <p style={{ fontWeight: 500, fontSize: "14px" }}>Product {i}</p>
              <p style={{ color: "#16a34a", fontWeight: 600 }}>$4.99</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      <FloatingCartButton
        itemCount={3}
        totalPrice={14.97}
        previewImage="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=100"
        onClick={action("onClick")}
      />
    </div>
  ),
};

export const MobilePreview: Story = {
  render: () => (
    <div
      style={{
        width: "375px",
        height: "667px",
        border: "8px solid #1f2937",
        borderRadius: "32px",
        overflow: "hidden",
        margin: "0 auto",
        position: "relative",
        background: "#f9fafb",
      }}
    >
      {/* Status bar */}
      <div
        style={{
          height: "44px",
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        9:41
      </div>

      {/* Header */}
      <div
        style={{
          padding: "12px 16px",
          background: "white",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <h1 style={{ fontWeight: 600, fontSize: "18px" }}>Groceries</h1>
      </div>

      {/* Content */}
      <div style={{ padding: "16px", height: "calc(100% - 120px)", overflow: "auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              style={{
                padding: "12px",
                background: "white",
                borderRadius: "12px",
              }}
            >
              <div
                style={{
                  height: "60px",
                  background: "#dcfce7",
                  borderRadius: "8px",
                  marginBottom: "8px",
                }}
              />
              <p style={{ fontWeight: 500, fontSize: "12px" }}>Product {i}</p>
              <p style={{ color: "#16a34a", fontWeight: 600, fontSize: "14px" }}>$4.99</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      <FloatingCartButton
        itemCount={3}
        totalPrice={14.97}
        position="bottom-center"
        bottomOffset={16}
        onClick={action("onClick")}
      />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Rating } from "./Rating";

const meta: Meta<typeof Rating> = {
  title: "Components/Rating",
  component: Rating,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    max: {
      control: { type: "number", min: 1, max: 10 },
    },
    editable: { control: "boolean" },
    showValue: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 4,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "60px", fontSize: "12px", color: "#6b7280" }}>Small:</span>
        <Rating value={4} size="sm" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "60px", fontSize: "12px", color: "#6b7280" }}>Medium:</span>
        <Rating value={4} size="md" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "60px", fontSize: "12px", color: "#6b7280" }}>Large:</span>
        <Rating value={4} size="lg" />
      </div>
    </div>
  ),
};

export const DifferentValues: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Rating value={1} showValue />
      <Rating value={2} showValue />
      <Rating value={3} showValue />
      <Rating value={4} showValue />
      <Rating value={5} showValue />
    </div>
  ),
};

export const HalfStars: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Rating value={1.5} showValue />
      <Rating value={2.5} showValue />
      <Rating value={3.5} showValue />
      <Rating value={4.5} showValue />
    </div>
  ),
};

export const WithValue: Story = {
  args: {
    value: 4.5,
    showValue: true,
  },
};

export const Editable: Story = {
  args: {
    value: 0,
    editable: true,
    onChange: action("onChange"),
  },
};

export const EditableWithValue: Story = {
  args: {
    value: 3,
    editable: true,
    showValue: true,
    onChange: action("onChange"),
  },
};

export const CustomMax: Story = {
  args: {
    value: 7,
    max: 10,
    showValue: true,
  },
};

export const EmptyRating: Story = {
  args: {
    value: 0,
  },
};

export const FullRating: Story = {
  args: {
    value: 5,
    showValue: true,
  },
};

export const InProductCard: Story = {
  render: () => (
    <div
      style={{
        width: "250px",
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
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
        <Rating value={4.5} size="sm" showValue />
        <span style={{ fontSize: "12px", color: "#6b7280" }}>(128 reviews)</span>
      </div>
      <p style={{ fontWeight: 600, color: "#16a34a" }}>$5.99</p>
    </div>
  ),
};

export const InReviewForm: Story = {
  render: () => (
    <div style={{ width: "300px" }}>
      <h3 style={{ marginBottom: "12px", fontWeight: 500 }}>Write a Review</h3>
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>
          Your Rating
        </label>
        <Rating value={0} editable onChange={action("onChange")} size="lg" />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>
          Your Review
        </label>
        <textarea
          placeholder="Share your thoughts..."
          style={{
            width: "100%",
            minHeight: "100px",
            padding: "8px 12px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        />
      </div>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "UI Elements/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "circular", "rectangular", "rounded"],
    },
    animate: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 200,
    height: 20,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Text</p>
        <Skeleton variant="text" width={150} height={16} />
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Circular</p>
        <Skeleton variant="circular" width={60} height={60} />
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Rectangular</p>
        <Skeleton variant="rectangular" width={100} height={60} />
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px" }}>Rounded</p>
        <Skeleton variant="rounded" width={100} height={60} />
      </div>
    </div>
  ),
};

export const TextLines: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "300px" }}>
      <Skeleton variant="text" height={16} width="100%" />
      <Skeleton variant="text" height={16} width="100%" />
      <Skeleton variant="text" height={16} width="80%" />
    </div>
  ),
};

export const Avatar: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Skeleton variant="circular" width={48} height={48} />
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <Skeleton variant="text" width={120} height={16} />
        <Skeleton variant="text" width={80} height={14} />
      </div>
    </div>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <div
      style={{
        width: "280px",
        padding: "16px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <Skeleton variant="rounded" width="100%" height={180} />
      <div style={{ marginTop: "12px" }}>
        <Skeleton variant="text" width="40%" height={12} />
        <Skeleton variant="text" width="80%" height={18} style={{ marginTop: "8px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
          <Skeleton variant="text" width={60} height={24} />
          <Skeleton variant="rounded" width={100} height={36} />
        </div>
      </div>
    </div>
  ),
};

export const ListItem: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "400px" }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Skeleton variant="rounded" width={80} height={80} />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="70%" height={18} />
            <Skeleton variant="text" width="90%" height={14} style={{ marginTop: "8px" }} />
            <Skeleton variant="text" width="40%" height={14} style={{ marginTop: "4px" }} />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const NoAnimation: Story = {
  args: {
    width: 200,
    height: 100,
    variant: "rounded",
    animate: false,
  },
};

export const GridLayout: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
        width: "400px",
      }}
    >
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i}>
          <Skeleton variant="rounded" width="100%" height={100} />
          <Skeleton variant="text" width="80%" height={14} style={{ marginTop: "8px" }} />
        </div>
      ))}
    </div>
  ),
};

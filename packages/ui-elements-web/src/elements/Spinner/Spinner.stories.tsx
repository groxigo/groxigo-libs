import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "UI Elements/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    colorScheme: {
      control: "select",
      options: ["primary", "secondary", "accent", "white"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    colorScheme: "primary",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <Spinner colorScheme="primary" />
      <Spinner colorScheme="secondary" />
      <Spinner colorScheme="accent" />
      <div style={{ background: "#1a1a1a", padding: "16px", borderRadius: "8px" }}>
        <Spinner colorScheme="white" />
      </div>
    </div>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px" }}>
      <Spinner color="#10B981" />
      <Spinner color="#F59E0B" />
      <Spinner color="#EF4444" />
      <Spinner color="#8B5CF6" />
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    label: "Loading data...",
    size: "lg",
  },
};

export const InButton: Story = {
  render: () => (
    <button
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 16px",
        backgroundColor: "#3B82F6",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "wait",
      }}
      disabled
    >
      <Spinner size="sm" colorScheme="white" />
      <span>Processing...</span>
    </button>
  ),
};

export const FullPageLoader: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        padding: "48px",
        background: "#f9fafb",
        borderRadius: "12px",
      }}
    >
      <Spinner size="xl" colorScheme="primary" />
      <p style={{ color: "#6b7280", fontSize: "14px" }}>Loading your content...</p>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "300px",
        height: "200px",
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <Spinner size="lg" />
    </div>
  ),
};

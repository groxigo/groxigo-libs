import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar } from "./SearchBar";

const meta: Meta<typeof SearchBar> = {
  title: "Components/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["outline", "filled"],
    },
    autoFocus: { control: "boolean" },
    showCancel: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Search products...",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "400px" }}>
      <SearchBar size="sm" placeholder="Small search" />
      <SearchBar size="md" placeholder="Medium search" />
      <SearchBar size="lg" placeholder="Large search" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "400px" }}>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#6b7280" }}>Filled (default)</p>
        <SearchBar variant="filled" placeholder="Search..." />
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#6b7280" }}>Outline</p>
        <SearchBar variant="outline" placeholder="Search..." />
      </div>
    </div>
  ),
};

export const WithValue: Story = {
  args: {
    value: "Organic vegetables",
    placeholder: "Search products...",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithCancel: Story = {
  args: {
    placeholder: "Search products...",
    showCancel: true,
    autoFocus: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const AutoFocus: Story = {
  args: {
    placeholder: "Start typing...",
    autoFocus: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithHandlers: Story = {
  args: {
    placeholder: "Search and press Enter...",
    onChangeText: (text) => console.log("Search text:", text),
    onSubmit: (text) => console.log("Submitted:", text),
    onFocus: () => console.log("Focused"),
    onBlur: () => console.log("Blurred"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const InHeader: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "12px 16px",
        background: "white",
        borderBottom: "1px solid #e5e7eb",
        width: "600px",
      }}
    >
      <button style={{ padding: "8px" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div style={{ flex: 1 }}>
        <SearchBar placeholder="Search products..." />
      </div>
      <button style={{ padding: "8px" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </button>
    </div>
  ),
};

export const MobileStyle: Story = {
  render: () => (
    <div
      style={{
        padding: "12px 16px",
        background: "#f9fafb",
        width: "375px",
      }}
    >
      <SearchBar
        variant="outline"
        size="lg"
        placeholder="What are you looking for?"
        showCancel
      />
    </div>
  ),
};

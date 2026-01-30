import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SortSelector } from "./SortSelector";

const meta: Meta<typeof SortSelector> = {
  title: "Components/SortSelector",
  component: SortSelector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const productSortOptions = [
  { id: "relevance", label: "Relevance", value: "relevance" },
  { id: "price-low", label: "Price: Low to High", value: "price_asc" },
  { id: "price-high", label: "Price: High to Low", value: "price_desc" },
  { id: "name-asc", label: "Name: A to Z", value: "name_asc" },
  { id: "name-desc", label: "Name: Z to A", value: "name_desc" },
  { id: "newest", label: "Newest First", value: "created_desc" },
];

const recipeSortOptions = [
  { id: "popular", label: "Most Popular", value: "popular" },
  { id: "rating", label: "Highest Rated", value: "rating_desc" },
  { id: "time-short", label: "Quickest First", value: "time_asc" },
  { id: "time-long", label: "Longest First", value: "time_desc" },
  { id: "newest", label: "Newest First", value: "created_desc" },
];

export const Default: Story = {
  args: {
    options: productSortOptions,
    onChange: action("onChange"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "250px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithSelection: Story = {
  args: {
    options: productSortOptions,
    selectedId: "price-low",
    onChange: action("onChange"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "250px" }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomLabel: Story = {
  args: {
    options: productSortOptions,
    label: "Sort products by",
    onChange: action("onChange"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "250px" }}>
        <Story />
      </div>
    ),
  ],
};

export const RecipeSorting: Story = {
  args: {
    options: recipeSortOptions,
    selectedId: "popular",
    label: "Sort recipes",
    section: "recipes",
    onChange: action("onChange"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "250px" }}>
        <Story />
      </div>
    ),
  ],
};

export const InToolbar: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        background: "#f9fafb",
        borderRadius: "8px",
        width: "600px",
      }}
    >
      <span style={{ fontSize: "14px", color: "#6b7280" }}>
        Showing 156 products
      </span>
      <div style={{ width: "200px" }}>
        <SortSelector
          options={productSortOptions}
          selectedId="relevance"
          onChange={action("onChange")}
        />
      </div>
    </div>
  ),
};

export const WithFilters: Story = {
  render: () => (
    <div style={{ width: "600px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            style={{
              padding: "8px 16px",
              border: "1px solid #e5e7eb",
              borderRadius: "9999px",
              fontSize: "14px",
              background: "white",
            }}
          >
            All
          </button>
          <button
            style={{
              padding: "8px 16px",
              border: "1px solid #16a34a",
              borderRadius: "9999px",
              fontSize: "14px",
              background: "#dcfce7",
              color: "#16a34a",
            }}
          >
            Fruits
          </button>
          <button
            style={{
              padding: "8px 16px",
              border: "1px solid #e5e7eb",
              borderRadius: "9999px",
              fontSize: "14px",
              background: "white",
            }}
          >
            Vegetables
          </button>
        </div>
        <div style={{ width: "180px" }}>
          <SortSelector
            options={productSortOptions}
            selectedId="price-low"
            onChange={action("onChange")}
          />
        </div>
      </div>
      <div
        style={{
          padding: "60px",
          background: "#f9fafb",
          borderRadius: "8px",
          textAlign: "center",
          color: "#6b7280",
        }}
      >
        Product grid would appear here
      </div>
    </div>
  ),
};

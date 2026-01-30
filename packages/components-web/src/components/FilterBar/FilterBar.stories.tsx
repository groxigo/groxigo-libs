import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { FilterBar } from "./FilterBar";

const meta: Meta<typeof FilterBar> = {
  title: "Components/FilterBar",
  component: FilterBar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    multiSelect: { control: "boolean" },
    showCounts: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleFilters = [
  { id: "all", label: "All" },
  { id: "fruits", label: "Fruits" },
  { id: "vegetables", label: "Vegetables" },
  { id: "dairy", label: "Dairy" },
  { id: "meat", label: "Meat" },
  { id: "bakery", label: "Bakery" },
];

const filtersWithCounts = [
  { id: "all", label: "All", count: 156 },
  { id: "fruits", label: "Fruits", count: 42 },
  { id: "vegetables", label: "Vegetables", count: 38 },
  { id: "dairy", label: "Dairy", count: 24 },
  { id: "meat", label: "Meat", count: 31 },
  { id: "bakery", label: "Bakery", count: 21 },
];

export const Default: Story = {
  args: {
    filters: sampleFilters,
    onFiltersChange: action("onFiltersChange"),
  },
};

export const WithSelected: Story = {
  args: {
    filters: sampleFilters,
    selectedFilters: ["fruits"],
    onFiltersChange: action("onFiltersChange"),
  },
};

export const MultiSelect: Story = {
  args: {
    filters: sampleFilters,
    selectedFilters: ["fruits", "vegetables"],
    multiSelect: true,
    onFiltersChange: action("onFiltersChange"),
  },
};

export const SingleSelect: Story = {
  args: {
    filters: sampleFilters,
    selectedFilters: ["fruits"],
    multiSelect: false,
    onFiltersChange: action("onFiltersChange"),
  },
};

export const WithCounts: Story = {
  args: {
    filters: filtersWithCounts,
    showCounts: true,
    onFiltersChange: action("onFiltersChange"),
  },
};

export const WithCountsSelected: Story = {
  args: {
    filters: filtersWithCounts,
    selectedFilters: ["fruits", "vegetables"],
    showCounts: true,
    multiSelect: true,
    onFiltersChange: action("onFiltersChange"),
  },
};

export const ManyFilters: Story = {
  args: {
    filters: [
      { id: "all", label: "All" },
      { id: "fruits", label: "Fruits" },
      { id: "vegetables", label: "Vegetables" },
      { id: "dairy", label: "Dairy" },
      { id: "meat", label: "Meat" },
      { id: "bakery", label: "Bakery" },
      { id: "beverages", label: "Beverages" },
      { id: "snacks", label: "Snacks" },
      { id: "frozen", label: "Frozen" },
      { id: "organic", label: "Organic" },
      { id: "international", label: "International" },
    ],
    onFiltersChange: action("onFiltersChange"),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

export const RecipeFilters: Story = {
  args: {
    filters: [
      { id: "all", label: "All Recipes" },
      { id: "quick", label: "Quick & Easy" },
      { id: "healthy", label: "Healthy" },
      { id: "vegetarian", label: "Vegetarian" },
      { id: "vegan", label: "Vegan" },
      { id: "gluten-free", label: "Gluten Free" },
    ],
    section: "recipes",
    onFiltersChange: action("onFiltersChange"),
  },
};

export const InContext: Story = {
  render: () => (
    <div style={{ maxWidth: "600px" }}>
      <h2 style={{ marginBottom: "16px", fontWeight: 600, fontSize: "18px" }}>
        Browse Products
      </h2>
      <FilterBar
        filters={filtersWithCounts}
        selectedFilters={["fruits"]}
        showCounts
        onFiltersChange={action("onFiltersChange")}
      />
      <div
        style={{
          marginTop: "16px",
          padding: "40px",
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

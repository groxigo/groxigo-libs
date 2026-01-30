import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TabBar } from "./TabBar";

const meta: Meta<typeof TabBar> = {
  title: "Components/TabBar",
  component: TabBar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "underline", "pills"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    scrollable: { control: "boolean" },
    fullWidth: { control: "boolean" },
    section: {
      control: "select",
      options: ["default", "groceries", "recipes"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTabs = [
  { key: "all", label: "All" },
  { key: "groceries", label: "Groceries" },
  { key: "recipes", label: "Recipes" },
  { key: "deals", label: "Deals" },
];

const tabsWithBadges = [
  { key: "all", label: "All" },
  { key: "fruits", label: "Fruits", badge: 42 },
  { key: "vegetables", label: "Vegetables", badge: 38 },
  { key: "dairy", label: "Dairy", badge: 24 },
  { key: "meat", label: "Meat", badge: 15 },
];

const tabsWithIcons = [
  { key: "home", label: "Home", icon: "home" },
  { key: "trending", label: "Trending", icon: "trending-up" },
  { key: "new", label: "New", icon: "star" },
  { key: "favorites", label: "Favorites", icon: "heart" },
];

export const Default: Story = {
  args: {
    items: defaultTabs,
    selectedId: "all",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

export const UnderlineVariant: Story = {
  args: {
    items: defaultTabs,
    selectedId: "groceries",
    variant: "underline",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

export const PillsVariant: Story = {
  args: {
    items: defaultTabs,
    selectedId: "recipes",
    variant: "pills",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "500px" }}>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#6b7280" }}>Small</p>
        <TabBar
          items={defaultTabs}
          selectedId="all"
          size="sm"
          onSelect={action("onSelect-sm")}
        />
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#6b7280" }}>Medium</p>
        <TabBar
          items={defaultTabs}
          selectedId="all"
          size="md"
          onSelect={action("onSelect-md")}
        />
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#6b7280" }}>Large</p>
        <TabBar
          items={defaultTabs}
          selectedId="all"
          size="lg"
          onSelect={action("onSelect-lg")}
        />
      </div>
    </div>
  ),
};

export const WithBadges: Story = {
  args: {
    items: tabsWithBadges,
    selectedId: "fruits",
    variant: "underline",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithIcons: Story = {
  args: {
    items: tabsWithIcons,
    selectedId: "home",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

export const FullWidth: Story = {
  args: {
    items: defaultTabs,
    selectedId: "all",
    fullWidth: true,
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

export const ScrollableTabs: Story = {
  args: {
    items: [
      { key: "all", label: "All" },
      { key: "fruits", label: "Fruits" },
      { key: "vegetables", label: "Vegetables" },
      { key: "dairy", label: "Dairy" },
      { key: "meat", label: "Meat" },
      { key: "bakery", label: "Bakery" },
      { key: "beverages", label: "Beverages" },
      { key: "snacks", label: "Snacks" },
      { key: "frozen", label: "Frozen" },
      { key: "organic", label: "Organic" },
    ],
    selectedId: "all",
    scrollable: true,
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const DisabledTab: Story = {
  args: {
    items: [
      { key: "all", label: "All" },
      { key: "active", label: "Active" },
      { key: "completed", label: "Completed" },
      { key: "archived", label: "Archived", disabled: true },
    ],
    selectedId: "all",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

export const RecipeTabs: Story = {
  args: {
    items: [
      { key: "all", label: "All Recipes" },
      { key: "quick", label: "Quick & Easy", badge: "15" },
      { key: "healthy", label: "Healthy" },
      { key: "vegetarian", label: "Vegetarian" },
      { key: "desserts", label: "Desserts" },
    ],
    selectedId: "quick",
    section: "recipes",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export const OrderStatusTabs: Story = {
  args: {
    items: [
      { key: "all", label: "All Orders" },
      { key: "pending", label: "Pending", badge: 2 },
      { key: "processing", label: "Processing", badge: 1 },
      { key: "delivered", label: "Delivered" },
      { key: "cancelled", label: "Cancelled" },
    ],
    selectedId: "all",
    variant: "pills",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export const InContext: Story = {
  render: () => (
    <div style={{ width: "600px", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
      <TabBar
        items={[
          { key: "products", label: "Products" },
          { key: "reviews", label: "Reviews", badge: 128 },
          { key: "related", label: "Related" },
        ]}
        selectedId="products"
        variant="underline"
        fullWidth
        onSelect={action("onSelect")}
      />
      <div style={{ padding: "16px" }}>
        <div
          style={{
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f9fafb",
            borderRadius: "8px",
            color: "#6b7280",
          }}
        >
          Tab content area
        </div>
      </div>
    </div>
  ),
};

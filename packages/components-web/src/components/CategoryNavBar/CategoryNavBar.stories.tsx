import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { CategoryNavBar } from "./CategoryNavBar";

const meta: Meta<typeof CategoryNavBar> = {
  title: "Components/CategoryNavBar",
  component: CategoryNavBar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    sticky: { control: "boolean" },
    elevated: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  { id: "all", label: "All", icon: "grid" as const },
  { id: "fruits", label: "Fruits", icon: "apple" as const },
  { id: "vegetables", label: "Vegetables", icon: "carrot" as const },
  { id: "dairy", label: "Dairy", icon: "milk" as const },
  { id: "meat", label: "Meat", icon: "beef" as const },
  { id: "bakery", label: "Bakery", icon: "cake" as const },
];

const itemsWithImages = [
  { id: "all", label: "All", icon: "grid" as const },
  {
    id: "fruits",
    label: "Fruits",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=50",
  },
  {
    id: "vegetables",
    label: "Vegetables",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=50",
  },
  {
    id: "dairy",
    label: "Dairy",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=50",
  },
  {
    id: "meat",
    label: "Meat",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=50",
  },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    activeId: "all",
    onSelect: action("onSelect"),
  },
};

export const WithActiveItem: Story = {
  args: {
    items: defaultItems,
    activeId: "fruits",
    onSelect: action("onSelect"),
  },
};

export const WithImages: Story = {
  args: {
    items: itemsWithImages,
    activeId: "all",
    onSelect: action("onSelect"),
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <p style={{ padding: "8px 16px", fontSize: "12px", color: "#6b7280" }}>Small</p>
        <CategoryNavBar
          items={defaultItems}
          activeId="all"
          size="sm"
          onSelect={action("onSelect-sm")}
        />
      </div>
      <div>
        <p style={{ padding: "8px 16px", fontSize: "12px", color: "#6b7280" }}>Medium</p>
        <CategoryNavBar
          items={defaultItems}
          activeId="all"
          size="md"
          onSelect={action("onSelect-md")}
        />
      </div>
      <div>
        <p style={{ padding: "8px 16px", fontSize: "12px", color: "#6b7280" }}>Large</p>
        <CategoryNavBar
          items={defaultItems}
          activeId="all"
          size="lg"
          onSelect={action("onSelect-lg")}
        />
      </div>
    </div>
  ),
};

export const NoElevation: Story = {
  args: {
    items: defaultItems,
    activeId: "all",
    elevated: false,
    onSelect: action("onSelect"),
  },
};

export const ManyCategories: Story = {
  args: {
    items: [
      { id: "all", label: "All", icon: "grid" as const },
      { id: "fruits", label: "Fruits", icon: "apple" as const },
      { id: "vegetables", label: "Vegetables", icon: "carrot" as const },
      { id: "dairy", label: "Dairy", icon: "milk" as const },
      { id: "meat", label: "Meat", icon: "beef" as const },
      { id: "bakery", label: "Bakery", icon: "cake" as const },
      { id: "beverages", label: "Beverages", icon: "coffee" as const },
      { id: "snacks", label: "Snacks", icon: "cookie" as const },
      { id: "frozen", label: "Frozen", icon: "snowflake" as const },
      { id: "organic", label: "Organic", icon: "leaf" as const },
      { id: "international", label: "International", icon: "globe" as const },
    ],
    activeId: "all",
    onSelect: action("onSelect"),
  },
};

export const StickyHeader: Story = {
  render: () => (
    <div style={{ height: "500px", overflow: "auto" }}>
      <div style={{ padding: "16px", background: "white", borderBottom: "1px solid #e5e7eb" }}>
        <h1 style={{ fontWeight: 600, fontSize: "20px" }}>Groxigo</h1>
      </div>
      <CategoryNavBar
        items={defaultItems}
        activeId="fruits"
        sticky
        onSelect={action("onSelect")}
      />
      <div style={{ padding: "16px" }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            style={{
              padding: "16px",
              marginBottom: "12px",
              background: "#f9fafb",
              borderRadius: "8px",
            }}
          >
            Product item {i + 1}
          </div>
        ))}
      </div>
    </div>
  ),
};

export const CustomBackground: Story = {
  args: {
    items: defaultItems,
    activeId: "vegetables",
    backgroundColor: "#f0fdf4",
    onSelect: action("onSelect"),
  },
};

export const RecipeCategories: Story = {
  args: {
    items: [
      { id: "all", label: "All Recipes", icon: "book" as const },
      { id: "quick", label: "Quick & Easy", icon: "clock" as const },
      { id: "healthy", label: "Healthy", icon: "heart" as const },
      { id: "vegetarian", label: "Vegetarian", icon: "leaf" as const },
      { id: "desserts", label: "Desserts", icon: "cake" as const },
      { id: "international", label: "International", icon: "globe" as const },
    ],
    activeId: "all",
    onSelect: action("onSelect"),
  },
};

export const InPageContext: Story = {
  render: () => (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          padding: "16px",
          background: "white",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontWeight: 600, fontSize: "18px" }}>Groceries</h1>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
          }}
        >
          Search
        </button>
      </div>

      {/* Category Nav */}
      <CategoryNavBar
        items={defaultItems}
        activeId="fruits"
        onSelect={action("onSelect")}
      />

      {/* Content */}
      <div style={{ padding: "16px" }}>
        <h2 style={{ fontWeight: 500, marginBottom: "16px" }}>Fruits</h2>
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
                  background: "#f3f4f6",
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
    </div>
  ),
};

export const MobileView: Story = {
  render: () => (
    <div
      style={{
        width: "375px",
        border: "8px solid #1f2937",
        borderRadius: "32px",
        overflow: "hidden",
        margin: "0 auto",
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

      {/* Category Nav */}
      <CategoryNavBar
        items={[
          { id: "all", label: "All", icon: "grid" as const },
          { id: "fruits", label: "Fruits", icon: "apple" as const },
          { id: "vegetables", label: "Veggies", icon: "carrot" as const },
          { id: "dairy", label: "Dairy", icon: "milk" as const },
          { id: "meat", label: "Meat", icon: "beef" as const },
          { id: "bakery", label: "Bakery", icon: "cake" as const },
          { id: "beverages", label: "Drinks", icon: "coffee" as const },
        ]}
        activeId="fruits"
        size="sm"
        onSelect={action("onSelect")}
      />

      {/* Content */}
      <div style={{ height: "400px", background: "#f9fafb", padding: "16px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
          }}
        >
          {[1, 2, 3, 4].map((i) => (
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
              <p style={{ fontWeight: 500, fontSize: "12px" }}>Fruit {i}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { BottomNav } from "./BottomNav";

const meta: Meta<typeof BottomNav> = {
  title: "Components/BottomNav",
  component: BottomNav,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "floating"],
    },
    activeIndicator: {
      control: "select",
      options: ["highlight", "underline", "dot", "none"],
    },
    section: {
      control: "select",
      options: ["default", "groceries", "recipes"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  { id: "home", label: "Home", icon: "home" },
  { id: "categories", label: "Categories", icon: "grid" },
  { id: "cart", label: "Cart", icon: "shopping-cart" },
  { id: "orders", label: "Orders", icon: "package" },
  { id: "account", label: "Account", icon: "user" },
];

const itemsWithBadges = [
  { id: "home", label: "Home", icon: "home" },
  { id: "categories", label: "Categories", icon: "grid" },
  { id: "cart", label: "Cart", icon: "shopping-cart", badge: 3 },
  { id: "orders", label: "Orders", icon: "package", badge: 1 },
  { id: "account", label: "Account", icon: "user" },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    selectedId: "home",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ height: "200px", position: "relative" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithBadges: Story = {
  args: {
    items: itemsWithBadges,
    selectedId: "home",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ height: "200px", position: "relative" }}>
        <Story />
      </div>
    ),
  ],
};

export const CategoriesSelected: Story = {
  args: {
    items: defaultItems,
    selectedId: "categories",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ height: "200px", position: "relative" }}>
        <Story />
      </div>
    ),
  ],
};

export const CartSelected: Story = {
  args: {
    items: itemsWithBadges,
    selectedId: "cart",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ height: "200px", position: "relative" }}>
        <Story />
      </div>
    ),
  ],
};

export const FloatingVariant: Story = {
  args: {
    items: defaultItems,
    selectedId: "home",
    variant: "floating",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ height: "200px", position: "relative", background: "#f3f4f6", padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
};

export const FloatingWithBadges: Story = {
  args: {
    items: itemsWithBadges,
    selectedId: "home",
    variant: "floating",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ height: "200px", position: "relative", background: "#f3f4f6", padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomColors: Story = {
  args: {
    items: defaultItems,
    selectedId: "home",
    activeColor: "#8b5cf6",
    inactiveColor: "#9ca3af",
    highlightColor: "#ede9fe",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ height: "200px", position: "relative" }}>
        <Story />
      </div>
    ),
  ],
};

export const RecipeNav: Story = {
  args: {
    items: [
      { id: "discover", label: "Discover", icon: "compass" },
      { id: "recipes", label: "Recipes", icon: "book" },
      { id: "saved", label: "Saved", icon: "heart", badge: 5 },
      { id: "profile", label: "Profile", icon: "user" },
    ],
    selectedId: "discover",
    section: "recipes",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ height: "200px", position: "relative" }}>
        <Story />
      </div>
    ),
  ],
};

export const InAppContext: Story = {
  render: () => (
    <div
      style={{
        height: "600px",
        display: "flex",
        flexDirection: "column",
        background: "#f9fafb",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px",
          background: "white",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <h1 style={{ fontWeight: 600, fontSize: "18px" }}>Groxigo</h1>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "16px", overflowY: "auto" }}>
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
                background: "white",
                borderRadius: "8px",
                padding: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  height: "80px",
                  background: "#e5e7eb",
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              />
              <div style={{ fontSize: "14px", fontWeight: 500 }}>Product {i}</div>
              <div style={{ fontSize: "14px", color: "#16a34a" }}>$9.99</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav
        items={itemsWithBadges}
        selectedId="home"
        onSelect={action("onSelect")}
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
        background: "#f9fafb",
        display: "flex",
        flexDirection: "column",
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

      {/* Content */}
      <div style={{ flex: 1, padding: "16px", overflowY: "auto" }}>
        <h2 style={{ fontWeight: 600, marginBottom: "16px" }}>Good morning!</h2>
        <p style={{ color: "#6b7280", marginBottom: "16px" }}>
          What would you like to order today?
        </p>
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
                background: "white",
                borderRadius: "12px",
                padding: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
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
              <div style={{ fontSize: "12px", fontWeight: 500 }}>Product {i}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div style={{ position: "relative" }}>
        <BottomNav
          items={itemsWithBadges}
          selectedId="home"
          onSelect={action("onSelect")}
        />
      </div>
    </div>
  ),
};

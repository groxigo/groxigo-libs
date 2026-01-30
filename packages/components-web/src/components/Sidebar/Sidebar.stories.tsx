import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Button } from "@groxigo/ui-elements-web";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    section: {
      control: "select",
      options: ["default", "groceries", "recipes"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SidebarWithTrigger = ({
  ...props
}: Omit<React.ComponentProps<typeof Sidebar>, "open" | "onClose">) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ padding: "20px" }}>
      <Button onPress={() => setIsOpen(true)}>Open Sidebar</Button>
      <Sidebar {...props} open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

const defaultItems = [
  { id: "home", label: "Home", icon: "home", onPress: action("navigate-home") },
  { id: "categories", label: "Categories", icon: "grid", onPress: action("navigate-categories") },
  { id: "deals", label: "Deals", icon: "tag", badge: "New", onPress: action("navigate-deals") },
  { id: "orders", label: "Orders", icon: "package", onPress: action("navigate-orders") },
  { id: "favorites", label: "Favorites", icon: "heart", badge: 5, onPress: action("navigate-favorites") },
  { id: "settings", label: "Settings", icon: "settings", onPress: action("navigate-settings") },
];

const nestedItems = [
  { id: "home", label: "Home", icon: "home", onPress: action("navigate-home") },
  {
    id: "categories",
    label: "Categories",
    icon: "grid",
    children: [
      { id: "fruits", label: "Fruits", onPress: action("navigate-fruits") },
      { id: "vegetables", label: "Vegetables", onPress: action("navigate-vegetables") },
      { id: "dairy", label: "Dairy", onPress: action("navigate-dairy") },
      { id: "meat", label: "Meat & Poultry", onPress: action("navigate-meat") },
    ],
  },
  { id: "deals", label: "Deals", icon: "tag", badge: "3", onPress: action("navigate-deals") },
  { id: "orders", label: "Orders", icon: "package", onPress: action("navigate-orders") },
  { id: "settings", label: "Settings", icon: "settings", onPress: action("navigate-settings") },
];

export const Default: Story = {
  render: () => <SidebarWithTrigger items={defaultItems} selectedId="home" />,
};

export const WithSelectedItem: Story = {
  render: () => <SidebarWithTrigger items={defaultItems} selectedId="orders" />,
};

export const WithNestedItems: Story = {
  render: () => <SidebarWithTrigger items={nestedItems} selectedId="home" />,
};

export const WithHeader: Story = {
  render: () => (
    <SidebarWithTrigger
      items={defaultItems}
      selectedId="home"
      header={
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#dcfce7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              color: "#16a34a",
            }}
          >
            JD
          </div>
          <div>
            <div style={{ fontWeight: 500 }}>John Doe</div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>john@example.com</div>
          </div>
        </div>
      }
    />
  ),
};

export const WithFooter: Story = {
  render: () => (
    <SidebarWithTrigger
      items={defaultItems}
      selectedId="home"
      footer={
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <button
            onClick={action("onHelp")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px",
              background: "none",
              border: "none",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
              borderRadius: "8px",
            }}
          >
            <span>Help & Support</span>
          </button>
          <button
            onClick={action("onLogout")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px",
              background: "none",
              border: "none",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
              color: "#dc2626",
              borderRadius: "8px",
            }}
          >
            <span>Log Out</span>
          </button>
        </div>
      }
    />
  ),
};

export const FullSidebar: Story = {
  render: () => (
    <SidebarWithTrigger
      items={defaultItems}
      selectedId="home"
      header={
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
            alt="Avatar"
            style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }}
          />
          <div>
            <div style={{ fontWeight: 500 }}>John Doe</div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>Premium Member</div>
          </div>
        </div>
      }
      footer={
        <div
          style={{
            padding: "12px",
            background: "#f0fdf4",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <div style={{ fontWeight: 500, color: "#16a34a", marginBottom: "4px" }}>
            Free Delivery
          </div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            On orders over $50
          </div>
        </div>
      }
    />
  ),
};

export const CustomWidth: Story = {
  render: () => (
    <SidebarWithTrigger items={defaultItems} selectedId="home" width={320} />
  ),
};

export const GroceriesSection: Story = {
  render: () => (
    <SidebarWithTrigger
      items={[
        { id: "all", label: "All Products", icon: "grid", onPress: action("navigate-all") },
        { id: "fruits", label: "Fruits", icon: "apple", onPress: action("navigate-fruits") },
        { id: "vegetables", label: "Vegetables", icon: "carrot", onPress: action("navigate-vegetables") },
        { id: "dairy", label: "Dairy & Eggs", icon: "milk", onPress: action("navigate-dairy") },
        { id: "meat", label: "Meat & Poultry", icon: "beef", onPress: action("navigate-meat") },
        { id: "bakery", label: "Bakery", icon: "cake", onPress: action("navigate-bakery") },
        { id: "beverages", label: "Beverages", icon: "coffee", onPress: action("navigate-beverages") },
        { id: "snacks", label: "Snacks", icon: "cookie", onPress: action("navigate-snacks") },
      ]}
      selectedId="fruits"
      section="groceries"
      header={
        <div style={{ fontWeight: 600, fontSize: "18px" }}>
          Shop by Category
        </div>
      }
    />
  ),
};

export const RecipesSection: Story = {
  render: () => (
    <SidebarWithTrigger
      items={[
        { id: "all", label: "All Recipes", icon: "book", onPress: action("navigate-all") },
        { id: "quick", label: "Quick & Easy", icon: "clock", badge: "15", onPress: action("navigate-quick") },
        { id: "healthy", label: "Healthy", icon: "heart", onPress: action("navigate-healthy") },
        { id: "vegetarian", label: "Vegetarian", icon: "leaf", onPress: action("navigate-vegetarian") },
        { id: "indian", label: "Indian", icon: "flag", onPress: action("navigate-indian") },
        { id: "italian", label: "Italian", icon: "pizza", onPress: action("navigate-italian") },
        { id: "chinese", label: "Chinese", icon: "bowl", onPress: action("navigate-chinese") },
        { id: "desserts", label: "Desserts", icon: "cake", onPress: action("navigate-desserts") },
      ]}
      selectedId="indian"
      section="recipes"
      header={
        <div style={{ fontWeight: 600, fontSize: "18px" }}>
          Browse Recipes
        </div>
      }
    />
  ),
};

export const AccountSidebar: Story = {
  render: () => (
    <SidebarWithTrigger
      items={[
        { id: "profile", label: "Profile", icon: "user", onPress: action("navigate-profile") },
        { id: "orders", label: "My Orders", icon: "package", badge: "2", onPress: action("navigate-orders") },
        { id: "addresses", label: "Addresses", icon: "map-pin", onPress: action("navigate-addresses") },
        { id: "payment", label: "Payment Methods", icon: "credit-card", onPress: action("navigate-payment") },
        { id: "notifications", label: "Notifications", icon: "bell", onPress: action("navigate-notifications") },
        { id: "preferences", label: "Preferences", icon: "sliders", onPress: action("navigate-preferences") },
        { id: "help", label: "Help & Support", icon: "help-circle", onPress: action("navigate-help") },
      ]}
      selectedId="profile"
      header={
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 600,
              fontSize: "20px",
            }}
          >
            JD
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "16px" }}>John Doe</div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>Member since Jan 2024</div>
          </div>
        </div>
      }
      footer={
        <button
          onClick={action("onLogout")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "12px",
            width: "100%",
            background: "none",
            border: "1px solid #fee2e2",
            borderRadius: "8px",
            cursor: "pointer",
            color: "#dc2626",
          }}
        >
          Log Out
        </button>
      }
    />
  ),
};

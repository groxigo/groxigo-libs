import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Header } from "./Header";
import { Button, Icon } from "@groxigo/ui-elements-web";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    section: {
      control: "select",
      options: ["default", "groceries", "recipes"],
    },
    elevated: { control: "boolean" },
    sticky: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Groxigo",
  },
};

export const WithLeftAction: Story = {
  args: {
    title: "Products",
    leftAction: (
      <button
        onClick={action("onBack")}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          display: "flex",
        }}
      >
        <Icon name="arrow-left" size="md" />
      </button>
    ),
  },
};

export const WithRightActions: Story = {
  args: {
    title: "Groxigo",
    rightActions: [
      <button
        key="search"
        onClick={action("onSearch")}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
      >
        <Icon name="search" size="md" />
      </button>,
      <button
        key="cart"
        onClick={action("onCart")}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", position: "relative" }}
      >
        <Icon name="shopping-cart" size="md" />
        <span
          style={{
            position: "absolute",
            top: "4px",
            right: "4px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            width: "16px",
            height: "16px",
            fontSize: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          3
        </span>
      </button>,
    ],
  },
};

export const FullHeader: Story = {
  args: {
    title: "Groceries",
    leftAction: (
      <button
        onClick={action("onMenu")}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
      >
        <Icon name="menu" size="md" />
      </button>
    ),
    rightActions: [
      <button
        key="search"
        onClick={action("onSearch")}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
      >
        <Icon name="search" size="md" />
      </button>,
      <button
        key="cart"
        onClick={action("onCart")}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
      >
        <Icon name="shopping-cart" size="md" />
      </button>,
    ],
  },
};

export const GroceriesSection: Story = {
  args: {
    title: "Fruits & Vegetables",
    section: "groceries",
    leftAction: (
      <button
        onClick={action("onBack")}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
      >
        <Icon name="arrow-left" size="md" />
      </button>
    ),
    rightActions: [
      <button
        key="filter"
        onClick={action("onFilter")}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
      >
        <Icon name="filter" size="md" />
      </button>,
    ],
  },
};

export const RecipesSection: Story = {
  args: {
    title: "Indian Recipes",
    section: "recipes",
    leftAction: (
      <button
        onClick={action("onBack")}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
      >
        <Icon name="arrow-left" size="md" />
      </button>
    ),
    rightActions: [
      <button
        key="favorite"
        onClick={action("onFavorite")}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
      >
        <Icon name="heart" size="md" />
      </button>,
      <button
        key="share"
        onClick={action("onShare")}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
      >
        <Icon name="share" size="md" />
      </button>,
    ],
  },
};

export const NoElevation: Story = {
  args: {
    title: "Settings",
    elevated: false,
    leftAction: (
      <button
        onClick={action("onBack")}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
      >
        <Icon name="arrow-left" size="md" />
      </button>
    ),
  },
};

export const Sticky: Story = {
  render: () => (
    <div style={{ height: "500px", overflow: "auto" }}>
      <Header
        title="Sticky Header"
        sticky
        rightActions={[
          <button
            key="search"
            onClick={action("onSearch")}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
          >
            <Icon name="search" size="md" />
          </button>,
        ]}
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
            Content item {i + 1}
          </div>
        ))}
      </div>
    </div>
  ),
};

export const WithCustomTitle: Story = {
  args: {
    titleElement: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src="https://via.placeholder.com/32"
          alt="Logo"
          style={{ width: "32px", height: "32px", borderRadius: "8px" }}
        />
        <span style={{ fontWeight: 600 }}>Groxigo</span>
      </div>
    ),
    rightActions: [
      <button
        key="cart"
        onClick={action("onCart")}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
      >
        <Icon name="shopping-cart" size="md" />
      </button>,
    ],
  },
};

export const ProductDetailHeader: Story = {
  args: {
    leftAction: (
      <button
        onClick={action("onBack")}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
      >
        <Icon name="arrow-left" size="md" />
      </button>
    ),
    rightActions: [
      <button
        key="favorite"
        onClick={action("onFavorite")}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
      >
        <Icon name="heart" size="md" />
      </button>,
      <button
        key="share"
        onClick={action("onShare")}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
      >
        <Icon name="share" size="md" />
      </button>,
    ],
    elevated: false,
  },
};

export const CheckoutHeader: Story = {
  args: {
    title: "Checkout",
    leftAction: (
      <button
        onClick={action("onBack")}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
      >
        <Icon name="arrow-left" size="md" />
      </button>
    ),
    rightActions: [
      <span
        key="step"
        style={{ fontSize: "14px", color: "#6b7280", padding: "8px" }}
      >
        Step 2 of 3
      </span>,
    ],
  },
};

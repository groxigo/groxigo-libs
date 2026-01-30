import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { EmptyState } from "./EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    actionVariant: {
      control: "select",
      options: ["solid", "outline", "ghost"],
    },
    section: {
      control: "select",
      options: ["default", "groceries", "recipes"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "No items found",
    description: "Try adjusting your search or filters to find what you're looking for.",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const EmptyCart: Story = {
  args: {
    icon: "shopping-cart",
    title: "Your cart is empty",
    description: "Add some items to your cart to get started with your order.",
    actionLabel: "Start Shopping",
    onAction: action("onAction"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const NoSearchResults: Story = {
  args: {
    icon: "search",
    title: "No results found",
    description: 'We couldn\'t find any products matching "organic quinoa". Try different keywords.',
    actionLabel: "Clear Search",
    onAction: action("onClearSearch"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const NoFavorites: Story = {
  args: {
    icon: "heart",
    title: "No favorites yet",
    description: "Save your favorite products to easily find them later.",
    actionLabel: "Browse Products",
    onAction: action("onBrowse"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const NoOrders: Story = {
  args: {
    icon: "package",
    title: "No orders yet",
    description: "When you place an order, it will appear here for easy tracking.",
    actionLabel: "Start Shopping",
    onAction: action("onStartShopping"),
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
    <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
      <div style={{ width: "250px" }}>
        <EmptyState
          size="sm"
          title="Small"
          description="Compact empty state"
          actionLabel="Action"
          onAction={action("onAction-sm")}
        />
      </div>
      <div style={{ width: "300px" }}>
        <EmptyState
          size="md"
          title="Medium"
          description="Default empty state"
          actionLabel="Action"
          onAction={action("onAction-md")}
        />
      </div>
      <div style={{ width: "350px" }}>
        <EmptyState
          size="lg"
          title="Large"
          description="Prominent empty state"
          actionLabel="Action"
          onAction={action("onAction-lg")}
        />
      </div>
    </div>
  ),
};

export const RecipeSection: Story = {
  args: {
    icon: "book",
    title: "No saved recipes",
    description: "Save recipes to easily access them when planning your meals.",
    actionLabel: "Explore Recipes",
    onAction: action("onExplore"),
    section: "recipes",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithoutAction: Story = {
  args: {
    icon: "clock",
    title: "No recent activity",
    description: "Your recent browsing history will appear here.",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const OutlineAction: Story = {
  args: {
    icon: "inbox",
    title: "Inbox is empty",
    description: "You have no new messages or notifications.",
    actionLabel: "Refresh",
    onAction: action("onRefresh"),
    actionVariant: "outline",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomIllustration: Story = {
  args: {
    title: "Coming Soon",
    description: "This feature is under development. Check back later!",
    illustration: (
      <div
        style={{
          width: "120px",
          height: "120px",
          background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#16a34a"
          strokeWidth="1.5"
        >
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const InContext: Story = {
  render: () => (
    <div
      style={{
        width: "600px",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontWeight: 600 }}>Recent Orders</h2>
        <button style={{ color: "#16a34a", border: "none", background: "none", cursor: "pointer" }}>
          View All
        </button>
      </div>
      <EmptyState
        icon="package"
        title="No orders yet"
        description="When you place an order, it will appear here for easy tracking."
        actionLabel="Start Shopping"
        onAction={action("onStartShopping")}
        size="md"
      />
    </div>
  ),
};

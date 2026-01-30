import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ListItem } from "./ListItem";

const meta: Meta<typeof ListItem> = {
  title: "Components/ListItem",
  component: ListItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    badgeVariant: {
      control: "select",
      options: ["solid", "subtle", "outline"],
    },
    section: {
      control: "select",
      options: ["default", "groceries", "recipes"],
    },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
    divider: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Settings",
    onPress: action("onPress"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithSubtitle: Story = {
  args: {
    title: "Account Settings",
    subtitle: "Manage your account preferences",
    onPress: action("onPress"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithLeftIcon: Story = {
  args: {
    title: "Notifications",
    subtitle: "Manage your notification preferences",
    leftIcon: "bell",
    onPress: action("onPress"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithLeftImage: Story = {
  args: {
    title: "Fresh Avocados",
    subtitle: "3 count - $5.99",
    leftImage: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=100",
    onPress: action("onPress"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithBadge: Story = {
  args: {
    title: "Messages",
    leftIcon: "inbox",
    badge: "5",
    onPress: action("onPress"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Selected: Story = {
  args: {
    title: "Fruits & Vegetables",
    leftIcon: "grid",
    selected: true,
    onPress: action("onPress"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    title: "Unavailable Option",
    subtitle: "This feature is currently disabled",
    leftIcon: "lock",
    disabled: true,
    onPress: action("onPress"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithRightIcon: Story = {
  args: {
    title: "Language",
    subtitle: "English (US)",
    leftIcon: "globe",
    rightIcon: "chevron-right",
    onPress: action("onPress"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  render: () => (
    <div style={{ width: "350px", display: "flex", flexDirection: "column", gap: "8px" }}>
      <ListItem
        title="Small Size"
        subtitle="Compact list item"
        leftIcon="star"
        size="sm"
        onPress={action("onPress-sm")}
      />
      <ListItem
        title="Medium Size"
        subtitle="Default list item"
        leftIcon="star"
        size="md"
        onPress={action("onPress-md")}
      />
      <ListItem
        title="Large Size"
        subtitle="Prominent list item"
        leftIcon="star"
        size="lg"
        onPress={action("onPress-lg")}
      />
    </div>
  ),
};

export const SettingsMenu: Story = {
  render: () => (
    <div
      style={{
        width: "350px",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <ListItem
        title="Account"
        subtitle="Personal info, security"
        leftIcon="user"
        divider
        onPress={action("onPress-account")}
      />
      <ListItem
        title="Notifications"
        subtitle="Push, email, SMS"
        leftIcon="bell"
        badge="3"
        divider
        onPress={action("onPress-notifications")}
      />
      <ListItem
        title="Payment Methods"
        subtitle="Cards, wallets"
        leftIcon="credit-card"
        divider
        onPress={action("onPress-payment")}
      />
      <ListItem
        title="Addresses"
        subtitle="Delivery locations"
        leftIcon="map-pin"
        divider
        onPress={action("onPress-addresses")}
      />
      <ListItem
        title="Help & Support"
        subtitle="FAQ, contact us"
        leftIcon="help-circle"
        onPress={action("onPress-help")}
      />
    </div>
  ),
};

export const CategoryList: Story = {
  render: () => (
    <div
      style={{
        width: "300px",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <ListItem
        title="All Categories"
        leftIcon="grid"
        selected
        divider
        onPress={action("onPress-all")}
      />
      <ListItem
        title="Fruits"
        leftImage="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=100"
        badge="42"
        divider
        onPress={action("onPress-fruits")}
      />
      <ListItem
        title="Vegetables"
        leftImage="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=100"
        badge="38"
        divider
        onPress={action("onPress-vegetables")}
      />
      <ListItem
        title="Dairy"
        leftImage="https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100"
        badge="24"
        divider
        onPress={action("onPress-dairy")}
      />
      <ListItem
        title="Meat & Poultry"
        leftImage="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=100"
        badge="31"
        onPress={action("onPress-meat")}
      />
    </div>
  ),
};

export const WithRightContent: Story = {
  args: {
    title: "Dark Mode",
    subtitle: "Use dark theme",
    leftIcon: "moon",
    rightContent: (
      <label style={{ position: "relative", display: "inline-block", width: "44px", height: "24px" }}>
        <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} />
        <span
          style={{
            position: "absolute",
            cursor: "pointer",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#e5e7eb",
            borderRadius: "12px",
            transition: "0.2s",
          }}
        >
          <span
            style={{
              position: "absolute",
              height: "20px",
              width: "20px",
              left: "2px",
              bottom: "2px",
              backgroundColor: "white",
              borderRadius: "50%",
              transition: "0.2s",
            }}
          />
        </span>
      </label>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
};

export const OrderHistory: Story = {
  render: () => (
    <div style={{ width: "400px", display: "flex", flexDirection: "column", gap: "8px" }}>
      <ListItem
        title="Order #12345"
        subtitle="Delivered on Dec 15, 2024"
        leftImage="https://images.unsplash.com/photo-1543168256-418811576931?w=100"
        badge="$45.99"
        badgeVariant="subtle"
        onPress={action("onPress-order1")}
      />
      <ListItem
        title="Order #12344"
        subtitle="Delivered on Dec 10, 2024"
        leftImage="https://images.unsplash.com/photo-1553546895-531931aa1aa8?w=100"
        badge="$32.50"
        badgeVariant="subtle"
        onPress={action("onPress-order2")}
      />
      <ListItem
        title="Order #12343"
        subtitle="Delivered on Dec 5, 2024"
        leftImage="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=100"
        badge="$67.25"
        badgeVariant="subtle"
        onPress={action("onPress-order3")}
      />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "UI Elements/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    fontSize: {
      control: "select",
      options: ["sm", "md"],
    },
    separator: { control: "text" },
    maxItems: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Electronics", href: "/products/electronics" },
      { label: "Laptops", isCurrent: true },
    ],
    fontSize: "md",
  },
};

export const WithCustomSeparator: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Category", href: "/category" },
      { label: "Subcategory", href: "/category/subcategory" },
      { label: "Current Page", isCurrent: true },
    ],
    separator: ">",
    fontSize: "md",
  },
};

export const WithCurrentPage: Story = {
  args: {
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Settings", href: "/settings" },
      { label: "Profile", isCurrent: true },
    ],
    fontSize: "md",
  },
};

export const SmallSize: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Item", isCurrent: true },
    ],
    fontSize: "sm",
  },
};

export const WithCollapsedItems: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Level 1", href: "/level1" },
      { label: "Level 2", href: "/level2" },
      { label: "Level 3", href: "/level3" },
      { label: "Level 4", href: "/level4" },
      { label: "Current", isCurrent: true },
    ],
    maxItems: 4,
    itemsBeforeCollapse: 1,
    itemsAfterCollapse: 2,
    fontSize: "md",
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        label: "Home",
        href: "/",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
        ),
      },
      { label: "Products", href: "/products" },
      { label: "Current Item", isCurrent: true },
    ],
    fontSize: "md",
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SubCategoryTile } from "./SubCategoryTile";

const meta: Meta<typeof SubCategoryTile> = {
  title: "Components/SubCategoryTile",
  component: SubCategoryTile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    active: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Apples",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=100",
    onClick: action("onClick"),
  },
};

export const Active: Story = {
  args: {
    title: "Apples",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=100",
    active: true,
    onClick: action("onClick"),
  },
};

export const WithIcon: Story = {
  args: {
    title: "Citrus",
    icon: "sun",
    onClick: action("onClick"),
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
      <SubCategoryTile
        title="Small"
        image="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=100"
        size="sm"
        onClick={action("onClick-sm")}
      />
      <SubCategoryTile
        title="Medium"
        image="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=100"
        size="md"
        onClick={action("onClick-md")}
      />
      <SubCategoryTile
        title="Large"
        image="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=100"
        size="lg"
        onClick={action("onClick-lg")}
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    title: "Unavailable",
    icon: "x",
    disabled: true,
    onClick: action("onClick"),
  },
};

export const LongTitle: Story = {
  args: {
    title: "Organic Berries",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=100",
    onClick: action("onClick"),
  },
};

export const SubCategoryList: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#f9fafb",
        width: "100px",
        padding: "8px 0",
      }}
    >
      <SubCategoryTile
        title="All"
        icon="grid"
        active
        onClick={action("onClick-all")}
      />
      <SubCategoryTile
        title="Apples"
        image="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=100"
        onClick={action("onClick-apples")}
      />
      <SubCategoryTile
        title="Bananas"
        image="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=100"
        onClick={action("onClick-bananas")}
      />
      <SubCategoryTile
        title="Oranges"
        image="https://images.unsplash.com/photo-1547514701-42782101795e?w=100"
        onClick={action("onClick-oranges")}
      />
      <SubCategoryTile
        title="Berries"
        image="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=100"
        onClick={action("onClick-berries")}
      />
      <SubCategoryTile
        title="Grapes"
        image="https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=100"
        onClick={action("onClick-grapes")}
      />
    </div>
  ),
};

export const NavigationSidebar: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "100px",
          background: "white",
          borderRight: "1px solid #e5e7eb",
          padding: "8px 0",
        }}
      >
        <SubCategoryTile
          title="All Fruits"
          icon="grid"
          active
          onClick={action("onClick-all")}
        />
        <SubCategoryTile
          title="Apples"
          image="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=100"
          onClick={action("onClick-apples")}
        />
        <SubCategoryTile
          title="Bananas"
          image="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=100"
          onClick={action("onClick-bananas")}
        />
        <SubCategoryTile
          title="Oranges"
          image="https://images.unsplash.com/photo-1547514701-42782101795e?w=100"
          onClick={action("onClick-oranges")}
        />
        <SubCategoryTile
          title="Berries"
          image="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=100"
          onClick={action("onClick-berries")}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "16px" }}>
        <h2 style={{ fontWeight: 600, marginBottom: "16px" }}>All Fruits</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              style={{
                height: "120px",
                background: "#f3f4f6",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9ca3af",
              }}
            >
              Product {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const VegetableCategories: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "white",
        width: "100px",
        padding: "8px 0",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
      }}
    >
      <SubCategoryTile
        title="All"
        icon="grid"
        onClick={action("onClick-all")}
      />
      <SubCategoryTile
        title="Leafy"
        image="https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100"
        active
        onClick={action("onClick-leafy")}
      />
      <SubCategoryTile
        title="Root"
        image="https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=100"
        onClick={action("onClick-root")}
      />
      <SubCategoryTile
        title="Peppers"
        image="https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=100"
        onClick={action("onClick-peppers")}
      />
      <SubCategoryTile
        title="Squash"
        image="https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=100"
        onClick={action("onClick-squash")}
      />
    </div>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#f9fafb",
        width: "80px",
        padding: "4px 0",
      }}
    >
      <SubCategoryTile
        title="All"
        icon="grid"
        size="sm"
        active
        onClick={action("onClick-all")}
      />
      <SubCategoryTile
        title="Apples"
        image="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=80"
        size="sm"
        onClick={action("onClick-apples")}
      />
      <SubCategoryTile
        title="Bananas"
        image="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=80"
        size="sm"
        onClick={action("onClick-bananas")}
      />
      <SubCategoryTile
        title="Oranges"
        image="https://images.unsplash.com/photo-1547514701-42782101795e?w=80"
        size="sm"
        onClick={action("onClick-oranges")}
      />
    </div>
  ),
};

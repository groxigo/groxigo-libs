import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { CategoryTile } from "./CategoryTile";

const meta: Meta<typeof CategoryTile> = {
  title: "Components/CategoryTile",
  component: CategoryTile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Fruits",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=200",
    onClick: action("onClick"),
  },
};

export const WithIcon: Story = {
  args: {
    title: "Vegetables",
    icon: "carrot",
    onClick: action("onClick"),
  },
};

export const WithProductCount: Story = {
  args: {
    title: "Dairy & Eggs",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200",
    productCount: 42,
    onClick: action("onClick"),
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
      <CategoryTile
        title="Small"
        image="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=200"
        size="sm"
        onClick={action("onClick-sm")}
      />
      <CategoryTile
        title="Medium"
        image="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=200"
        size="md"
        onClick={action("onClick-md")}
      />
      <CategoryTile
        title="Large"
        image="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=200"
        size="lg"
        onClick={action("onClick-lg")}
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    title: "Coming Soon",
    icon: "clock",
    disabled: true,
    onClick: action("onClick"),
  },
};

export const WithHref: Story = {
  args: {
    title: "Bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200",
    href: "/category/bakery",
    productCount: 28,
  },
};

export const LongTitle: Story = {
  args: {
    title: "Fresh Fruits & Vegetables",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200",
    onClick: action("onClick"),
  },
};

export const CategoryGrid: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
      }}
    >
      <CategoryTile
        title="Fruits"
        image="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=200"
        productCount={42}
        onClick={action("onClick-fruits")}
      />
      <CategoryTile
        title="Vegetables"
        image="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200"
        productCount={38}
        onClick={action("onClick-vegetables")}
      />
      <CategoryTile
        title="Dairy"
        image="https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200"
        productCount={24}
        onClick={action("onClick-dairy")}
      />
      <CategoryTile
        title="Meat"
        image="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=200"
        productCount={31}
        onClick={action("onClick-meat")}
      />
      <CategoryTile
        title="Bakery"
        image="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200"
        productCount={21}
        onClick={action("onClick-bakery")}
      />
      <CategoryTile
        title="Beverages"
        image="https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200"
        productCount={35}
        onClick={action("onClick-beverages")}
      />
      <CategoryTile
        title="Snacks"
        image="https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=200"
        productCount={48}
        onClick={action("onClick-snacks")}
      />
      <CategoryTile
        title="Frozen"
        image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200"
        productCount={29}
        onClick={action("onClick-frozen")}
      />
    </div>
  ),
};

export const IconCategories: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "12px",
      }}
    >
      <CategoryTile
        title="Fruits"
        icon="apple"
        onClick={action("onClick-fruits")}
      />
      <CategoryTile
        title="Vegetables"
        icon="carrot"
        onClick={action("onClick-vegetables")}
      />
      <CategoryTile
        title="Dairy"
        icon="milk"
        onClick={action("onClick-dairy")}
      />
      <CategoryTile
        title="Meat"
        icon="beef"
        onClick={action("onClick-meat")}
      />
      <CategoryTile
        title="Bakery"
        icon="cake"
        onClick={action("onClick-bakery")}
      />
    </div>
  ),
};

export const SmallGrid: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "8px",
        width: "400px",
      }}
    >
      {[
        { title: "Fruits", img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=100" },
        { title: "Veggies", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=100" },
        { title: "Dairy", img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100" },
        { title: "Meat", img: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=100" },
        { title: "Bakery", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100" },
      ].map((cat) => (
        <CategoryTile
          key={cat.title}
          title={cat.title}
          image={cat.img}
          size="sm"
          onClick={action(`onClick-${cat.title}`)}
        />
      ))}
    </div>
  ),
};

export const InHomepage: Story = {
  render: () => (
    <div style={{ width: "600px" }}>
      <h2 style={{ fontWeight: 600, marginBottom: "16px" }}>Shop by Category</h2>
      <div
        style={{
          display: "flex",
          gap: "16px",
          overflowX: "auto",
          paddingBottom: "8px",
        }}
      >
        {[
          { title: "Fruits", img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=200", count: 42 },
          { title: "Vegetables", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200", count: 38 },
          { title: "Dairy", img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200", count: 24 },
          { title: "Meat", img: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=200", count: 31 },
          { title: "Bakery", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200", count: 21 },
          { title: "Beverages", img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200", count: 35 },
        ].map((cat) => (
          <CategoryTile
            key={cat.title}
            title={cat.title}
            image={cat.img}
            productCount={cat.count}
            onClick={action(`onClick-${cat.title}`)}
          />
        ))}
      </div>
    </div>
  ),
};

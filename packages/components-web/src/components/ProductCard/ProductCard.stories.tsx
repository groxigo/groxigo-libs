import type { Meta, StoryObj } from "@storybook/react";
import { ProductCard } from "./ProductCard";

const meta: Meta<typeof ProductCard> = {
  title: "Components/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["default", "horizontal"],
    },
    outOfStock: { control: "boolean" },
    isFavorite: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleProduct = {
  id: "1",
  name: "Organic Avocados (3 pack)",
  imageUrl: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400",
  price: 5.99,
  unit: "3 count",
};

export const Default: Story = {
  args: {
    ...sampleProduct,
    onAddToCart: () => console.log("Add to cart"),
    onPress: () => console.log("Product pressed"),
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
      <ProductCard
        {...sampleProduct}
        size="sm"
        onAddToCart={() => {}}
      />
      <ProductCard
        {...sampleProduct}
        size="md"
        onAddToCart={() => {}}
      />
      <ProductCard
        {...sampleProduct}
        size="lg"
        onAddToCart={() => {}}
      />
    </div>
  ),
};

export const WithDiscount: Story = {
  args: {
    ...sampleProduct,
    originalPrice: 7.99,
    discountPercent: 25,
    onAddToCart: () => {},
  },
};

export const WithQuantity: Story = {
  args: {
    ...sampleProduct,
    quantity: 2,
    onQuantityChange: (qty) => console.log("Quantity:", qty),
  },
};

export const OutOfStock: Story = {
  args: {
    ...sampleProduct,
    outOfStock: true,
    onAddToCart: () => {},
  },
};

export const WithFavorite: Story = {
  args: {
    ...sampleProduct,
    isFavorite: true,
    onToggleFavorite: () => console.log("Toggle favorite"),
    onAddToCart: () => {},
  },
};

export const WithBadge: Story = {
  args: {
    ...sampleProduct,
    badge: "New",
    onAddToCart: () => {},
  },
};

export const HorizontalVariant: Story = {
  args: {
    ...sampleProduct,
    variant: "horizontal",
    onAddToCart: () => {},
    onPress: () => console.log("Product pressed"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const HorizontalWithQuantity: Story = {
  args: {
    ...sampleProduct,
    variant: "horizontal",
    quantity: 3,
    originalPrice: 7.99,
    onQuantityChange: (qty) => console.log("Quantity:", qty),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const ProductGrid: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
      <ProductCard
        id="1"
        name="Fresh Organic Bananas"
        imageUrl="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400"
        price={2.99}
        unit="1 bunch"
        onAddToCart={() => {}}
      />
      <ProductCard
        id="2"
        name="Red Bell Peppers"
        imageUrl="https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400"
        price={4.49}
        originalPrice={5.99}
        discountPercent={25}
        unit="per lb"
        onAddToCart={() => {}}
      />
      <ProductCard
        id="3"
        name="Organic Whole Milk"
        imageUrl="https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400"
        price={6.99}
        unit="1 gallon"
        badge="Organic"
        onAddToCart={() => {}}
      />
      <ProductCard
        id="4"
        name="Farm Fresh Eggs"
        imageUrl="https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400"
        price={5.99}
        unit="12 count"
        quantity={1}
        onQuantityChange={() => {}}
      />
      <ProductCard
        id="5"
        name="Sourdough Bread"
        imageUrl="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400"
        price={4.99}
        unit="1 loaf"
        outOfStock
        onAddToCart={() => {}}
      />
      <ProductCard
        id="6"
        name="Greek Yogurt"
        imageUrl="https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400"
        price={3.49}
        unit="32 oz"
        isFavorite
        onToggleFavorite={() => {}}
        onAddToCart={() => {}}
      />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { ResponsiveGrid } from "./ResponsiveGrid";

const meta: Meta<typeof ResponsiveGrid> = {
  title: "Components/ResponsiveGrid",
  component: ResponsiveGrid,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    gap: {
      control: "select",
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const GridItem = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: "24px",
      background: "#f3f4f6",
      borderRadius: "8px",
      textAlign: "center",
      fontWeight: 500,
    }}
  >
    {children}
  </div>
);

export const Default: Story = {
  args: {
    children: (
      <>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <GridItem key={i}>Item {i}</GridItem>
        ))}
      </>
    ),
  },
};

export const CustomColumns: Story = {
  args: {
    columns: { base: 1, sm: 2, md: 3, lg: 4, xl: 5 },
    children: (
      <>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <GridItem key={i}>Item {i}</GridItem>
        ))}
      </>
    ),
  },
};

export const TwoColumns: Story = {
  args: {
    columns: { base: 1, sm: 2, md: 2, lg: 2 },
    children: (
      <>
        {[1, 2, 3, 4].map((i) => (
          <GridItem key={i}>Item {i}</GridItem>
        ))}
      </>
    ),
  },
};

export const ThreeColumns: Story = {
  args: {
    columns: { base: 1, sm: 2, md: 3, lg: 3 },
    children: (
      <>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <GridItem key={i}>Item {i}</GridItem>
        ))}
      </>
    ),
  },
};

export const GapVariations: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "14px", color: "#6b7280" }}>Gap: 2</p>
        <ResponsiveGrid columns={{ base: 2, md: 4 }} gap={2}>
          {[1, 2, 3, 4].map((i) => (
            <GridItem key={i}>{i}</GridItem>
          ))}
        </ResponsiveGrid>
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "14px", color: "#6b7280" }}>Gap: 4</p>
        <ResponsiveGrid columns={{ base: 2, md: 4 }} gap={4}>
          {[1, 2, 3, 4].map((i) => (
            <GridItem key={i}>{i}</GridItem>
          ))}
        </ResponsiveGrid>
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "14px", color: "#6b7280" }}>Gap: 8</p>
        <ResponsiveGrid columns={{ base: 2, md: 4 }} gap={8}>
          {[1, 2, 3, 4].map((i) => (
            <GridItem key={i}>{i}</GridItem>
          ))}
        </ResponsiveGrid>
      </div>
    </div>
  ),
};

export const AutoFitMinWidth: Story = {
  args: {
    minItemWidth: "200px",
    gap: 4,
    children: (
      <>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <GridItem key={i}>Item {i}</GridItem>
        ))}
      </>
    ),
  },
};

export const ProductGrid: Story = {
  render: () => (
    <ResponsiveGrid columns={{ base: 2, sm: 2, md: 3, lg: 4 }} gap={4}>
      {[
        { name: "Avocados", price: 5.99 },
        { name: "Bananas", price: 2.99 },
        { name: "Apples", price: 3.99 },
        { name: "Oranges", price: 4.49 },
        { name: "Grapes", price: 6.99 },
        { name: "Strawberries", price: 5.49 },
        { name: "Blueberries", price: 4.99 },
        { name: "Mangoes", price: 3.49 },
      ].map((product, i) => (
        <div
          key={i}
          style={{
            padding: "12px",
            background: "white",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
          }}
        >
          <div
            style={{
              height: "120px",
              background: "#dcfce7",
              borderRadius: "8px",
              marginBottom: "12px",
            }}
          />
          <p style={{ fontWeight: 500, marginBottom: "4px" }}>{product.name}</p>
          <p style={{ color: "#16a34a", fontWeight: 600 }}>${product.price}</p>
        </div>
      ))}
    </ResponsiveGrid>
  ),
};

export const CategoryGrid: Story = {
  render: () => (
    <ResponsiveGrid columns={{ base: 3, sm: 4, md: 5, lg: 6 }} gap={3}>
      {["Fruits", "Vegetables", "Dairy", "Meat", "Bakery", "Beverages", "Snacks", "Frozen", "Organic", "International", "Pantry", "Household"].map(
        (category) => (
          <div
            key={category}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                background: "#f0fdf4",
                borderRadius: "50%",
              }}
            />
            <span style={{ fontSize: "12px", textAlign: "center" }}>{category}</span>
          </div>
        )
      )}
    </ResponsiveGrid>
  ),
};

export const RecipeGrid: Story = {
  render: () => (
    <ResponsiveGrid columns={{ base: 1, sm: 2, md: 3 }} gap={6}>
      {[
        { name: "Butter Chicken", time: "45 min" },
        { name: "Vegetable Biryani", time: "60 min" },
        { name: "Paneer Tikka", time: "30 min" },
        { name: "Dal Makhani", time: "90 min" },
        { name: "Chicken Korma", time: "50 min" },
        { name: "Samosa", time: "75 min" },
      ].map((recipe, i) => (
        <div
          key={i}
          style={{
            background: "white",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              height: "160px",
              background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
            }}
          />
          <div style={{ padding: "16px" }}>
            <p style={{ fontWeight: 600, marginBottom: "4px" }}>{recipe.name}</p>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>{recipe.time}</p>
          </div>
        </div>
      ))}
    </ResponsiveGrid>
  ),
};

export const CardsWithDifferentHeights: Story = {
  render: () => (
    <ResponsiveGrid columns={{ base: 1, sm: 2, md: 3 }} gap={4}>
      <div style={{ padding: "24px", background: "#fee2e2", borderRadius: "8px" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>Short Card</h3>
        <p>Brief content here.</p>
      </div>
      <div style={{ padding: "24px", background: "#fef3c7", borderRadius: "8px" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>Medium Card</h3>
        <p>
          This card has more content than the short one, making it taller in the grid
          layout.
        </p>
      </div>
      <div style={{ padding: "24px", background: "#dcfce7", borderRadius: "8px" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>Tall Card</h3>
        <p>
          This card has even more content. The grid will handle different heights
          gracefully, creating a clean layout regardless of content length.
        </p>
        <p style={{ marginTop: "12px" }}>Additional paragraph for extra height.</p>
      </div>
      <div style={{ padding: "24px", background: "#e0e7ff", borderRadius: "8px" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>Another Short Card</h3>
        <p>Minimal content.</p>
      </div>
      <div style={{ padding: "24px", background: "#fce7f3", borderRadius: "8px" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>Medium Card</h3>
        <p>Some moderate amount of content for this card.</p>
      </div>
      <div style={{ padding: "24px", background: "#f0fdf4", borderRadius: "8px" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>Short Card</h3>
        <p>Quick info.</p>
      </div>
    </ResponsiveGrid>
  ),
};

export const EmptyGrid: Story = {
  args: {
    columns: { base: 2, md: 4 },
    children: null,
  },
};

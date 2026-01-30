import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { CuisineCard } from "./CuisineCard";

const meta: Meta<typeof CuisineCard> = {
  title: "Components/CuisineCard",
  component: CuisineCard,
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
      options: ["default", "compact", "featured"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCuisines = [
  {
    slug: "north-indian",
    name: "North Indian",
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    recipeCount: 58,
  },
  {
    slug: "south-indian",
    name: "South Indian",
    imageUrl: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop",
    recipeCount: 33,
  },
  {
    slug: "mughlai",
    name: "Mughlai",
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop",
    recipeCount: 6,
  },
  {
    slug: "indo-chinese",
    name: "Indo-Chinese",
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
    recipeCount: 7,
  },
];

export const Default: Story = {
  args: {
    ...sampleCuisines[0],
    width: 200,
    onPress: action("onPress"),
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
      <CuisineCard
        {...sampleCuisines[0]}
        size="sm"
        width={160}
        onPress={action("onPress-sm")}
      />
      <CuisineCard
        {...sampleCuisines[1]}
        size="md"
        width={180}
        onPress={action("onPress-md")}
      />
      <CuisineCard
        {...sampleCuisines[2]}
        size="lg"
        width={200}
        onPress={action("onPress-lg")}
      />
    </div>
  ),
};

export const Grid: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", width: "400px" }}>
      {sampleCuisines.map((cuisine) => (
        <CuisineCard
          key={cuisine.slug}
          {...cuisine}
          onPress={action(`onPress-${cuisine.slug}`)}
        />
      ))}
    </div>
  ),
};

export const LargeGrid: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", width: "600px" }}>
      {[...sampleCuisines, ...sampleCuisines.slice(0, 2)].map((cuisine, idx) => (
        <CuisineCard
          key={`${cuisine.slug}-${idx}`}
          {...cuisine}
          onPress={action(`onPress-${cuisine.slug}`)}
        />
      ))}
    </div>
  ),
};

export const WithoutRecipeCount: Story = {
  args: {
    slug: "kerala",
    name: "Kerala",
    imageUrl: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&h=300&fit=crop",
    width: 200,
    onPress: action("onPress"),
  },
};

export const WithPlaceholder: Story = {
  args: {
    slug: "unknown",
    name: "Unknown Cuisine",
    recipeCount: 5,
    width: 200,
    onPress: action("onPress"),
  },
};

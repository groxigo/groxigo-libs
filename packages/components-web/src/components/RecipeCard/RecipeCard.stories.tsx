import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { RecipeCard } from "./RecipeCard";

const meta: Meta<typeof RecipeCard> = {
  title: "Components/RecipeCard",
  component: RecipeCard,
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
      options: ["default", "horizontal", "compact"],
    },
    difficulty: {
      control: "select",
      options: ["easy", "medium", "hard"],
    },
    badgeVariant: {
      control: "select",
      options: ["primary", "success", "danger", "warning", "info"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleRecipe = {
  id: "1",
  title: "Butter Chicken",
  imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400",
  description: "A creamy, tomato-based curry with tender chicken pieces",
  totalTime: 45,
  servings: 4,
  difficulty: "medium" as const,
};

export const Default: Story = {
  args: {
    ...sampleRecipe,
    onPress: action("onPress"),
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
      <RecipeCard
        {...sampleRecipe}
        size="sm"
        onPress={action("onPress-sm")}
      />
      <RecipeCard
        {...sampleRecipe}
        size="md"
        onPress={action("onPress-md")}
      />
      <RecipeCard
        {...sampleRecipe}
        size="lg"
        onPress={action("onPress-lg")}
      />
    </div>
  ),
};

export const HorizontalVariant: Story = {
  args: {
    ...sampleRecipe,
    variant: "horizontal",
    onPress: action("onPress"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "450px" }}>
        <Story />
      </div>
    ),
  ],
};

export const CompactVariant: Story = {
  args: {
    ...sampleRecipe,
    variant: "compact",
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
    ...sampleRecipe,
    badge: "Popular",
    badgeVariant: "success",
    onPress: action("onPress"),
  },
};

export const WithRating: Story = {
  args: {
    ...sampleRecipe,
    rating: 4.5,
    ratingCount: 123,
    cuisine: "Indian",
    onPress: action("onPress"),
  },
};

export const DifficultyLevels: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <RecipeCard
        {...sampleRecipe}
        title="Easy Recipe"
        difficulty="easy"
      />
      <RecipeCard
        {...sampleRecipe}
        title="Medium Recipe"
        difficulty="medium"
      />
      <RecipeCard
        {...sampleRecipe}
        title="Hard Recipe"
        difficulty="hard"
      />
    </div>
  ),
};

export const LongCookTime: Story = {
  args: {
    ...sampleRecipe,
    title: "Slow Cooked Beef Stew",
    totalTime: 180,
    difficulty: "easy",
    onPress: action("onPress"),
  },
};

export const RecipeGrid: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
      <RecipeCard
        id="1"
        title="Butter Chicken"
        imageUrl="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400"
        totalTime={45}
        servings={4}
        difficulty="medium"
        onPress={action("onPress-1")}
      />
      <RecipeCard
        id="2"
        title="Vegetable Biryani"
        imageUrl="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400"
        totalTime={60}
        servings={6}
        difficulty="hard"
        badge="Vegan"
        badgeVariant="success"
        onPress={action("onPress-2")}
      />
      <RecipeCard
        id="3"
        title="Dal Makhani"
        imageUrl="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400"
        totalTime={90}
        servings={4}
        difficulty="medium"
        onPress={action("onPress-3")}
      />
      <RecipeCard
        id="4"
        title="Paneer Tikka"
        imageUrl="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400"
        totalTime={30}
        servings={4}
        difficulty="easy"
        badge="Quick"
        badgeVariant="info"
        onPress={action("onPress-4")}
      />
      <RecipeCard
        id="5"
        title="Chicken Korma"
        imageUrl="https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400"
        totalTime={50}
        servings={4}
        difficulty="medium"
        rating={4.2}
        cuisine="Indian"
        onPress={action("onPress-5")}
      />
      <RecipeCard
        id="6"
        title="Samosa"
        imageUrl="https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400"
        totalTime={75}
        servings={8}
        difficulty="hard"
        badge="Popular"
        badgeVariant="warning"
        onPress={action("onPress-6")}
      />
    </div>
  ),
};

export const HorizontalList: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "450px" }}>
      <RecipeCard
        id="1"
        title="Quick Pasta Primavera"
        imageUrl="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400"
        description="A light and fresh pasta dish with seasonal vegetables"
        totalTime={25}
        servings={2}
        difficulty="easy"
        variant="horizontal"
        onPress={action("onPress-1")}
      />
      <RecipeCard
        id="2"
        title="Grilled Salmon with Herbs"
        imageUrl="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400"
        description="Perfectly grilled salmon with a herb crust"
        totalTime={35}
        servings={4}
        difficulty="medium"
        variant="horizontal"
        badge="Healthy"
        badgeVariant="success"
        onPress={action("onPress-2")}
      />
      <RecipeCard
        id="3"
        title="Homemade Pizza"
        imageUrl="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
        description="Classic margherita pizza with fresh mozzarella"
        totalTime={90}
        servings={4}
        difficulty="hard"
        variant="horizontal"
        rating={4.8}
        cuisine="Italian"
        onPress={action("onPress-3")}
      />
    </div>
  ),
};

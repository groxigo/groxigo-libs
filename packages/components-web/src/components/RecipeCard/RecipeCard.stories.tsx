import type { Meta, StoryObj } from '@storybook/react';
import { RecipeCard } from './RecipeCard';

const meta: Meta<typeof RecipeCard> = {
  title: 'Components/Recipe/RecipeCard',
  component: RecipeCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'recipe-001',
    title: 'Butter Chicken',
    cookTime: 45,
    difficulty: 'medium',
    servings: 4,
    onPress: () => {},
  },
};

export const WithTags: Story = {
  args: {
    id: 'recipe-002',
    title: 'Chicken Biryani',
    imageUrl: 'https://placehold.co/300x200/E8D5B7/333?text=Biryani',
    cookTime: 60,
    difficulty: 'hard',
    servings: 6,
    tags: [
      { name: 'Spicy', color: 'warning' },
      { name: 'Non-Veg', color: 'info' },
      { name: 'Festive', color: 'success' },
    ],
    onPress: () => {},
  },
};

export const QuickRecipe: Story = {
  args: {
    id: 'recipe-003',
    title: 'Mango Lassi',
    imageUrl: 'https://placehold.co/300x200/FFF3E0/333?text=Mango+Lassi',
    prepTime: 5,
    cookTime: 0,
    totalTime: 5,
    difficulty: 'easy',
    servings: 2,
    size: 'sm',
    onPress: () => {},
  },
};

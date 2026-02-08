import type { Meta, StoryObj } from '@storybook/react';
import { RecipeHero } from './RecipeHero';

const meta: Meta<typeof RecipeHero> = {
  title: 'Components/Recipe/RecipeHero',
  component: RecipeHero,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Butter Chicken',
    imageUrl: 'https://placehold.co/800x400/E8D5B7/333?text=Butter+Chicken',
  },
};

export const WithAllDetails: Story = {
  args: {
    title: 'Hyderabadi Chicken Biryani',
    imageUrl: 'https://placehold.co/800x400/FFF3E0/333?text=Biryani',
    cookTime: '1h 15m',
    difficulty: 'Hard',
    servings: 6,
    rating: 4.8,
  },
};

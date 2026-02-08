import type { Meta, StoryObj } from '@storybook/react';
import { RecipeCarousel } from './RecipeCarousel';

const sampleItems = Array.from({ length: 6 }, (_, i) => ({
  id: `recipe-${i + 1}`,
  title: `Recipe ${i + 1}`,
  imageUrl: `https://placehold.co/280x157/e2e8f0/475569?text=R${i + 1}`,
  totalTime: 15 + i * 10,
  difficulty: (['easy', 'medium', 'hard'] as const)[i % 3],
  servings: 2 + i,
}));

const meta: Meta<typeof RecipeCarousel> = {
  title: 'Components/Browse/RecipeCarousel',
  component: RecipeCarousel,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Popular Recipes',
    items: sampleItems,
    onSeeAll: () => {},
    onItemPress: (id) => console.log('Pressed:', id),
  },
};

export const NoArrows: Story = {
  args: {
    title: 'Quick & Easy',
    items: sampleItems.slice(0, 3),
    showArrows: false,
  },
};

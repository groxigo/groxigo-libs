import type { Meta, StoryObj } from '@storybook/react';
import { RecipeListGrid } from './RecipeListGrid';

const sampleItems = Array.from({ length: 8 }, (_, i) => ({
  id: `recipe-${i + 1}`,
  title: `Recipe ${i + 1}`,
  imageUrl: `https://placehold.co/200x112/e2e8f0/475569?text=R${i + 1}`,
  totalTime: 20 + i * 5,
  difficulty: (['easy', 'medium', 'hard'] as const)[i % 3],
}));

const meta: Meta<typeof RecipeListGrid> = {
  title: 'Components/Browse/RecipeListGrid',
  component: RecipeListGrid,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: sampleItems,
    onItemPress: () => {},
  },
};

export const TwoColumns: Story = {
  args: {
    items: sampleItems.slice(0, 4),
    columns: 2,
  },
};

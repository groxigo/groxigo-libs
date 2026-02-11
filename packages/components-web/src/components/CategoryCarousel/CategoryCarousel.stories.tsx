import type { Meta, StoryObj } from '@storybook/react';
import { CategoryCarousel } from './CategoryCarousel';

const sampleItems = Array.from({ length: 10 }, (_, i) => ({
  id: `cat-${i + 1}`,
  name: `Category ${i + 1}`,
  icon: ['🥬', '🥛', '🌶️', '🍚', '🫘', '🧈', '🍞', '🥤', '🍫', '🧂'][i],
}));

const meta: Meta<typeof CategoryCarousel> = {
  title: 'Components/Browse/CategoryCarousel',
  component: CategoryCarousel,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Shop by Category',
    items: sampleItems,
    onItemPress: () => {},
  },
};

export const WithImages: Story = {
  args: {
    title: 'Categories',
    items: sampleItems.slice(0, 6).map((item) => ({
      ...item,
      imageUrl: `https://placehold.co/80x80/e2e8f0/475569?text=${item.name.slice(0, 3)}`,
      icon: undefined,
    })),
    onItemPress: () => {},
  },
};

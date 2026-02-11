import type { Meta, StoryObj } from '@storybook/react';
import { CategoryListGrid } from './CategoryListGrid';

const sampleItems = Array.from({ length: 12 }, (_, i) => ({
  id: `cat-${i + 1}`,
  name: `Category ${i + 1}`,
  icon: ['🥬', '🥛', '🌶️', '🍚', '🫘', '🧈', '🍞', '🥤', '🍫', '🧂', '🥚', '🧀'][i],
}));

const meta: Meta<typeof CategoryListGrid> = {
  title: 'Components/Browse/CategoryListGrid',
  component: CategoryListGrid,
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

export const WithImages: Story = {
  args: {
    items: sampleItems.slice(0, 8).map((item) => ({
      ...item,
      imageUrl: `https://placehold.co/90x90/e2e8f0/475569?text=${item.name.slice(0, 3)}`,
      icon: undefined,
    })),
  },
};

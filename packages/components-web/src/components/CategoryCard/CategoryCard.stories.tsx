import type { Meta, StoryObj } from '@storybook/react';
import { CategoryCard } from './CategoryCard';

const meta: Meta<typeof CategoryCard> = {
  title: 'Components/Browse/CategoryCard',
  component: CategoryCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'cat-1',
    name: 'Fruits & Vegetables',
    imageUrl: 'https://placehold.co/100x100/e2e8f0/475569?text=Fruits',
    onPress: () => {},
  },
};

export const WithIcon: Story = {
  args: {
    id: 'cat-2',
    name: 'Dairy',
    icon: '🥛',
    onPress: () => {},
  },
};

export const WithCount: Story = {
  args: {
    id: 'cat-3',
    name: 'Spices & Masala',
    imageUrl: 'https://placehold.co/100x100/e2e8f0/475569?text=Spices',
    productCount: 45,
    onPress: () => {},
  },
};

export const Small: Story = {
  args: {
    id: 'cat-4',
    name: 'Snacks',
    icon: '🍿',
    size: 'sm',
    onPress: () => {},
  },
};

export const Circular: Story = {
  args: {
    id: 'cat-5',
    name: 'Beverages',
    imageUrl: 'https://placehold.co/100x100/e2e8f0/475569?text=Drinks',
    variant: 'circular',
    onPress: () => {},
  },
};

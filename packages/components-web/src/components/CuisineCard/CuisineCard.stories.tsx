import type { Meta, StoryObj } from '@storybook/react';
import { CuisineCard } from './CuisineCard';

const meta: Meta<typeof CuisineCard> = {
  title: 'Components/Recipe/CuisineCard',
  component: CuisineCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Indian: Story = {
  args: {
    slug: 'indian',
    name: 'Indian',
    imageUrl: 'https://placehold.co/240x160/E8D5B7/333?text=Indian',
    recipeCount: 142,
    onPress: () => {},
  },
};

export const Pakistani: Story = {
  args: {
    slug: 'pakistani',
    name: 'Pakistani',
    imageUrl: 'https://placehold.co/240x160/D4E6B5/333?text=Pakistani',
    recipeCount: 87,
    onPress: () => {},
  },
};

export const Lebanese: Story = {
  args: {
    slug: 'lebanese',
    name: 'Lebanese',
    imageUrl: 'https://placehold.co/240x160/FFE0B2/333?text=Lebanese',
    recipeCount: 64,
    onPress: () => {},
  },
};

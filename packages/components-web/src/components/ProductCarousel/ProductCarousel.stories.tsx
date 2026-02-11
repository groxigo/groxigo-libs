import type { Meta, StoryObj } from '@storybook/react';
import { ProductCarousel } from './ProductCarousel';

const sampleItems = Array.from({ length: 8 }, (_, i) => ({
  id: `product-${i + 1}`,
  name: `Product ${i + 1}`,
  price: 4.99 + i * 1.5,
  imageUrl: `https://placehold.co/130x130/e2e8f0/475569?text=P${i + 1}`,
  weight: `${(i + 1) * 100}g`,
}));

const meta: Meta<typeof ProductCarousel> = {
  title: 'Components/Browse/ProductCarousel',
  component: ProductCarousel,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Trending Now',
    items: sampleItems,
    onSeeAll: () => {},
    onItemPress: () => {},
  },
};

export const NoArrows: Story = {
  args: {
    title: 'New Arrivals',
    items: sampleItems.slice(0, 4),
    showArrows: false,
  },
};

export const NoTitle: Story = {
  args: {
    items: sampleItems,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { ProductListGrid } from './ProductListGrid';

const sampleItems = Array.from({ length: 12 }, (_, i) => ({
  id: `product-${i + 1}`,
  name: `Product ${i + 1}`,
  price: 3.99 + i * 0.5,
  imageUrl: `https://placehold.co/140x140/e2e8f0/475569?text=P${i + 1}`,
  weight: `${(i + 1) * 50}g`,
}));

const meta: Meta<typeof ProductListGrid> = {
  title: 'Components/Browse/ProductListGrid',
  component: ProductListGrid,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: sampleItems,
    onItemPress: (id) => console.log('Pressed:', id),
  },
};

export const ThreeColumns: Story = {
  args: {
    items: sampleItems.slice(0, 9),
    columns: 3,
    onItemPress: (id) => console.log('Pressed:', id),
  },
};

export const CustomGap: Story = {
  args: {
    items: sampleItems.slice(0, 6),
    gap: 24,
  },
};

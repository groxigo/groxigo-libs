import type { Meta, StoryObj } from '@storybook/react';
import { ProductTile } from './ProductTile';

const meta: Meta<typeof ProductTile> = {
  title: 'Components/Product/ProductTile',
  component: ProductTile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    badgeVariant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error'],
    },
    outOfStock: { control: 'boolean' },
    showAddButton: { control: 'boolean' },
    showFavorite: { control: 'boolean' },
    isFavorite: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'prod-001',
    name: 'Turmeric Powder',
    imageUrl: 'https://placehold.co/200x200/FFC107/333?text=Turmeric',
    price: 4.99,
    weight: '200g',
    brand: 'Tata Sampann',
    rating: 4.3,
    reviewCount: 128,
    showAddButton: true,
    showFavorite: true,
    onAddPress: () => {},
    onFavoritePress: () => {},
    onPress: () => {},
  },
};

export const WithDiscount: Story = {
  args: {
    id: 'prod-002',
    name: 'Garam Masala',
    imageUrl: 'https://placehold.co/200x200/FF5722/fff?text=Masala',
    price: 3.49,
    originalPrice: 5.99,
    discountPercent: 42,
    weight: '100g',
    brand: 'MDH',
    rating: 4.7,
    reviewCount: 312,
    badge: 'Best Seller',
    badgeVariant: 'success',
    showAddButton: true,
    showFavorite: true,
    onAddPress: () => {},
    onFavoritePress: () => {},
    onPress: () => {},
  },
};

export const CategoryMode: Story = {
  args: {
    id: 'cat-001',
    name: 'Fruits & Vegetables',
    imageUrl: 'https://placehold.co/200x200/4CAF50/fff?text=Fruits',
    showAddButton: false,
    showFavorite: false,
    onPress: () => {},
  },
};

export const OutOfStock: Story = {
  args: {
    id: 'prod-003',
    name: 'Alphonso Mango Pulp',
    imageUrl: 'https://placehold.co/200x200/FF9800/fff?text=Mango',
    price: 6.99,
    weight: '850g',
    outOfStock: true,
    onPress: () => {},
  },
};

export const WithFavorite: Story = {
  args: {
    id: 'prod-004',
    name: 'Biryani Masala',
    imageUrl: 'https://placehold.co/200x200/9C27B0/fff?text=Biryani',
    price: 2.49,
    weight: '60g',
    brand: 'Shan',
    rating: 4.5,
    reviewCount: 89,
    showFavorite: true,
    isFavorite: true,
    showAddButton: true,
    onAddPress: () => {},
    onFavoritePress: () => {},
    onPress: () => {},
  },
};

export const NoBrand: Story = {
  args: {
    id: 'prod-005',
    name: 'Organic Basmati Rice',
    imageUrl: 'https://placehold.co/200x200/8BC34A/fff?text=Rice',
    price: 12.99,
    weight: '5lb',
    showAddButton: true,
    onAddPress: () => {},
    onPress: () => {},
  },
};

export const TileSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      <ProductTile
        id="size-sm"
        name="Cumin Seeds"
        imageUrl="https://placehold.co/200x200/795548/fff?text=Cumin"
        price={1.99}
        weight="50g"
        size="sm"
      />
      <ProductTile
        id="size-md"
        name="Cumin Seeds"
        imageUrl="https://placehold.co/200x200/795548/fff?text=Cumin"
        price={1.99}
        weight="50g"
        size="md"
      />
      <ProductTile
        id="size-lg"
        name="Cumin Seeds"
        imageUrl="https://placehold.co/200x200/795548/fff?text=Cumin"
        price={1.99}
        weight="50g"
        size="lg"
      />
    </div>
  ),
};

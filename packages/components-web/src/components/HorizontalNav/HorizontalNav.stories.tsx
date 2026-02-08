import type { Meta, StoryObj } from '@storybook/react';
import { HorizontalNav } from './HorizontalNav';

const meta: Meta<typeof HorizontalNav> = {
  title: 'Components/Navigation/HorizontalNav',
  component: HorizontalNav,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { key: 'home', label: 'Home' },
      { key: 'categories', label: 'Categories' },
      { key: 'recipes', label: 'Recipes' },
      { key: 'deals', label: 'Deals', badge: 5 },
      { key: 'brands', label: 'Brands' },
    ],
    activeKey: 'home',
    onSelect: () => {},
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { key: 'home', label: 'Home', icon: '\uD83C\uDFE0' },
      { key: 'categories', label: 'Categories', icon: '\uD83D\uDCE6' },
      { key: 'recipes', label: 'Recipes', icon: '\uD83C\uDF73' },
      { key: 'deals', label: 'Deals', icon: '\uD83C\uDF1F', badge: 3 },
      { key: 'brands', label: 'Brands', icon: '\uD83C\uDFF7\uFE0F' },
    ],
    activeKey: 'recipes',
    onSelect: () => {},
  },
};

export const NoneActive: Story = {
  args: {
    items: [
      { key: 'home', label: 'Home' },
      { key: 'categories', label: 'Categories' },
      { key: 'recipes', label: 'Recipes' },
      { key: 'deals', label: 'Deals' },
      { key: 'brands', label: 'Brands' },
    ],
    onSelect: () => {},
  },
};

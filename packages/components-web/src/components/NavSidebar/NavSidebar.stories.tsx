import type { Meta, StoryObj } from '@storybook/react';
import { NavSidebar } from './NavSidebar';

const meta: Meta<typeof NavSidebar> = {
  title: 'Components/Navigation/NavSidebar',
  component: NavSidebar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { key: 'home', label: 'Home', icon: '\uD83C\uDFE0' },
      { key: 'orders', label: 'My Orders', icon: '\uD83D\uDCE6', badge: 2 },
      { key: 'favorites', label: 'Favorites', icon: '\u2764\uFE0F' },
      { key: 'recipes', label: 'Recipes', icon: '\uD83C\uDF73' },
      { key: 'rewards', label: 'Rewards', icon: '\uD83C\uDFC6' },
      { key: 'settings', label: 'Settings', icon: '\u2699\uFE0F' },
    ],
    activeKey: 'home',
    onSelect: () => {},
  },
};

export const Collapsed: Story = {
  args: {
    items: [
      { key: 'home', label: 'Home', icon: '\uD83C\uDFE0' },
      { key: 'orders', label: 'My Orders', icon: '\uD83D\uDCE6', badge: 2 },
      { key: 'favorites', label: 'Favorites', icon: '\u2764\uFE0F' },
      { key: 'recipes', label: 'Recipes', icon: '\uD83C\uDF73' },
      { key: 'rewards', label: 'Rewards', icon: '\uD83C\uDFC6' },
      { key: 'settings', label: 'Settings', icon: '\u2699\uFE0F' },
    ],
    activeKey: 'orders',
    collapsed: true,
    onSelect: () => {},
  },
};

export const WithNested: Story = {
  args: {
    items: [
      { key: 'home', label: 'Home', icon: '\uD83C\uDFE0' },
      {
        key: 'categories',
        label: 'Categories',
        icon: '\uD83D\uDCE6',
        children: [
          { key: 'spices', label: 'Spices & Seasonings' },
          { key: 'rice', label: 'Rice & Grains' },
          { key: 'lentils', label: 'Lentils & Beans' },
          { key: 'snacks', label: 'Snacks & Sweets' },
        ],
      },
      {
        key: 'recipes',
        label: 'Recipes',
        icon: '\uD83C\uDF73',
        children: [
          { key: 'indian', label: 'Indian' },
          { key: 'pakistani', label: 'Pakistani' },
          { key: 'middle-eastern', label: 'Middle Eastern' },
        ],
      },
      { key: 'deals', label: 'Deals', icon: '\uD83C\uDF1F', badge: 8 },
      { key: 'settings', label: 'Settings', icon: '\u2699\uFE0F' },
    ],
    activeKey: 'spices',
    onSelect: () => {},
  },
};

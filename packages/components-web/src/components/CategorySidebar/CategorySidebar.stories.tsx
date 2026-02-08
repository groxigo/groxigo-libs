import type { Meta, StoryObj } from '@storybook/react';
import { CategorySidebar } from './CategorySidebar';

const meta: Meta<typeof CategorySidebar> = {
  title: 'Components/Browse/CategorySidebar',
  component: CategorySidebar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '260px', height: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCategories = [
  {
    id: 'fruits',
    label: 'Fruits & Vegetables',
    subcategories: [
      { id: 'fresh-fruits', label: 'Fresh Fruits' },
      { id: 'fresh-vegetables', label: 'Fresh Vegetables' },
      { id: 'herbs', label: 'Fresh Herbs' },
    ],
  },
  {
    id: 'dairy',
    label: 'Dairy & Eggs',
    subcategories: [
      { id: 'milk', label: 'Milk' },
      { id: 'yogurt', label: 'Yogurt & Lassi' },
      { id: 'paneer', label: 'Paneer & Cheese' },
      { id: 'eggs', label: 'Eggs' },
    ],
  },
  {
    id: 'spices',
    label: 'Spices & Masalas',
    subcategories: [
      { id: 'whole-spices', label: 'Whole Spices' },
      { id: 'ground-spices', label: 'Ground Spices' },
      { id: 'blended-masalas', label: 'Blended Masalas' },
    ],
  },
  {
    id: 'rice',
    label: 'Rice & Flour',
    subcategories: [
      { id: 'basmati', label: 'Basmati Rice' },
      { id: 'atta', label: 'Atta & Flour' },
      { id: 'dal', label: 'Dal & Lentils' },
    ],
  },
  { id: 'snacks', label: 'Snacks & Namkeen' },
  { id: 'beverages', label: 'Beverages' },
  { id: 'frozen', label: 'Frozen Foods' },
  { id: 'sweets', label: 'Sweets & Desserts' },
];

export const Default: Story = {
  args: {
    categories: sampleCategories,
    onCategorySelect: () => {},
    onSubcategorySelect: () => {},
    onSearchChange: () => {},
  },
};

export const WithSelection: Story = {
  args: {
    categories: sampleCategories,
    selectedCategoryId: 'spices',
    selectedSubcategoryId: 'ground-spices',
    onCategorySelect: () => {},
    onSubcategorySelect: () => {},
    onSearchChange: () => {},
  },
};

export const WithSearchValue: Story = {
  args: {
    categories: sampleCategories,
    searchValue: 'rice',
    onCategorySelect: () => {},
    onSubcategorySelect: () => {},
    onSearchChange: () => {},
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { FilterBar } from './FilterBar';

const meta: Meta<typeof FilterBar> = {
  title: 'Components/Filters/FilterBar',
  component: FilterBar,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filters: [
      { id: 'all', label: 'All', count: 248 },
      { id: 'vegetarian', label: 'Vegetarian', count: 96 },
      { id: 'vegan', label: 'Vegan', count: 42 },
      { id: 'halal', label: 'Halal', count: 78 },
      { id: 'gluten-free', label: 'Gluten-Free', count: 35 },
    ],
    multiSelect: true,
    showCounts: true,
    onFiltersChange: () => {},
  },
};

export const WithSelection: Story = {
  args: {
    filters: [
      { id: 'all', label: 'All', count: 248 },
      { id: 'vegetarian', label: 'Vegetarian', count: 96 },
      { id: 'vegan', label: 'Vegan', count: 42 },
      { id: 'halal', label: 'Halal', count: 78 },
      { id: 'gluten-free', label: 'Gluten-Free', count: 35 },
    ],
    selectedFilters: ['vegetarian', 'halal'],
    multiSelect: true,
    showCounts: true,
    onFiltersChange: () => {},
  },
};

export const SingleSelect: Story = {
  args: {
    filters: [
      { id: 'all', label: 'All' },
      { id: 'vegetarian', label: 'Vegetarian' },
      { id: 'vegan', label: 'Vegan' },
      { id: 'halal', label: 'Halal' },
      { id: 'gluten-free', label: 'Gluten-Free' },
    ],
    selectedFilters: ['halal'],
    multiSelect: false,
    onFiltersChange: () => {},
  },
};

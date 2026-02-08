import type { Meta, StoryObj } from '@storybook/react';
import { IngredientRow } from './IngredientRow';

const meta: Meta<typeof IngredientRow> = {
  title: 'Components/Recipe/IngredientRow',
  component: IngredientRow,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Basmati Rice',
    quantity: '2 cups',
    onToggle: () => {},
  },
};

export const Checked: Story = {
  args: {
    name: 'Chicken Thighs',
    quantity: '500g',
    checked: true,
    onToggle: () => {},
  },
};

export const LongIngredient: Story = {
  args: {
    name: 'Garam Masala Powder',
    quantity: '1 tsp',
    checked: false,
    onToggle: () => {},
  },
};

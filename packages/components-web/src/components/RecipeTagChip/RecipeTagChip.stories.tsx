import type { Meta, StoryObj } from '@storybook/react';
import { RecipeTagChip } from './RecipeTagChip';

const meta: Meta<typeof RecipeTagChip> = {
  title: 'Components/Recipe/RecipeTagChip',
  component: RecipeTagChip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Vegetarian',
  },
};

export const Success: Story = {
  args: {
    label: 'Quick & Easy',
    colorScheme: 'success',
  },
};

export const Clickable: Story = {
  args: {
    label: 'Under 30 min',
    colorScheme: 'info',
    onPress: () => {},
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { MealTypeCard } from './MealTypeCard';

const meta: Meta<typeof MealTypeCard> = {
  title: 'Components/Recipe/MealTypeCard',
  component: MealTypeCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Breakfast: Story = {
  args: {
    label: 'Breakfast',
    emoji: '\u{1F373}',
    onPress: () => {},
  },
};

export const Lunch: Story = {
  args: {
    label: 'Lunch',
    emoji: '\u{1F35B}',
    selected: false,
    onPress: () => {},
  },
};

export const DinnerSelected: Story = {
  args: {
    label: 'Dinner',
    emoji: '\u{1F35D}',
    selected: true,
    onPress: () => {},
  },
};

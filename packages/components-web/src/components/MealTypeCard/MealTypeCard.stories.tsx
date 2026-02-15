import { useState } from 'react';
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

export const MealTypeRow: Story = {
  render: () => {
    const meals = [
      { label: 'Breakfast', emoji: '\u{1F373}', slug: 'breakfast' },
      { label: 'Lunch', emoji: '\u{1F35B}', slug: 'lunch' },
      { label: 'Dinner', emoji: '\u{1F35D}', slug: 'dinner' },
      { label: 'Snacks', emoji: '\u{1F36A}', slug: 'snacks' },
      { label: 'Desserts', emoji: '\u{1F370}', slug: 'desserts' },
      { label: 'Drinks', emoji: '\u{1F9C3}', slug: 'drinks' },
    ];

    const [active, setActive] = useState('breakfast');

    return (
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {meals.map((m) => (
          <MealTypeCard
            key={m.slug}
            label={m.label}
            emoji={m.emoji}
            selected={active === m.slug}
            onPress={() => setActive(m.slug)}
          />
        ))}
      </div>
    );
  },
};

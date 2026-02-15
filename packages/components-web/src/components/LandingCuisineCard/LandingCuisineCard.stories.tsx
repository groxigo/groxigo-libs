import type { Meta, StoryObj } from '@storybook/react';
import { LandingCuisineCard } from './LandingCuisineCard';

const meta: Meta<typeof LandingCuisineCard> = {
  title: 'Components/Landing/LandingCuisineCard',
  component: LandingCuisineCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Indian',
    imageUrl: 'https://placehold.co/200x200/FFC107/333?text=Indian',
    recipeCount: 142,
    onPress: () => {},
  },
};

export const WithoutRecipeCount: Story = {
  args: {
    name: 'Pakistani',
    imageUrl: 'https://placehold.co/200x200/4CAF50/fff?text=Pakistani',
    onPress: () => {},
  },
};

export const WithoutImage: Story = {
  args: {
    name: 'Bangladeshi',
    recipeCount: 38,
    onPress: () => {},
  },
};

export const AsLink: Story = {
  args: {
    name: 'Middle Eastern',
    imageUrl: 'https://placehold.co/200x200/4CAF50/fff?text=Arab',
    recipeCount: 64,
    href: '/products?cuisine=middle-eastern',
  },
};

export const CuisineGrid: Story = {
  render: () => {
    const cuisines = [
      { name: 'Indian', color: 'FFC107', count: 142 },
      { name: 'Pakistani', color: '4CAF50', count: 87 },
      { name: 'Bangladeshi', color: '2196F3', count: 38 },
      { name: 'Nepali', color: 'FF5722', count: 25 },
      { name: 'Sri Lankan', color: '9C27B0', count: 31 },
      { name: 'Arab', color: 'E91E63', count: 64 },
    ];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '16px', width: '100%', maxWidth: '800px' }}>
        {cuisines.map((c) => (
          <LandingCuisineCard
            key={c.name}
            name={c.name}
            imageUrl={`https://placehold.co/200x200/${c.color}/fff?text=${c.name.charAt(0)}`}
            recipeCount={c.count}
            onPress={() => {}}
          />
        ))}
      </div>
    );
  },
};

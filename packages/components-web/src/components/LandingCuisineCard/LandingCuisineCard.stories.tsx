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
    imageUrl: 'https://placehold.co/120x120/FFC107/333?text=🇮🇳',
    onPress: () => {},
  },
};

export const WithoutImage: Story = {
  args: {
    name: 'Pakistani',
    onPress: () => {},
  },
};

export const AsLink: Story = {
  args: {
    name: 'Middle Eastern',
    imageUrl: 'https://placehold.co/120x120/4CAF50/fff?text=🇸🇦',
    href: '/products?cuisine=middle-eastern',
  },
};

export const CuisineGrid: Story = {
  render: () => {
    const cuisines = [
      { name: 'Indian', color: 'FFC107' },
      { name: 'Pakistani', color: '4CAF50' },
      { name: 'Bangladeshi', color: '2196F3' },
      { name: 'Nepali', color: 'FF5722' },
      { name: 'Sri Lankan', color: '9C27B0' },
      { name: 'Arab', color: 'E91E63' },
    ];

    return (
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {cuisines.map((c) => (
          <LandingCuisineCard
            key={c.name}
            name={c.name}
            imageUrl={`https://placehold.co/120x120/${c.color}/fff?text=${c.name.charAt(0)}`}
            onPress={() => {}}
          />
        ))}
      </div>
    );
  },
};

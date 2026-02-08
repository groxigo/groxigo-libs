import type { Meta, StoryObj } from '@storybook/react';
import { BannerCard } from './BannerCard';

const meta: Meta<typeof BannerCard> = {
  title: 'Components/Browse/BannerCard',
  component: BannerCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Fresh Mangoes Season',
    subtitle: 'Get Alphonso mangoes at 20% off',
    ctaText: 'Shop Now',
    gradientFrom: '#FF6B35',
    gradientTo: '#F7931E',
    onCtaPress: () => {},
    onPress: () => {},
  },
};

export const Large: Story = {
  args: {
    title: 'Ramadan Special',
    subtitle: 'Stock up on dates, dried fruits, and essentials for the holy month',
    ctaText: 'Explore Offers',
    size: 'lg',
    gradientFrom: '#1B5E20',
    gradientTo: '#43A047',
    onCtaPress: () => {},
    onPress: () => {},
  },
};

export const Small: Story = {
  args: {
    title: 'Free Delivery',
    subtitle: 'On orders over $35',
    ctaText: 'Learn More',
    size: 'sm',
    gradientFrom: '#1565C0',
    gradientTo: '#42A5F5',
    onCtaPress: () => {},
    onPress: () => {},
  },
};

export const WithImage: Story = {
  args: {
    title: 'Diwali Sweets',
    subtitle: 'Celebrate with traditional mithai and dry fruits',
    ctaText: 'Order Now',
    imageUrl: 'https://placehold.co/400x200/FF9800/fff?text=Diwali+Sweets',
    onCtaPress: () => {},
    onPress: () => {},
  },
};

export const NoCTA: Story = {
  args: {
    title: 'New Arrivals This Week',
    subtitle: 'Fresh produce from local farms',
    gradientFrom: '#4CAF50',
    gradientTo: '#81C784',
    onPress: () => {},
  },
};

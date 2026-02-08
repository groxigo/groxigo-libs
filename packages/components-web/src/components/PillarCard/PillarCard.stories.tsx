import type { Meta, StoryObj } from '@storybook/react';
import { PillarCard } from './PillarCard';

const meta: Meta<typeof PillarCard> = {
  title: 'Components/Landing/PillarCard',
  component: PillarCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '2,000+ Authentic Products',
    description:
      'From basmati rice to freshly ground spices, find everything you need for authentic South Asian and Middle Eastern cooking.',
    ctaLabel: 'Browse Products →',
    ctaHref: '/products',
    imageUrl: 'https://placehold.co/400x225/e2e8f0/475569?text=Products',
  },
};

export const Recipes: Story = {
  args: {
    title: 'Curated Recipe Collections',
    description:
      'Step-by-step recipes from professional chefs, with one-tap ingredient shopping for every dish.',
    ctaLabel: 'Explore Recipes →',
    ctaHref: '/recipes',
    imageUrl: 'https://placehold.co/400x225/fef3c7/92400e?text=Recipes',
  },
};

export const WithoutImage: Story = {
  args: {
    title: 'Same-Day Delivery',
    description:
      'Get your groceries delivered to your door within hours, not days.',
    ctaLabel: 'Learn More →',
    ctaHref: '/about',
  },
};

export const PillarPair: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', maxWidth: 800 }}>
      <PillarCard
        title="2,000+ Authentic Products"
        description="From basmati rice to freshly ground spices, find everything for authentic cooking."
        ctaLabel="Browse Products →"
        ctaHref="/products"
        imageUrl="https://placehold.co/400x225/e2e8f0/475569?text=Products"
      />
      <PillarCard
        title="Curated Recipe Collections"
        description="Step-by-step recipes with one-tap ingredient shopping for every dish."
        ctaLabel="Explore Recipes →"
        ctaHref="/recipes"
        imageUrl="https://placehold.co/400x225/fef3c7/92400e?text=Recipes"
      />
    </div>
  ),
};

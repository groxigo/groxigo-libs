import type { Meta, StoryObj } from '@storybook/react';
import { BrandCard } from './BrandCard';

const meta: Meta<typeof BrandCard> = {
  title: 'Components/Browse/BrandCard',
  component: BrandCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Haldiram's",
    logoUrl: 'https://placehold.co/80x80/FFC107/333?text=H',
    onPress: () => {},
  },
};

export const WithoutLogo: Story = {
  args: {
    name: 'MDH Spices',
    onPress: () => {},
  },
};

export const BrandGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', width: '400px' }}>
      <BrandCard
        name="Haldiram's"
        logoUrl="https://placehold.co/80x80/FFC107/333?text=H"
      />
      <BrandCard
        name="MDH"
        logoUrl="https://placehold.co/80x80/E53935/fff?text=MDH"
      />
      <BrandCard
        name="Shan"
        logoUrl="https://placehold.co/80x80/43A047/fff?text=S"
      />
      <BrandCard
        name="Tata"
        logoUrl="https://placehold.co/80x80/1565C0/fff?text=T"
      />
      <BrandCard
        name="Patanjali"
        logoUrl="https://placehold.co/80x80/FF9800/fff?text=P"
      />
      <BrandCard
        name="Dabur"
        logoUrl="https://placehold.co/80x80/2E7D32/fff?text=D"
      />
      <BrandCard
        name="National"
        logoUrl="https://placehold.co/80x80/9C27B0/fff?text=N"
      />
      <BrandCard
        name="Ahmed"
        logoUrl="https://placehold.co/80x80/795548/fff?text=A"
      />
    </div>
  ),
};

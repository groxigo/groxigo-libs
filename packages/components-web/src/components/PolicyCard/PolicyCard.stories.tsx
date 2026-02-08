import type { Meta, StoryObj } from '@storybook/react';
import { PolicyCard } from './PolicyCard';

const meta: Meta<typeof PolicyCard> = {
  title: 'Components/Info/PolicyCard',
  component: PolicyCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Return Policy',
    message:
      'Items can be returned within 24 hours of delivery if they are damaged or incorrect. Perishable items must be reported within 2 hours.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Allergen Notice',
    message:
      'This product is manufactured in a facility that processes peanuts, tree nuts, wheat, milk, and soy. Please check the label carefully.',
  },
};

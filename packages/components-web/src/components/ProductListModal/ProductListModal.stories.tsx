import type { Meta, StoryObj } from '@storybook/react';
import { ProductListModal } from './ProductListModal';

const meta: Meta<typeof ProductListModal> = {
  title: 'Components/Modals/ProductListModal',
  component: ProductListModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Spices & Seasonings',
    children:
      'Browse our wide selection of authentic South Asian and Middle Eastern spices, seasonings, and spice blends. From whole cumin seeds to ground turmeric, find everything you need for your kitchen.',
  },
};

export const WithCustomTitle: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Weekly Deals',
    children:
      'Check out this week\'s best deals on fresh produce, pantry staples, and frozen items. Up to 30% off on select items. Limited time offer while supplies last.',
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: 'Products',
    children: 'This content is not visible when the modal is closed.',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { AddressCard } from './AddressCard';

const meta: Meta<typeof AddressCard> = {
  title: 'Components/Checkout/AddressCard',
  component: AddressCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'addr-001',
    type: 'home',
    label: 'Home',
    line1: '123 Oak Street, Apt 4B',
    line2: 'Edison, NJ 08817',
    onSelect: () => {},
    onEdit: () => {},
    onDelete: () => {},
  },
};

export const Selected: Story = {
  args: {
    id: 'addr-001',
    type: 'home',
    label: 'Home',
    line1: '123 Oak Street, Apt 4B',
    line2: 'Edison, NJ 08817',
    selected: true,
    onSelect: () => {},
    onEdit: () => {},
    onDelete: () => {},
  },
};

export const WorkAddress: Story = {
  args: {
    id: 'addr-002',
    type: 'work',
    label: 'Work',
    line1: '456 Corporate Blvd, Suite 200',
    line2: 'Piscataway, NJ 08854',
    onSelect: () => {},
    onEdit: () => {},
  },
};

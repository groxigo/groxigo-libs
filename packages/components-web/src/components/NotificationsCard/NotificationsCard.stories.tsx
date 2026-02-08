import type { Meta, StoryObj } from '@storybook/react';
import { NotificationsCard } from './NotificationsCard';

const meta: Meta<typeof NotificationsCard> = {
  title: 'Components/Account/NotificationsCard',
  component: NotificationsCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    settings: [
      { key: 'orders', label: 'Order Updates', enabled: true },
      { key: 'promotions', label: 'Promotions & Deals', enabled: false },
      { key: 'delivery', label: 'Delivery Notifications', enabled: true },
      { key: 'newsletter', label: 'Weekly Newsletter', enabled: false },
    ],
    onToggle: (key, enabled) => console.log(key, enabled),
  },
};

export const AllEnabled: Story = {
  args: {
    settings: [
      { key: 'orders', label: 'Order Updates', enabled: true },
      { key: 'promotions', label: 'Promotions & Deals', enabled: true },
      { key: 'delivery', label: 'Delivery Notifications', enabled: true },
    ],
    onToggle: (key, enabled) => console.log(key, enabled),
  },
};

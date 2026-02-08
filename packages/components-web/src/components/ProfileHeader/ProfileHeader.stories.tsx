import type { Meta, StoryObj } from '@storybook/react';
import { ProfileHeader } from './ProfileHeader';

const meta: Meta<typeof ProfileHeader> = {
  title: 'Components/Account/ProfileHeader',
  component: ProfileHeader,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+1 (732) 555-0147',
    onEdit: () => {},
  },
};

export const WithAvatar: Story = {
  args: {
    name: 'Rahul Patel',
    email: 'rahul.patel@email.com',
    phone: '+1 (201) 555-0198',
    avatarUrl: 'https://placehold.co/80x80/E8D5B7/333?text=RP',
    onEdit: () => {},
  },
};

export const MinimalInfo: Story = {
  args: {
    name: 'Ayesha Khan',
  },
};

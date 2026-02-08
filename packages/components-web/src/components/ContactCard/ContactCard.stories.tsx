import type { Meta, StoryObj } from '@storybook/react';
import { ContactCard } from './ContactCard';

const meta: Meta<typeof ContactCard> = {
  title: 'Components/Account/ContactCard',
  component: ContactCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    email: 'support@groxigo.com',
    phone: '+1 (555) 123-4567',
    onContact: () => {},
  },
};

export const WithDescription: Story = {
  args: {
    title: 'Need Help?',
    description: 'Our support team is available 24/7 to assist you with any questions.',
    email: 'help@groxigo.com',
    phone: '+1 (555) 987-6543',
    onContact: () => {},
  },
};

export const EmailOnly: Story = {
  args: {
    email: 'feedback@groxigo.com',
  },
};

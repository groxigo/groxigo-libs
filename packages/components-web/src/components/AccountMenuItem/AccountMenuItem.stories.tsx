import type { Meta, StoryObj } from '@storybook/react';
import { AccountMenuItem } from './AccountMenuItem';

const meta: Meta<typeof AccountMenuItem> = {
  title: 'Components/Account/AccountMenuItem',
  component: AccountMenuItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: '\u{1F4E6}',
    label: 'My Orders',
    onPress: () => {},
  },
};

export const WithSubtitle: Story = {
  args: {
    icon: '\u{1F4CD}',
    label: 'Saved Addresses',
    subtitle: '3 addresses saved',
    onPress: () => {},
  },
};

export const WithoutChevron: Story = {
  args: {
    icon: '\u{1F4B3}',
    label: 'Payment Methods',
    subtitle: 'Visa ending in 4242',
    showChevron: false,
    onPress: () => {},
  },
};

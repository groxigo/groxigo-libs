import type { Meta, StoryObj } from '@storybook/react';
import { AddressForm } from './AddressForm';

const meta: Meta<typeof AddressForm> = {
  title: 'Components/Forms/AddressForm',
  component: AddressForm,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    title: 'Add New Address',
    onSubmit: () => {},
    onCancel: () => {},
  },
};

export const Prefilled: Story = {
  args: {
    title: 'Edit Address',
    initialValues: {
      fullName: 'Priya Sharma',
      street: '1234 Spice Market Lane',
      apartment: 'Apt 5B',
      city: 'Edison',
      state: 'NJ',
      zip: '08817',
      country: 'US',
      phone: '+1 (732) 555-0198',
      type: 'home',
      isDefault: true,
    },
    onSubmit: () => {},
    onCancel: () => {},
  },
};

export const Loading: Story = {
  args: {
    title: 'Add New Address',
    isLoading: true,
    initialValues: {
      fullName: 'Ahmed Khan',
      street: '567 Halal Ave',
      apartment: '',
      city: 'Dearborn',
      state: 'MI',
      zip: '48126',
      country: 'US',
      phone: '+1 (313) 555-0245',
      type: 'work',
      isDefault: false,
    },
    onSubmit: () => {},
    onCancel: () => {},
  },
};

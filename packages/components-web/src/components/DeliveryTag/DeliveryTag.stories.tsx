import type { Meta, StoryObj } from '@storybook/react';
import { DeliveryTag } from './DeliveryTag';

const meta: Meta<typeof DeliveryTag> = {
  title: 'Components/Checkout/DeliveryTag',
  component: DeliveryTag,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Express: Story = {
  args: {
    variant: 'express',
    label: '9 MINS',
  },
};

export const Standard: Story = {
  args: {
    variant: 'standard',
    label: 'Standard 2-3 hrs',
  },
};

export const Scheduled: Story = {
  args: {
    variant: 'scheduled',
    label: 'Scheduled Delivery',
  },
};

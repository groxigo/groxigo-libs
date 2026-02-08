import type { Meta, StoryObj } from '@storybook/react';
import { CheckoutStepper } from './CheckoutStepper';

const checkoutSteps = [
  { key: 'address', label: 'Address' },
  { key: 'payment', label: 'Payment' },
  { key: 'review', label: 'Review' },
  { key: 'confirm', label: 'Confirm' },
];

const meta: Meta<typeof CheckoutStepper> = {
  title: 'Components/Checkout/CheckoutStepper',
  component: CheckoutStepper,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const StepOne: Story = {
  args: {
    steps: checkoutSteps,
    currentStep: 0,
  },
};

export const StepTwo: Story = {
  args: {
    steps: checkoutSteps,
    currentStep: 1,
  },
};

export const Complete: Story = {
  args: {
    steps: checkoutSteps,
    currentStep: 4,
  },
};

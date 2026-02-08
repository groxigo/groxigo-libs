import type { Meta, StoryObj } from '@storybook/react';
import { AuthCard } from './AuthCard';

const meta: Meta<typeof AuthCard> = {
  title: 'Components/Auth/AuthCard',
  component: AuthCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SignIn: Story = {
  args: {
    mode: 'signin',
    onSubmit: () => {},
    onGoogleAuth: () => {},
    onAppleAuth: () => {},
    onToggleMode: () => {},
    onForgotPassword: () => {},
  },
};

export const SignUp: Story = {
  args: {
    mode: 'signup',
    onSubmit: () => {},
    onGoogleAuth: () => {},
    onAppleAuth: () => {},
    onToggleMode: () => {},
  },
};

export const WithError: Story = {
  args: {
    mode: 'signin',
    error: 'Invalid email or password. Please try again.',
    onSubmit: () => {},
    onGoogleAuth: () => {},
    onAppleAuth: () => {},
    onToggleMode: () => {},
    onForgotPassword: () => {},
  },
};

export const Loading: Story = {
  args: {
    mode: 'signin',
    isLoading: true,
    onSubmit: () => {},
    onGoogleAuth: () => {},
    onAppleAuth: () => {},
    onToggleMode: () => {},
    onForgotPassword: () => {},
  },
};

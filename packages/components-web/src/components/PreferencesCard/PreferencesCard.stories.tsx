import type { Meta, StoryObj } from '@storybook/react';
import { PreferencesCard } from './PreferencesCard';

const meta: Meta<typeof PreferencesCard> = {
  title: 'Components/Account/PreferencesCard',
  component: PreferencesCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    settings: [
      {
        key: 'language',
        label: 'Language',
        value: 'en',
        options: [
          { label: 'English', value: 'en' },
          { label: 'Hindi', value: 'hi' },
          { label: 'Urdu', value: 'ur' },
          { label: 'Bengali', value: 'bn' },
        ],
      },
      {
        key: 'currency',
        label: 'Currency',
        value: 'usd',
        options: [
          { label: 'USD ($)', value: 'usd' },
          { label: 'INR (₹)', value: 'inr' },
          { label: 'GBP (£)', value: 'gbp' },
        ],
      },
      {
        key: 'measurement',
        label: 'Measurement',
        value: 'metric',
        options: [
          { label: 'Metric (kg, g)', value: 'metric' },
          { label: 'Imperial (lb, oz)', value: 'imperial' },
        ],
      },
    ],
    onChange: () => {},
  },
};

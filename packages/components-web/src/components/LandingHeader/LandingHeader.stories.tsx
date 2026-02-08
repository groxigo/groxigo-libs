import type { Meta, StoryObj } from '@storybook/react';
import { LandingHeader } from './LandingHeader';

const meta: Meta<typeof LandingHeader> = {
  title: 'Components/Landing/LandingHeader',
  component: LandingHeader,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    isScrolled: { control: 'boolean' },
  },
  decorators: [
    (Story, context) => (
      <div
        style={{
          background: context.args.isScrolled
            ? '#f8fafc'
            : 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)',
          minHeight: 120,
          position: 'relative',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSignIn: () => {},
  },
};

export const Scrolled: Story = {
  args: {
    isScrolled: true,
    onSignIn: () => {},
  },
};

export const WithLogo: Story = {
  args: {
    logoSrc: 'https://placehold.co/120x28/transparent/fff?text=Groxigo',
    onSignIn: () => {},
  },
};

export const ScrolledWithLogo: Story = {
  args: {
    logoSrc: 'https://placehold.co/120x28/transparent/2563eb?text=Groxigo',
    isScrolled: true,
    onSignIn: () => {},
  },
};

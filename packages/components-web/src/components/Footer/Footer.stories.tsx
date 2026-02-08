import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Components/Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sections: [
      {
        title: 'About',
        links: [
          { label: 'About Us', href: '/about' },
          { label: 'Careers', href: '/careers' },
          { label: 'Blog', href: '/blog' },
        ],
      },
      {
        title: 'Quick Links',
        links: [
          { label: 'Fruits & Vegetables', href: '/category/fruits' },
          { label: 'Dairy & Eggs', href: '/category/dairy' },
          { label: 'Spices & Masalas', href: '/category/spices' },
          { label: 'Rice & Flour', href: '/category/rice' },
        ],
      },
      {
        title: 'Customer Care',
        links: [
          { label: 'Contact Us', href: '/contact' },
          { label: 'FAQ', href: '/faq' },
          { label: 'Return Policy', href: '/returns' },
          { label: 'Privacy Policy', href: '/privacy' },
        ],
      },
    ],
    socialLinks: [
      { platform: 'Facebook', href: 'https://facebook.com' },
      { platform: 'Instagram', href: 'https://instagram.com' },
      { platform: 'Twitter', href: 'https://twitter.com' },
    ],
    copyrightText: '2026 Groxigo. All rights reserved.',
  },
};

export const Minimal: Story = {
  args: {
    sections: [
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    copyrightText: '2026 Groxigo',
  },
};

export const WithSocialOnly: Story = {
  args: {
    socialLinks: [
      { platform: 'Facebook', href: 'https://facebook.com' },
      { platform: 'Instagram', href: 'https://instagram.com' },
      { platform: 'Twitter', href: 'https://twitter.com' },
      { platform: 'YouTube', href: 'https://youtube.com' },
    ],
    copyrightText: '2026 Groxigo. All rights reserved.',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { TrustStat } from './TrustStat';

const meta: Meta<typeof TrustStat> = {
  title: 'Components/Landing/TrustStat',
  component: TrustStat,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <span>🚚</span>,
    label: 'Same-day delivery',
  },
};

export const Satisfaction: Story = {
  args: {
    icon: <span>⭐</span>,
    label: '98% satisfaction',
  },
};

export const TrustBar: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '32px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '24px 16px',
        background: 'rgba(37, 99, 235, 0.05)',
        borderRadius: '10px',
      }}
    >
      <TrustStat icon={<span>🚚</span>} label="Same-day delivery" />
      <TrustStat icon={<span>⭐</span>} label="98% satisfaction" />
      <TrustStat icon={<span>📦</span>} label="20,000+ products" />
      <TrustStat icon={<span>🌍</span>} label="6 regional cuisines" />
    </div>
  ),
};

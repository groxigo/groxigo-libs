import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SectionHeader } from '../SectionHeader';

describe('SectionHeader', () => {
  it('renders the title', () => {
    render(<SectionHeader title="Popular Items" />);
    expect(screen.getByText('Popular Items')).toBeInTheDocument();
  });

  it('renders title as the correct heading element based on titleVariant', () => {
    const { container } = render(
      <SectionHeader title="Featured" titleVariant="h2" />
    );
    const heading = container.querySelector('h2');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Featured');
  });

  it('defaults titleVariant to h3', () => {
    const { container } = render(<SectionHeader title="Default Heading" />);
    const heading = container.querySelector('h3');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Default Heading');
  });

  it('renders subtitle when provided', () => {
    render(<SectionHeader title="Deals" subtitle="Best prices today" />);
    expect(screen.getByText('Best prices today')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    const { container } = render(<SectionHeader title="Deals" />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(0);
  });

  it('renders "See all" button when showSeeAll is true', () => {
    const onSeeAll = vi.fn();
    render(
      <SectionHeader title="New Arrivals" showSeeAll onSeeAllPress={onSeeAll} />
    );
    expect(screen.getByText('See all')).toBeInTheDocument();
  });

  it('calls onSeeAllPress when "See all" button is clicked', () => {
    const onSeeAll = vi.fn();
    render(
      <SectionHeader title="New Arrivals" showSeeAll onSeeAllPress={onSeeAll} />
    );
    fireEvent.click(screen.getByRole('button', { name: /See all New Arrivals/i }));
    expect(onSeeAll).toHaveBeenCalledTimes(1);
  });

  it('hides "See all" when showSeeAll is false', () => {
    render(<SectionHeader title="Categories" showSeeAll={false} />);
    expect(screen.queryByText('See all')).not.toBeInTheDocument();
  });

  it('renders custom seeAllText', () => {
    render(
      <SectionHeader title="Items" showSeeAll seeAllText="View more" />
    );
    expect(screen.getByText('View more')).toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<SectionHeader title="Test" testID="section-header" />);
    expect(screen.getByTestId('section-header')).toBeInTheDocument();
  });
});

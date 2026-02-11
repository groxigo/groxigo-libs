import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AccordionSection } from '../AccordionSection';

describe('AccordionSection', () => {
  it('renders the title', () => {
    render(
      <AccordionSection title="Nutrition Facts">
        <p>Content here</p>
      </AccordionSection>
    );
    expect(screen.getByText('Nutrition Facts')).toBeInTheDocument();
  });

  it('starts collapsed by default (aria-expanded=false)', () => {
    render(
      <AccordionSection title="Details">
        <p>Hidden content</p>
      </AccordionSection>
    );
    const toggleButton = screen.getByRole('button', { name: /Details/i });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('starts expanded when defaultExpanded is true', () => {
    render(
      <AccordionSection title="Info" defaultExpanded>
        <p>Visible content</p>
      </AccordionSection>
    );
    const toggleButton = screen.getByRole('button', { name: /Info/i });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('expands on click and collapses on second click', () => {
    render(
      <AccordionSection title="FAQ">
        <p>Answer here</p>
      </AccordionSection>
    );
    const toggleButton = screen.getByRole('button', { name: /FAQ/i });

    // Initially collapsed
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

    // Click again to collapse
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders children in a region', () => {
    render(
      <AccordionSection title="Section" defaultExpanded>
        <p>Child content</p>
      </AccordionSection>
    );
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('calls onToggle with the new expanded state', () => {
    const onToggle = vi.fn();
    render(
      <AccordionSection title="Toggle" onToggle={onToggle}>
        <p>Content</p>
      </AccordionSection>
    );
    const toggleButton = screen.getByRole('button', { name: /Toggle/i });

    fireEvent.click(toggleButton);
    expect(onToggle).toHaveBeenCalledWith(true);

    fireEvent.click(toggleButton);
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it('supports controlled expanded prop', () => {
    const { rerender } = render(
      <AccordionSection title="Controlled" expanded={false}>
        <p>Content</p>
      </AccordionSection>
    );
    const toggleButton = screen.getByRole('button', { name: /Controlled/i });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    rerender(
      <AccordionSection title="Controlled" expanded>
        <p>Content</p>
      </AccordionSection>
    );
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('applies testID as data-testid', () => {
    render(
      <AccordionSection title="Test" testID="accordion">
        <p>Content</p>
      </AccordionSection>
    );
    expect(screen.getByTestId('accordion')).toBeInTheDocument();
  });
});

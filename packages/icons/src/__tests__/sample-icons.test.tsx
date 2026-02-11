import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { LineIcons, SolidIcons } from '../index';

describe('Sample icon rendering', () => {
  describe('LineIcons.Search', () => {
    it('renders an SVG element', () => {
      const { container } = render(<LineIcons.Search />);
      const svg = container.querySelector('svg');
      expect(svg).not.toBeNull();
    });

    it('has correct viewBox attribute', () => {
      const { container } = render(<LineIcons.Search />);
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24');
    });

    it('has default width and height of 24', () => {
      const { container } = render(<LineIcons.Search />);
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('width')).toBe('24');
      expect(svg?.getAttribute('height')).toBe('24');
    });

    it('renders with custom size', () => {
      const { container } = render(<LineIcons.Search size={32} />);
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('width')).toBe('32');
      expect(svg?.getAttribute('height')).toBe('32');
    });

    it('has default fill color #000 on path', () => {
      const { container } = render(<LineIcons.Search />);
      const path = container.querySelector('path');
      expect(path?.getAttribute('fill')).toBe('#000');
    });

    it('renders with custom color on path', () => {
      const { container } = render(<LineIcons.Search color="#3B82F6" />);
      const path = container.querySelector('path');
      expect(path?.getAttribute('fill')).toBe('#3B82F6');
    });

    it('contains a non-empty path d attribute', () => {
      const { container } = render(<LineIcons.Search />);
      const path = container.querySelector('path');
      const d = path?.getAttribute('d');
      expect(d).toBeTruthy();
      expect(d!.length).toBeGreaterThan(0);
    });
  });

  describe('SolidIcons.Star', () => {
    it('renders an SVG element', () => {
      const { container } = render(<SolidIcons.Star />);
      const svg = container.querySelector('svg');
      expect(svg).not.toBeNull();
    });

    it('has correct viewBox attribute', () => {
      const { container } = render(<SolidIcons.Star />);
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24');
    });

    it('has default width and height of 24', () => {
      const { container } = render(<SolidIcons.Star />);
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('width')).toBe('24');
      expect(svg?.getAttribute('height')).toBe('24');
    });

    it('renders with custom size and color', () => {
      const { container } = render(<SolidIcons.Star size={20} color="#FFD700" />);
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('width')).toBe('20');
      expect(svg?.getAttribute('height')).toBe('20');

      const path = container.querySelector('path');
      expect(path?.getAttribute('fill')).toBe('#FFD700');
    });

    it('contains a non-empty path d attribute', () => {
      const { container } = render(<SolidIcons.Star />);
      const path = container.querySelector('path');
      const d = path?.getAttribute('d');
      expect(d).toBeTruthy();
      expect(d!.length).toBeGreaterThan(0);
    });
  });

  describe('LineIcons.Heart', () => {
    it('renders with accessibility label', () => {
      const { container } = render(
        <LineIcons.Heart accessibilityLabel="Favorite" />
      );
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('aria-label')).toBe('Favorite');
    });

    it('renders with testID', () => {
      const { getByTestId } = render(
        <LineIcons.Heart testID="heart-icon" />
      );
      expect(getByTestId('heart-icon')).toBeTruthy();
    });
  });
});

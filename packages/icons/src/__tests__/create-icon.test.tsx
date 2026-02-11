import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { createIcon } from '../create-icon';

const SAMPLE_PATH = 'M12 2L2 22h20L12 2z';
const SAMPLE_PATH_A = 'M10 10h4v4h-4z';
const SAMPLE_PATH_B = 'M2 2h20v20H2z';

describe('createIcon', () => {
  it('creates a component with the correct displayName', () => {
    const Icon = createIcon('TestIcon', SAMPLE_PATH);
    expect(Icon.displayName).toBe('TestIcon');
  });

  it('renders an SVG with default size (24) and color (#000)', () => {
    const Icon = createIcon('DefaultIcon', SAMPLE_PATH);
    const { container } = render(<Icon />);

    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('width')).toBe('24');
    expect(svg?.getAttribute('height')).toBe('24');
    expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24');

    const path = container.querySelector('path');
    expect(path).not.toBeNull();
    expect(path?.getAttribute('fill')).toBe('#000');
  });

  it('renders with custom size and color', () => {
    const Icon = createIcon('CustomIcon', SAMPLE_PATH);
    const { container } = render(<Icon size={48} color="#FF0000" />);

    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('48');
    expect(svg?.getAttribute('height')).toBe('48');

    const path = container.querySelector('path');
    expect(path?.getAttribute('fill')).toBe('#FF0000');
  });

  it('handles single path string', () => {
    const Icon = createIcon('SinglePath', SAMPLE_PATH);
    const { container } = render(<Icon />);

    const paths = container.querySelectorAll('path');
    expect(paths).toHaveLength(1);
    expect(paths[0].getAttribute('d')).toBe(SAMPLE_PATH);
  });

  it('handles array of path strings (multiple paths)', () => {
    const Icon = createIcon('MultiPath', [SAMPLE_PATH_A, SAMPLE_PATH_B]);
    const { container } = render(<Icon />);

    const paths = container.querySelectorAll('path');
    expect(paths).toHaveLength(2);
    expect(paths[0].getAttribute('d')).toBe(SAMPLE_PATH_A);
    expect(paths[1].getAttribute('d')).toBe(SAMPLE_PATH_B);
  });

  it('passes accessibilityLabel as aria-label', () => {
    const Icon = createIcon('A11yIcon', SAMPLE_PATH);
    const { container } = render(
      <Icon accessibilityLabel="Close button" />
    );

    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('aria-label')).toBe('Close button');
  });

  it('passes testID as data-testid', () => {
    const Icon = createIcon('TestIdIcon', SAMPLE_PATH);
    const { getByTestId } = render(<Icon testID="my-icon" />);

    expect(getByTestId('my-icon')).toBeTruthy();
  });

  it('passes style prop', () => {
    const Icon = createIcon('StyledIcon', SAMPLE_PATH);
    const customStyle = { opacity: 0.5 };
    const { container } = render(<Icon style={customStyle} />);

    const svg = container.querySelector('svg');
    expect(svg?.style.opacity).toBe('0.5');
  });

  it('returns an FC type (callable function)', () => {
    const Icon = createIcon('FcIcon', SAMPLE_PATH);
    expect(typeof Icon).toBe('function');
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SDUIRenderer, SDUISectionRenderer, SDUIScreenRenderer } from '../SDUIRenderer';
import { createRegistry } from '../../registry/createRegistry';
import type { SDUIComponent, SDUISection } from '../../types/components';
import type { ComponentRegistry } from '../../types/registry';
import type { ReactNode } from 'react';

// Test components
function TestCard({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div data-testid="test-card">
      <span data-testid="card-title">{title}</span>
      {subtitle && <span data-testid="card-subtitle">{subtitle}</span>}
      {children}
    </div>
  );
}

function TestButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <button data-testid="test-button" onClick={onPress}>
      {label}
    </button>
  );
}

function TestFallback({ type }: { type: string }) {
  return <div data-testid="fallback">Unknown: {type}</div>;
}

function buildRegistry(): ComponentRegistry {
  return createRegistry()
    .register('TestCard', TestCard, {
      defaultProps: { subtitle: 'Default subtitle' },
    })
    .register('TestButton', TestButton, {
      actionProps: ['onPress'],
    })
    .build();
}

describe('SDUIRenderer', () => {
  it('renders a registered component with props', () => {
    const registry = buildRegistry();
    const data: SDUIComponent = {
      type: 'TestCard',
      props: { title: 'Hello World' },
    };

    render(<SDUIRenderer data={data} registry={registry} />);

    expect(screen.getByTestId('card-title').textContent).toBe('Hello World');
  });

  it('merges defaultProps with server props', () => {
    const registry = buildRegistry();
    const data: SDUIComponent = {
      type: 'TestCard',
      props: { title: 'My Card' },
    };

    render(<SDUIRenderer data={data} registry={registry} />);

    expect(screen.getByTestId('card-title').textContent).toBe('My Card');
    expect(screen.getByTestId('card-subtitle').textContent).toBe('Default subtitle');
  });

  it('server props override defaultProps', () => {
    const registry = buildRegistry();
    const data: SDUIComponent = {
      type: 'TestCard',
      props: { title: 'Card', subtitle: 'Custom subtitle' },
    };

    render(<SDUIRenderer data={data} registry={registry} />);

    expect(screen.getByTestId('card-subtitle').textContent).toBe('Custom subtitle');
  });

  it('converts actions to handler callbacks', () => {
    const registry = buildRegistry();
    const onAction = vi.fn();
    const data: SDUIComponent = {
      type: 'TestButton',
      props: { label: 'Click Me' },
      actions: {
        onPress: { type: 'NAVIGATE', screen: '/home' },
      },
    };

    render(<SDUIRenderer data={data} registry={registry} onAction={onAction} />);

    screen.getByTestId('test-button').click();
    expect(onAction).toHaveBeenCalledWith({ type: 'NAVIGATE', screen: '/home' });
  });

  it('renders Fallback for unknown component types', () => {
    const registry = buildRegistry();
    const data: SDUIComponent = {
      type: 'NonExistent',
      props: {},
    };

    render(
      <SDUIRenderer data={data} registry={registry} fallback={TestFallback} />
    );

    expect(screen.getByTestId('fallback').textContent).toBe('Unknown: NonExistent');
  });

  it('returns null for unknown types without Fallback', () => {
    const registry = buildRegistry();
    const data: SDUIComponent = {
      type: 'NonExistent',
      props: {},
    };

    const { container } = render(
      <SDUIRenderer data={data} registry={registry} />
    );

    expect(container.innerHTML).toBe('');
  });

  it('renders children recursively', () => {
    const registry = buildRegistry();
    const data: SDUIComponent = {
      type: 'TestCard',
      props: { title: 'Parent' },
      children: [
        {
          type: 'TestButton',
          props: { label: 'Child Button' },
          key: 'btn-1',
        },
      ],
    };

    render(<SDUIRenderer data={data} registry={registry} />);

    expect(screen.getByTestId('card-title').textContent).toBe('Parent');
    expect(screen.getByTestId('test-button').textContent).toBe('Child Button');
  });
});

describe('SDUISectionRenderer', () => {
  it('renders all section components', () => {
    const registry = buildRegistry();
    const section: SDUISection = {
      id: 'sec-1',
      title: 'Featured',
      components: [
        { type: 'TestCard', props: { title: 'Card A' }, key: 'a' },
        { type: 'TestCard', props: { title: 'Card B' }, key: 'b' },
      ],
    };

    render(
      <SDUISectionRenderer section={section} registry={registry} />
    );

    const cards = screen.getAllByTestId('test-card');
    expect(cards).toHaveLength(2);
  });

  it('wraps with SectionWrapper when provided', () => {
    const registry = buildRegistry();
    const section: SDUISection = {
      id: 'sec-1',
      components: [
        { type: 'TestCard', props: { title: 'Wrapped' }, key: 'w' },
      ],
    };

    function Wrapper({ section: sec, children }: { section: SDUISection; children: ReactNode }) {
      return (
        <div data-testid="section-wrapper" data-section-id={sec.id}>
          {children}
        </div>
      );
    }

    render(
      <SDUISectionRenderer
        section={section}
        registry={registry}
        SectionWrapper={Wrapper}
      />
    );

    const wrapper = screen.getByTestId('section-wrapper');
    expect(wrapper).toBeDefined();
    expect(wrapper.getAttribute('data-section-id')).toBe('sec-1');
    expect(screen.getByTestId('test-card')).toBeDefined();
  });
});

describe('SDUIScreenRenderer', () => {
  it('auto-detects sections (data with components property)', () => {
    const registry = buildRegistry();
    const sections: SDUISection[] = [
      {
        id: 'sec-1',
        components: [
          { type: 'TestCard', props: { title: 'In Section' }, key: 's1' },
        ],
      },
    ];

    render(
      <SDUIScreenRenderer data={sections} registry={registry} />
    );

    expect(screen.getByTestId('card-title').textContent).toBe('In Section');
  });

  it('auto-detects flat components (data without components property)', () => {
    const registry = buildRegistry();
    const components: SDUIComponent[] = [
      { type: 'TestCard', props: { title: 'Flat A' }, key: 'a' },
      { type: 'TestCard', props: { title: 'Flat B' }, key: 'b' },
    ];

    render(
      <SDUIScreenRenderer data={components} registry={registry} />
    );

    const cards = screen.getAllByTestId('test-card');
    expect(cards).toHaveLength(2);
  });

  it('respects explicit isSections=true', () => {
    const registry = buildRegistry();
    const sections: SDUISection[] = [
      {
        id: 'sec-1',
        components: [
          { type: 'TestButton', props: { label: 'Btn' }, key: 'b1' },
        ],
      },
    ];

    render(
      <SDUIScreenRenderer
        data={sections}
        registry={registry}
        isSections={true}
      />
    );

    expect(screen.getByTestId('test-button').textContent).toBe('Btn');
  });

  it('respects explicit isSections=false for flat components', () => {
    const registry = buildRegistry();
    const components: SDUIComponent[] = [
      { type: 'TestButton', props: { label: 'Flat Btn' }, key: 'f1' },
    ];

    render(
      <SDUIScreenRenderer
        data={components}
        registry={registry}
        isSections={false}
      />
    );

    expect(screen.getByTestId('test-button').textContent).toBe('Flat Btn');
  });

  it('renders empty for empty data', () => {
    const registry = buildRegistry();

    const { container } = render(
      <SDUIScreenRenderer data={[]} registry={registry} />
    );

    expect(container.innerHTML).toBe('');
  });
});

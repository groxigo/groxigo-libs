import { describe, it, expect } from 'vitest';
import { createRegistry, DEFAULT_ACTION_PROPS } from '../createRegistry';

describe('createRegistry', () => {
  it('builds an empty registry', () => {
    const registry = createRegistry().build();
    expect(registry).toEqual({});
  });

  it('registers a component and returns it from build', () => {
    const Comp = () => null;
    const registry = createRegistry()
      .register('MyComp', Comp)
      .build();

    expect(registry.MyComp).toBeDefined();
    expect(registry.MyComp.component).toBe(Comp);
  });

  it('supports chaining multiple registrations', () => {
    const A = () => null;
    const B = () => null;
    const C = () => null;

    const registry = createRegistry()
      .register('A', A)
      .register('B', B)
      .register('C', C)
      .build();

    expect(Object.keys(registry)).toEqual(['A', 'B', 'C']);
    expect(registry.A.component).toBe(A);
    expect(registry.B.component).toBe(B);
    expect(registry.C.component).toBe(C);
  });

  it('registers with actionProps option', () => {
    const Comp = () => null;
    const registry = createRegistry()
      .register('Comp', Comp, {
        actionProps: ['onPress', 'onAddToCart'],
      })
      .build();

    expect(registry.Comp.actionProps).toEqual(['onPress', 'onAddToCart']);
  });

  it('registers with defaultProps option', () => {
    const Comp = () => null;
    const registry = createRegistry()
      .register('Comp', Comp, {
        defaultProps: { size: 'md', variant: 'solid' },
      })
      .build();

    expect(registry.Comp.defaultProps).toEqual({ size: 'md', variant: 'solid' });
  });

  it('registers with both actionProps and defaultProps', () => {
    const Comp = () => null;
    const registry = createRegistry()
      .register('Comp', Comp, {
        actionProps: ['onPress'],
        defaultProps: { size: 'lg' },
      })
      .build();

    expect(registry.Comp.actionProps).toEqual(['onPress']);
    expect(registry.Comp.defaultProps).toEqual({ size: 'lg' });
  });

  it('build returns a copy, not a reference to internal state', () => {
    const Comp = () => null;
    const builder = createRegistry().register('Comp', Comp);

    const registry1 = builder.build();
    const registry2 = builder.build();

    expect(registry1).toEqual(registry2);
    expect(registry1).not.toBe(registry2);
  });

  it('overwriting a type replaces the previous registration', () => {
    const A = () => null;
    const B = () => null;

    const registry = createRegistry()
      .register('Comp', A)
      .register('Comp', B)
      .build();

    expect(registry.Comp.component).toBe(B);
  });
});

describe('DEFAULT_ACTION_PROPS', () => {
  it('is an array of strings', () => {
    expect(Array.isArray(DEFAULT_ACTION_PROPS)).toBe(true);
    DEFAULT_ACTION_PROPS.forEach((prop) => {
      expect(typeof prop).toBe('string');
    });
  });

  it('contains common action prop names', () => {
    expect(DEFAULT_ACTION_PROPS).toContain('onPress');
    expect(DEFAULT_ACTION_PROPS).toContain('onAddToCart');
    expect(DEFAULT_ACTION_PROPS).toContain('onToggleFavorite');
    expect(DEFAULT_ACTION_PROPS).toContain('onRemove');
    expect(DEFAULT_ACTION_PROPS).toContain('onSubmit');
    expect(DEFAULT_ACTION_PROPS).toContain('onCancel');
    expect(DEFAULT_ACTION_PROPS).toContain('onClose');
  });
});

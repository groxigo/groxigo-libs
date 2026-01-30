import { describe, it, expect } from 'vitest';
import {
  defaultBreakpoints,
  minWidth,
  maxWidth,
  between,
  getResponsiveValue,
  isResponsiveValue,
} from '../useMediaQuery';

describe('defaultBreakpoints', () => {
  it('should have correct breakpoint values', () => {
    expect(defaultBreakpoints).toEqual({
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    });
  });
});

describe('minWidth', () => {
  it('should generate correct min-width query', () => {
    expect(minWidth(640)).toBe('(min-width: 640px)');
    expect(minWidth(768)).toBe('(min-width: 768px)');
    expect(minWidth(1024)).toBe('(min-width: 1024px)');
    expect(minWidth(0)).toBe('(min-width: 0px)');
  });
});

describe('maxWidth', () => {
  it('should generate correct max-width query (exclusive)', () => {
    expect(maxWidth(640)).toBe('(max-width: 639px)');
    expect(maxWidth(768)).toBe('(max-width: 767px)');
    expect(maxWidth(1024)).toBe('(max-width: 1023px)');
    expect(maxWidth(1)).toBe('(max-width: 0px)');
  });
});

describe('between', () => {
  it('should generate correct range query', () => {
    expect(between(640, 768)).toBe('(min-width: 640px) and (max-width: 767px)');
    expect(between(768, 1024)).toBe('(min-width: 768px) and (max-width: 1023px)');
    expect(between(0, 640)).toBe('(min-width: 0px) and (max-width: 639px)');
  });

  it('should work with breakpoint values', () => {
    expect(between(defaultBreakpoints.sm, defaultBreakpoints.md)).toBe(
      '(min-width: 640px) and (max-width: 767px)'
    );
  });
});

describe('getResponsiveValue', () => {
  it('should return primitive values directly', () => {
    expect(getResponsiveValue('hello', 'md')).toBe('hello');
    expect(getResponsiveValue(42, 'lg')).toBe(42);
    expect(getResponsiveValue(true, 'sm')).toBe(true);
    expect(getResponsiveValue(null, 'xl')).toBe(null);
  });

  it('should return value for exact breakpoint', () => {
    const value = { xs: 'extra-small', md: 'medium', xl: 'extra-large' };

    expect(getResponsiveValue(value, 'xs')).toBe('extra-small');
    expect(getResponsiveValue(value, 'md')).toBe('medium');
    expect(getResponsiveValue(value, 'xl')).toBe('extra-large');
  });

  it('should fall back to lower breakpoint if current not defined', () => {
    const value = { xs: 'small', lg: 'large' };

    expect(getResponsiveValue(value, 'xs')).toBe('small');
    expect(getResponsiveValue(value, 'sm')).toBe('small'); // Falls back to xs
    expect(getResponsiveValue(value, 'md')).toBe('small'); // Falls back to xs
    expect(getResponsiveValue(value, 'lg')).toBe('large');
    expect(getResponsiveValue(value, 'xl')).toBe('large'); // Falls back to lg
    expect(getResponsiveValue(value, '2xl')).toBe('large'); // Falls back to lg
  });

  it('should fall back to base value', () => {
    const value = { base: 'default', lg: 'large' };

    expect(getResponsiveValue(value, 'xs')).toBe('default');
    expect(getResponsiveValue(value, 'sm')).toBe('default');
    expect(getResponsiveValue(value, 'md')).toBe('default');
    expect(getResponsiveValue(value, 'lg')).toBe('large');
  });

  it('should return undefined if no matching breakpoint or base', () => {
    const value = { lg: 'large', xl: 'extra-large' };

    expect(getResponsiveValue(value, 'xs')).toBeUndefined();
    expect(getResponsiveValue(value, 'sm')).toBeUndefined();
    expect(getResponsiveValue(value, 'md')).toBeUndefined();
    expect(getResponsiveValue(value, 'lg')).toBe('large');
  });

  it('should handle all breakpoints defined', () => {
    const value = {
      base: 'base',
      xs: 'xs',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl',
      '2xl': '2xl',
    };

    expect(getResponsiveValue(value, 'xs')).toBe('xs');
    expect(getResponsiveValue(value, 'sm')).toBe('sm');
    expect(getResponsiveValue(value, 'md')).toBe('md');
    expect(getResponsiveValue(value, 'lg')).toBe('lg');
    expect(getResponsiveValue(value, 'xl')).toBe('xl');
    expect(getResponsiveValue(value, '2xl')).toBe('2xl');
  });

  it('should work with number values', () => {
    const value = { xs: 4, md: 8, xl: 12 };

    expect(getResponsiveValue(value, 'xs')).toBe(4);
    expect(getResponsiveValue(value, 'sm')).toBe(4);
    expect(getResponsiveValue(value, 'md')).toBe(8);
    expect(getResponsiveValue(value, 'lg')).toBe(8);
    expect(getResponsiveValue(value, 'xl')).toBe(12);
  });

  it('should work with boolean values', () => {
    const value = { base: false, lg: true };

    expect(getResponsiveValue(value, 'sm')).toBe(false);
    expect(getResponsiveValue(value, 'lg')).toBe(true);
  });

  it('should handle undefined breakpoint values', () => {
    const value = { xs: 'small', md: undefined, lg: 'large' };

    expect(getResponsiveValue(value, 'xs')).toBe('small');
    expect(getResponsiveValue(value, 'sm')).toBe('small');
    expect(getResponsiveValue(value, 'md')).toBe('small'); // md is undefined, falls back
    expect(getResponsiveValue(value, 'lg')).toBe('large');
  });
});

describe('isResponsiveValue', () => {
  it('should return true for responsive objects', () => {
    expect(isResponsiveValue({ base: 'value' })).toBe(true);
    expect(isResponsiveValue({ xs: 1, md: 2 })).toBe(true);
    expect(isResponsiveValue({ sm: 'small', lg: 'large' })).toBe(true);
    expect(isResponsiveValue({})).toBe(true);
  });

  it('should return false for primitive values', () => {
    expect(isResponsiveValue('string')).toBe(false);
    expect(isResponsiveValue(42)).toBe(false);
    expect(isResponsiveValue(true)).toBe(false);
    expect(isResponsiveValue(false)).toBe(false);
    expect(isResponsiveValue(null)).toBe(false);
    expect(isResponsiveValue(undefined)).toBe(false);
  });

  it('should return false for arrays', () => {
    expect(isResponsiveValue([])).toBe(false);
    expect(isResponsiveValue([1, 2, 3])).toBe(false);
    expect(isResponsiveValue(['xs', 'md'])).toBe(false);
  });

  it('should work with type narrowing', () => {
    const value: string | { base?: string; md?: string } = { base: 'default', md: 'medium' };

    if (isResponsiveValue(value)) {
      // TypeScript should know value is an object here
      expect(value.base).toBe('default');
      expect(value.md).toBe('medium');
    }
  });
});

describe('ResponsiveValue type', () => {
  it('should accept single values', () => {
    // These are type tests - they pass if they compile
    const singleString: Parameters<typeof getResponsiveValue>[0] = 'hello';
    const singleNumber: Parameters<typeof getResponsiveValue>[0] = 42;

    expect(singleString).toBe('hello');
    expect(singleNumber).toBe(42);
  });

  it('should accept responsive objects', () => {
    const responsiveString: Parameters<typeof getResponsiveValue>[0] = {
      base: 'default',
      sm: 'small',
      md: 'medium',
    };

    expect(responsiveString).toEqual({
      base: 'default',
      sm: 'small',
      md: 'medium',
    });
  });
});

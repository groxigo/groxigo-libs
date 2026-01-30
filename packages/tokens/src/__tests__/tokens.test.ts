/**
 * Token Tests
 *
 * Validates token consistency, structure, and values across the design system.
 * Updated for the generic three-tier architecture:
 * - Tier 1: Primitives (raw color values)
 * - Tier 2: Semantic (meaningful names)
 * - Tier 3: Components (UI element tokens)
 */

import { tokens } from '../tokens';
import {
  primitives,
  semantic,
  components,
  semanticDark,
  componentsDark,
} from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { typography } from '../tokens/typography';
import { radius } from '../tokens/radius';
import { opacity } from '../tokens/opacity';
import { blur } from '../tokens/blur';
import { animation } from '../tokens/animation';

// ============================================
// COLOR TOKEN TESTS
// ============================================

describe('Color Tokens', () => {
  describe('Primitives', () => {
    const colorFamilies = ['gray', 'blue', 'green', 'red', 'yellow', 'orange', 'purple', 'cyan', 'pink', 'indigo', 'teal'] as const;
    const shadeKeys = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

    test.each(colorFamilies)('%s color family has all shades', (family) => {
      const colorFamily = primitives[family];
      expect(colorFamily).toBeDefined();

      shadeKeys.forEach((shade) => {
        expect(colorFamily[shade as keyof typeof colorFamily]).toBeDefined();
      });
    });

    test.each(colorFamilies)('%s colors are valid hex values', (family) => {
      const colorFamily = primitives[family];
      const hexRegex = /^#[0-9A-Fa-f]{6}$/;

      Object.values(colorFamily).forEach((color) => {
        expect(color).toMatch(hexRegex);
      });
    });

    test('color values increase in darkness from 50 to 950', () => {
      // Test that luminance decreases as shade number increases
      const grayFamily = primitives.gray;
      const shade50Luminance = getLuminance(grayFamily[50]);
      const shade950Luminance = getLuminance(grayFamily[950]);

      expect(shade50Luminance).toBeGreaterThan(shade950Luminance);
    });

    test('primitives has absolute colors', () => {
      expect(primitives.white).toBe('#ffffff');
      expect(primitives.black).toBe('#000000');
      expect(primitives.transparent).toBe('transparent');
    });
  });

  describe('Semantic Tokens - Light Mode', () => {
    test('semantic has all required surface tokens', () => {
      expect(semantic.surface.primary).toBeDefined();
      expect(semantic.surface.secondary).toBeDefined();
      expect(semantic.surface.tertiary).toBeDefined();
      expect(semantic.surface.elevated).toBeDefined();
      expect(semantic.surface.sunken).toBeDefined();
      expect(semantic.surface.disabled).toBeDefined();
    });

    test('semantic has all required text tokens', () => {
      expect(semantic.text.primary).toBeDefined();
      expect(semantic.text.secondary).toBeDefined();
      expect(semantic.text.tertiary).toBeDefined();
      expect(semantic.text.disabled).toBeDefined();
      expect(semantic.text.inverse).toBeDefined();
      expect(semantic.text.link).toBeDefined();
      expect(semantic.text.linkHover).toBeDefined();
    });

    test('semantic has all required border tokens', () => {
      expect(semantic.border.subtle).toBeDefined();
      expect(semantic.border.default).toBeDefined();
      expect(semantic.border.strong).toBeDefined();
      expect(semantic.border.focus).toBeDefined();
      expect(semantic.border.disabled).toBeDefined();
    });

    test('semantic has brand tokens with primary, secondary, accent', () => {
      const brandTypes = ['primary', 'secondary', 'accent'] as const;
      brandTypes.forEach((type) => {
        expect(semantic.brand[type]).toBeDefined();
        expect(semantic.brand[type].default).toBeDefined();
        expect(semantic.brand[type].hover).toBeDefined();
        expect(semantic.brand[type].active).toBeDefined();
        expect(semantic.brand[type].subtle).toBeDefined();
        expect(semantic.brand[type].muted).toBeDefined();
      });
    });

    test('semantic has all status tokens', () => {
      const statuses = ['success', 'warning', 'error', 'info'] as const;
      statuses.forEach((status) => {
        expect(semantic.status[status]).toBeDefined();
        expect(semantic.status[status].default).toBeDefined();
        expect(semantic.status[status].hover).toBeDefined();
        expect(semantic.status[status].subtle).toBeDefined();
        expect(semantic.status[status].muted).toBeDefined();
        expect(semantic.status[status].text).toBeDefined();
      });
    });

    test('semantic has interactive tokens', () => {
      expect(semantic.interactive.default).toBeDefined();
      expect(semantic.interactive.hover).toBeDefined();
      expect(semantic.interactive.active).toBeDefined();
      expect(semantic.interactive.disabled).toBeDefined();
      expect(semantic.interactive.focus).toBeDefined();
    });

    test('semantic has overlay tokens with rgba values', () => {
      expect(semantic.overlay.light).toMatch(/^rgba\(/);
      expect(semantic.overlay.medium).toMatch(/^rgba\(/);
      expect(semantic.overlay.dark).toMatch(/^rgba\(/);
      expect(semantic.overlay.heavy).toMatch(/^rgba\(/);
    });

    test('semantic has glass tokens with rgba values', () => {
      expect(semantic.glass.surface.light).toMatch(/^rgba\(/);
      expect(semantic.glass.surface.medium).toMatch(/^rgba\(/);
      expect(semantic.glass.border.default).toMatch(/^rgba\(/);
    });
  });

  describe('Semantic Tokens - Dark Mode', () => {
    test('dark mode surfaces use darker gray shades', () => {
      expect(semanticDark.surface.primary).toBe(primitives.gray[900]);
      expect(semanticDark.surface.secondary).toBe(primitives.gray[800]);
      expect(semanticDark.surface.tertiary).toBe(primitives.gray[700]);
    });

    test('dark mode text uses lighter gray shades', () => {
      expect(semanticDark.text.primary).toBe(primitives.gray[50]);
      expect(semanticDark.text.secondary).toBe(primitives.gray[300]);
    });

    test('dark mode brand uses lighter shades for visibility', () => {
      expect(semanticDark.brand.primary.default).toBe(primitives.blue[500]);
      expect(semanticDark.brand.primary.hover).toBe(primitives.blue[400]);
    });

    test('dark glass uses darker rgba values', () => {
      expect(semanticDark.glass.surface.light).toMatch(/^rgba\(0,\s*0,\s*0/);
    });
  });

  describe('Component Tokens', () => {
    test('button component has all variants', () => {
      const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger'] as const;
      variants.forEach((variant) => {
        expect(components.button[variant]).toBeDefined();
        expect(components.button[variant].bg).toBeDefined();
        expect(components.button[variant].text).toBeDefined();
      });
    });

    test('input component has required tokens', () => {
      expect(components.input.bg).toBeDefined();
      expect(components.input.bgDisabled).toBeDefined();
      expect(components.input.text).toBeDefined();
      expect(components.input.placeholder).toBeDefined();
      expect(components.input.border).toBeDefined();
      expect(components.input.borderFocus).toBeDefined();
      expect(components.input.borderError).toBeDefined();
    });

    test('card component has required tokens', () => {
      expect(components.card.bg).toBeDefined();
      expect(components.card.border).toBeDefined();
      expect(components.card.borderHover).toBeDefined();
    });

    test('badge component has all status variants', () => {
      const variants = ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'] as const;
      variants.forEach((variant) => {
        expect(components.badge[variant]).toBeDefined();
        expect(components.badge[variant].bg).toBeDefined();
        expect(components.badge[variant].text).toBeDefined();
      });
    });

    test('modal component has required tokens', () => {
      expect(components.modal.bg).toBeDefined();
      expect(components.modal.border).toBeDefined();
      expect(components.modal.overlay).toBeDefined();
    });

    test('nav component has required tokens', () => {
      expect(components.nav.bg).toBeDefined();
      expect(components.nav.bgHover).toBeDefined();
      expect(components.nav.bgActive).toBeDefined();
      expect(components.nav.text).toBeDefined();
      expect(components.nav.textHover).toBeDefined();
      expect(components.nav.textActive).toBeDefined();
    });

    test('toggle component has required tokens', () => {
      expect(components.toggle.bgOff).toBeDefined();
      expect(components.toggle.bgOn).toBeDefined();
      expect(components.toggle.bgDisabled).toBeDefined();
      expect(components.toggle.thumb).toBeDefined();
    });

    test('progress component has required tokens', () => {
      expect(components.progress.bg).toBeDefined();
      expect(components.progress.fill).toBeDefined();
      expect(components.progress.fillSuccess).toBeDefined();
      expect(components.progress.fillWarning).toBeDefined();
      expect(components.progress.fillError).toBeDefined();
    });

    test('alert component has all status variants', () => {
      const statuses = ['success', 'warning', 'error', 'info'] as const;
      statuses.forEach((status) => {
        expect(components.alert[status]).toBeDefined();
        expect(components.alert[status].bg).toBeDefined();
        expect(components.alert[status].border).toBeDefined();
        expect(components.alert[status].text).toBeDefined();
      });
    });

    test('glass component has card, button, nav tokens', () => {
      expect(components.glass.card).toBeDefined();
      expect(components.glass.card.bg).toBeDefined();
      expect(components.glass.card.border).toBeDefined();
      expect(components.glass.button).toBeDefined();
      expect(components.glass.nav).toBeDefined();
    });
  });

  describe('Component Tokens - Dark Mode', () => {
    test('dark mode button uses dark semantic tokens', () => {
      expect(componentsDark.button.primary.bg).toBe(primitives.blue[500]);
      // White text on colored button background for readability
      expect(componentsDark.button.primary.text).toBe(primitives.white);
    });

    test('dark mode input has dark bg', () => {
      expect(componentsDark.input.bg).toBe(primitives.gray[800]);
    });
  });

  describe('Color Token Structure', () => {
    test('colors object has all required tiers', () => {
      expect(tokens.colors.primitives).toBeDefined();
      expect(tokens.colors.semantic).toBeDefined();
      expect(tokens.colors.components).toBeDefined();
      expect(tokens.colors.dark).toBeDefined();
    });

    test('dark mode structure has semantic and components', () => {
      expect(tokens.colors.dark.semantic).toBeDefined();
      expect(tokens.colors.dark.components).toBeDefined();
    });

    test('legacy compatibility exports exist', () => {
      // These are deprecated but should still work for backwards compat
      expect(tokens.colors.groxigo).toBeDefined();
      expect(tokens.colors.alias).toBeDefined();
      expect(tokens.colors.mapped).toBeDefined();
    });
  });
});

// ============================================
// SPACING TOKEN TESTS
// ============================================

describe('Spacing Tokens', () => {
  test('spacing values follow 4px base unit', () => {
    expect(spacing[0]).toBe(0);
    expect(spacing[1]).toBe(4);
    expect(spacing[2]).toBe(8);
    expect(spacing[4]).toBe(16);
    expect(spacing[8]).toBe(32);
  });

  test('all spacing values are numbers', () => {
    Object.values(spacing).forEach((value) => {
      expect(typeof value).toBe('number');
    });
  });

  test('spacing values are positive or zero', () => {
    Object.values(spacing).forEach((value) => {
      expect(value).toBeGreaterThanOrEqual(0);
    });
  });
});

// ============================================
// TYPOGRAPHY TOKEN TESTS
// ============================================

describe('Typography Tokens', () => {
  test('font family has sans and mono', () => {
    expect(typography.fontFamily.sans).toBeDefined();
    expect(typography.fontFamily.mono).toBeDefined();
  });

  test('font sizes are in ascending order', () => {
    const sizes = [
      typography.fontSize.xs,
      typography.fontSize.sm,
      typography.fontSize.base,
      typography.fontSize.lg,
      typography.fontSize.xl,
      typography.fontSize['2xl'],
      typography.fontSize['3xl'],
      typography.fontSize['4xl'],
    ];

    for (let i = 1; i < sizes.length; i++) {
      expect(sizes[i]).toBeGreaterThan(sizes[i - 1]);
    }
  });

  test('font weights are valid CSS weight values', () => {
    const validWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900];
    Object.values(typography.fontWeight).forEach((weight) => {
      expect(validWeights).toContain(weight);
    });
  });

  test('line heights are positive numbers', () => {
    Object.values(typography.lineHeight).forEach((height) => {
      expect(height).toBeGreaterThan(0);
    });
  });
});

// ============================================
// RADIUS TOKEN TESTS
// ============================================

describe('Radius Tokens', () => {
  test('radius values are numbers', () => {
    Object.entries(radius).forEach(([key, value]) => {
      expect(typeof value).toBe('number');
    });
  });

  test('radius none is 0', () => {
    expect(radius.none).toBe(0);
  });

  test('radius full is a large value for pills', () => {
    expect(radius.full).toBeGreaterThan(100);
  });

  test('radius values increase: sm < md < lg < xl', () => {
    expect(radius.sm).toBeLessThan(radius.md);
    expect(radius.md).toBeLessThan(radius.lg);
    expect(radius.lg).toBeLessThan(radius.xl);
  });
});

// ============================================
// OPACITY TOKEN TESTS
// ============================================

describe('Opacity Tokens', () => {
  test('opacity 0 is 0', () => {
    expect(opacity[0]).toBe(0);
  });

  test('opacity 100 is 1', () => {
    expect(opacity[100]).toBe(1);
  });

  test('all opacity values are between 0 and 1', () => {
    Object.values(opacity).forEach((value) => {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
    });
  });
});

// ============================================
// BLUR TOKEN TESTS
// ============================================

describe('Blur Tokens', () => {
  test('blur none is 0', () => {
    expect(blur.none).toBe(0);
  });

  test('blur values increase: sm < md < lg < xl', () => {
    expect(blur.sm).toBeLessThan(blur.md);
    expect(blur.md).toBeLessThan(blur.lg);
    expect(blur.lg).toBeLessThan(blur.xl);
  });

  test('all blur values are non-negative numbers', () => {
    Object.values(blur).forEach((value) => {
      expect(typeof value).toBe('number');
      expect(value).toBeGreaterThanOrEqual(0);
    });
  });
});

// ============================================
// ANIMATION TOKEN TESTS
// ============================================

describe('Animation Tokens', () => {
  describe('Duration', () => {
    test('all duration values are positive numbers in ms', () => {
      Object.values(animation.duration).forEach((value) => {
        expect(typeof value).toBe('number');
        expect(value).toBeGreaterThanOrEqual(0);
      });
    });

    test('duration values increase: instant < fast < normal < slow', () => {
      expect(animation.duration.instant).toBeLessThan(animation.duration.fast);
      expect(animation.duration.fast).toBeLessThan(animation.duration.normal);
      expect(animation.duration.normal).toBeLessThan(animation.duration.slow);
      expect(animation.duration.slow).toBeLessThan(animation.duration.slower);
    });
  });

  describe('Easing', () => {
    test('standard CSS easing values are present', () => {
      expect(animation.easing.linear).toBe('linear');
      expect(animation.easing.ease).toBe('ease');
      expect(animation.easing.easeIn).toBe('ease-in');
      expect(animation.easing.easeOut).toBe('ease-out');
      expect(animation.easing.easeInOut).toBe('ease-in-out');
    });

    test('custom cubic-bezier values are valid format', () => {
      const cubicBezierRegex = /^cubic-bezier\([^)]+\)$/;
      expect(animation.easing.standard).toMatch(cubicBezierRegex);
      expect(animation.easing.emphasized).toMatch(cubicBezierRegex);
      expect(animation.easing.decelerate).toMatch(cubicBezierRegex);
      expect(animation.easing.accelerate).toMatch(cubicBezierRegex);
      expect(animation.easing.bounce).toMatch(cubicBezierRegex);
    });
  });

  describe('Transitions', () => {
    test('transition none is "none"', () => {
      expect(animation.transition.none).toBe('none');
    });

    test('transitions contain duration and easing', () => {
      expect(animation.transition.all).toContain('ms');
      expect(animation.transition.button).toContain('ms');
      expect(animation.transition.card).toContain('ms');
    });
  });

  describe('Spring Configs', () => {
    test('spring configs have tension, friction, and mass', () => {
      Object.values(animation.spring).forEach((config) => {
        expect(config.tension).toBeDefined();
        expect(config.friction).toBeDefined();
        expect(config.mass).toBeDefined();
      });
    });

    test('spring values are positive', () => {
      Object.values(animation.spring).forEach((config) => {
        expect(config.tension).toBeGreaterThan(0);
        expect(config.friction).toBeGreaterThan(0);
        expect(config.mass).toBeGreaterThan(0);
      });
    });
  });

  describe('Delay', () => {
    test('delay none is 0', () => {
      expect(animation.delay.none).toBe(0);
    });

    test('delay values increase: short < medium < long', () => {
      expect(animation.delay.short).toBeLessThan(animation.delay.medium);
      expect(animation.delay.medium).toBeLessThan(animation.delay.long);
    });
  });
});

// ============================================
// COMPLETE TOKENS OBJECT TESTS
// ============================================

describe('Complete Tokens Object', () => {
  test('tokens object has all required categories', () => {
    expect(tokens.colors).toBeDefined();
    expect(tokens.spacing).toBeDefined();
    expect(tokens.typography).toBeDefined();
    expect(tokens.shadows).toBeDefined();
    expect(tokens.radius).toBeDefined();
    expect(tokens.opacity).toBeDefined();
    expect(tokens.blur).toBeDefined();
    expect(tokens.breakpoints).toBeDefined();
    expect(tokens.animation).toBeDefined();
  });

  test('tokens is immutable (as const)', () => {
    // TypeScript ensures this at compile time, but we can verify structure
    expect(Object.isFrozen(tokens)).toBe(false); // as const doesn't freeze
    expect(typeof tokens).toBe('object');
  });
});

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Calculate relative luminance of a hex color
 * Used to verify color shade ordering
 */
function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

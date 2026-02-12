/**
 * Token Tests
 *
 * Validates token consistency, structure, and values across the design system.
 * Updated for the generic three-tier architecture:
 * - Tier 1: Primitives (raw color values)
 * - Tier 2: Semantic (meaningful names)
 * - Tier 3: Components (UI element tokens)
 */

import * as fs from 'fs';
import * as path from 'path';
import { tokens } from '../tokens';
import {
  primitives,
  semantic,
  components,
  semanticDark,
  componentsDark,
} from '../tokens/colors';
import { createTheme } from '../theme';
import { spacing } from '../tokens/spacing';
import { typography } from '../tokens/typography';
import { radius } from '../tokens/radius';
import { opacity } from '../tokens/opacity';
import { blur } from '../tokens/blur';
import { animation } from '../tokens/animation';
import {
  clampExpr,
  FLUID_FONT_SIZES,
  FLUID_SPACINGS,
  FLUID_RADII,
} from '../generators/css';
import { fluidConfig } from '../tokens/responsive';

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
// SEMANTIC ↔ THEME SYNC GUARD
// Prevents drift between colors.ts static semantic
// and theme/index.ts dynamic output (DESIGN_RULES §24)
// ============================================

describe('Semantic ↔ Theme Sync Guard', () => {
  const theme = createTheme(); // default config (blue/purple/cyan, light)
  const themeSemantic = theme.light.semantic;

  /**
   * Deep-compare two objects, collecting paths where values differ.
   */
  function findDiffs(
    a: Record<string, unknown>,
    b: Record<string, unknown>,
    path = ''
  ): string[] {
    const diffs: string[] = [];
    const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const key of allKeys) {
      const fullPath = path ? `${path}.${key}` : key;
      const va = a[key];
      const vb = b[key];
      if (typeof va === 'object' && va !== null && typeof vb === 'object' && vb !== null) {
        diffs.push(...findDiffs(va as Record<string, unknown>, vb as Record<string, unknown>, fullPath));
      } else if (va !== vb) {
        diffs.push(`${fullPath}: static="${va}" theme="${vb}"`);
      }
    }
    return diffs;
  }

  // Keys that exist only in colors.ts (not part of the theme system)
  const staticOnlyKeys = ['layout'];

  function withoutKeys(obj: Record<string, unknown>, keys: string[]): Record<string, unknown> {
    const copy = { ...obj };
    for (const key of keys) delete copy[key];
    return copy;
  }

  test('static semantic (colors.ts) matches createTheme() light semantic exactly', () => {
    const diffs = findDiffs(
      withoutKeys(semantic as unknown as Record<string, unknown>, staticOnlyKeys),
      themeSemantic as unknown as Record<string, unknown>
    );
    if (diffs.length > 0) {
      throw new Error(
        `colors.ts semantic has drifted from theme/index.ts.\n` +
        `Per DESIGN_RULES §24, theme/index.ts is the authority.\n` +
        `Mismatches:\n  ${diffs.join('\n  ')}`
      );
    }
  });

  test('static semantic has same keys as theme semantic (no missing/extra)', () => {
    function collectKeys(obj: Record<string, unknown>, prefix = ''): string[] {
      const keys: string[] = [];
      for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null) {
          keys.push(...collectKeys(value as Record<string, unknown>, fullKey));
        } else {
          keys.push(fullKey);
        }
      }
      return keys.sort();
    }

    const staticKeys = collectKeys(
      withoutKeys(semantic as unknown as Record<string, unknown>, staticOnlyKeys)
    );
    const themeKeys = collectKeys(themeSemantic as unknown as Record<string, unknown>);

    const missingInStatic = themeKeys.filter((k) => !staticKeys.includes(k));
    const extraInStatic = staticKeys.filter((k) => !themeKeys.includes(k));

    expect(missingInStatic).toEqual([]);
    expect(extraInStatic).toEqual([]);
  });

  // Dark mode guard: semanticDark ↔ createTheme().dark.semantic
  const themeDarkSemantic = theme.dark.semantic;
  const darkOnlyKeys = ['layout'];

  test('static semanticDark (colors.ts) matches createTheme() dark semantic exactly', () => {
    const diffs = findDiffs(
      withoutKeys(semanticDark as unknown as Record<string, unknown>, darkOnlyKeys),
      themeDarkSemantic as unknown as Record<string, unknown>
    );
    if (diffs.length > 0) {
      throw new Error(
        `colors.ts semanticDark has drifted from theme/index.ts dark mode.\n` +
        `Per DESIGN_RULES §24, theme/index.ts is the authority.\n` +
        `Mismatches:\n  ${diffs.join('\n  ')}`
      );
    }
  });

  test('static semanticDark has same keys as theme dark semantic (no missing/extra)', () => {
    function collectKeys(obj: Record<string, unknown>, prefix = ''): string[] {
      const keys: string[] = [];
      for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null) {
          keys.push(...collectKeys(value as Record<string, unknown>, fullKey));
        } else {
          keys.push(fullKey);
        }
      }
      return keys.sort();
    }

    const staticKeys = collectKeys(
      withoutKeys(semanticDark as unknown as Record<string, unknown>, darkOnlyKeys)
    );
    const themeKeys = collectKeys(themeDarkSemantic as unknown as Record<string, unknown>);

    const missingInStatic = themeKeys.filter((k) => !staticKeys.includes(k));
    const extraInStatic = staticKeys.filter((k) => !themeKeys.includes(k));

    expect(missingInStatic).toEqual([]);
    expect(extraInStatic).toEqual([]);
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
// CSS OUTPUT ↔ THEME SYNC GUARD
// Ensures dist/css/tokens.css matches createTheme() output
// ============================================

describe('CSS Output ↔ Theme Sync', () => {
  const cssPath = path.join(__dirname, '../../dist/css/tokens.css');
  let cssContent: string;

  beforeAll(() => {
    if (!fs.existsSync(cssPath)) {
      throw new Error(
        `dist/css/tokens.css not found. Run "bun run build" before testing.`
      );
    }
    cssContent = fs.readFileSync(cssPath, 'utf-8');
  });

  /**
   * Build a reverse lookup from hex value → CSS var name for primitives.
   */
  function buildPrimitiveLookup(): Map<string, string> {
    const lookup = new Map<string, string>();
    lookup.set(primitives.white, 'var(--color-white)');
    lookup.set(primitives.black, 'var(--color-black)');
    lookup.set(primitives.transparent, 'var(--color-transparent)');

    const families = ['gray', 'blue', 'green', 'red', 'yellow', 'orange', 'purple', 'cyan', 'pink', 'indigo', 'teal'] as const;
    for (const family of families) {
      const colorFamily = primitives[family];
      for (const [shade, value] of Object.entries(colorFamily)) {
        lookup.set(value, `var(--color-${family}-${shade})`);
      }
    }
    return lookup;
  }

  /**
   * Parse CSS variables from a CSS block string.
   */
  function parseVars(block: string): Map<string, string> {
    const vars = new Map<string, string>();
    // Use [^\s:]+ instead of [\w-]+ to match dots in keys like --spacing-0.5
    const regex = /\s*(--[^\s:]+)\s*:\s*([^;]+);/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(block)) !== null) {
      vars.set(match[1], match[2].trim());
    }
    return vars;
  }

  /**
   * Extract the :root block and .dark block from CSS.
   * Strips CSS comments before brace counting to avoid false matches.
   */
  function extractBlocks(): { rootBlock: string; darkBlock: string } {
    // Strip /* ... */ comments so braces inside comments don't affect counting
    const stripped = cssContent.replace(/\/\*[\s\S]*?\*\//g, '');

    function findBlock(selector: string): string {
      const start = stripped.indexOf(selector);
      if (start === -1) throw new Error(`${selector} block not found in CSS`);
      const openBrace = stripped.indexOf('{', start);
      if (openBrace === -1) throw new Error(`No opening brace for ${selector}`);
      let braceCount = 1;
      let end = openBrace + 1;
      for (let i = end; i < stripped.length; i++) {
        if (stripped[i] === '{') braceCount++;
        if (stripped[i] === '}') braceCount--;
        if (braceCount === 0) { end = i; break; }
      }
      return stripped.slice(start, end + 1);
    }

    return {
      rootBlock: findBlock(':root {'),
      darkBlock: findBlock('.dark {'),
    };
  }

  /**
   * Resolve a CSS value like var(--color-gray-900) to its hex primitive.
   * Tracks visited vars to prevent infinite recursion on circular references.
   */
  function resolveValue(
    val: string,
    rootVars: Map<string, string>,
    visited = new Set<string>()
  ): string {
    const varRef = /^var\((--[^\s)]+)\)$/.exec(val);
    if (varRef) {
      if (visited.has(varRef[1])) return val; // Break circular reference
      visited.add(varRef[1]);
      const resolved = rootVars.get(varRef[1]);
      if (resolved) return resolveValue(resolved, rootVars, visited);
      return val;
    }
    return val;
  }

  // Semantic CSS var name → theme path mapping
  const semanticVarMap: Record<string, (theme: ReturnType<typeof createTheme>['light']['semantic']) => string> = {
    '--surface-primary': (s) => s.surface.primary,
    '--surface-secondary': (s) => s.surface.secondary,
    '--surface-tertiary': (s) => s.surface.tertiary,
    '--surface-elevated': (s) => s.surface.elevated,
    '--surface-sunken': (s) => s.surface.sunken,
    '--surface-disabled': (s) => s.surface.disabled,
    '--text-primary': (s) => s.text.primary,
    '--text-secondary': (s) => s.text.secondary,
    '--text-tertiary': (s) => s.text.tertiary,
    '--text-disabled': (s) => s.text.disabled,
    '--text-inverse': (s) => s.text.inverse,
    '--text-link': (s) => s.text.link,
    '--text-link-hover': (s) => s.text.linkHover,
    '--border-subtle': (s) => s.border.subtle,
    '--border-default': (s) => s.border.default,
    '--border-strong': (s) => s.border.strong,
    '--border-focus': (s) => s.border.focus,
    '--border-disabled': (s) => s.border.disabled,
    '--brand-primary': (s) => s.brand.primary.default,
    '--brand-primary-hover': (s) => s.brand.primary.hover,
    '--brand-primary-active': (s) => s.brand.primary.active,
    '--brand-primary-subtle': (s) => s.brand.primary.subtle,
    '--brand-primary-muted': (s) => s.brand.primary.muted,
    '--brand-secondary': (s) => s.brand.secondary.default,
    '--brand-secondary-hover': (s) => s.brand.secondary.hover,
    '--brand-secondary-active': (s) => s.brand.secondary.active,
    '--brand-secondary-subtle': (s) => s.brand.secondary.subtle,
    '--brand-secondary-muted': (s) => s.brand.secondary.muted,
    '--brand-accent': (s) => s.brand.accent.default,
    '--brand-accent-hover': (s) => s.brand.accent.hover,
    '--brand-accent-active': (s) => s.brand.accent.active,
    '--brand-accent-subtle': (s) => s.brand.accent.subtle,
    '--brand-accent-muted': (s) => s.brand.accent.muted,
    '--status-success': (s) => s.status.success.default,
    '--status-success-hover': (s) => s.status.success.hover,
    '--status-success-subtle': (s) => s.status.success.subtle,
    '--status-success-muted': (s) => s.status.success.muted,
    '--status-success-text': (s) => s.status.success.text,
    '--status-warning': (s) => s.status.warning.default,
    '--status-warning-hover': (s) => s.status.warning.hover,
    '--status-warning-subtle': (s) => s.status.warning.subtle,
    '--status-warning-muted': (s) => s.status.warning.muted,
    '--status-warning-text': (s) => s.status.warning.text,
    '--status-error': (s) => s.status.error.default,
    '--status-error-hover': (s) => s.status.error.hover,
    '--status-error-subtle': (s) => s.status.error.subtle,
    '--status-error-muted': (s) => s.status.error.muted,
    '--status-error-text': (s) => s.status.error.text,
    '--status-info': (s) => s.status.info.default,
    '--status-info-hover': (s) => s.status.info.hover,
    '--status-info-subtle': (s) => s.status.info.subtle,
    '--status-info-muted': (s) => s.status.info.muted,
    '--status-info-text': (s) => s.status.info.text,
    '--interactive-default': (s) => s.interactive.default,
    '--interactive-hover': (s) => s.interactive.hover,
    '--interactive-active': (s) => s.interactive.active,
    '--interactive-disabled': (s) => s.interactive.disabled,
    '--interactive-focus': (s) => s.interactive.focus,
    '--overlay-light': (s) => s.overlay.light,
    '--overlay-medium': (s) => s.overlay.medium,
    '--overlay-dark': (s) => s.overlay.dark,
    '--overlay-heavy': (s) => s.overlay.heavy,
    '--glass-surface-light': (s) => s.glass.surface.light,
    '--glass-surface-medium': (s) => s.glass.surface.medium,
    '--glass-surface-heavy': (s) => s.glass.surface.heavy,
    '--glass-surface-dark': (s) => s.glass.surface.dark,
    '--glass-border-light': (s) => s.glass.border.light,
    '--glass-border-default': (s) => s.glass.border.default,
    '--glass-border-subtle': (s) => s.glass.border.subtle,
  };

  test('light semantic CSS variables match createTheme() light output', () => {
    const theme = createTheme();
    const { rootBlock } = extractBlocks();
    const rootVars = parseVars(rootBlock);
    const mismatches: string[] = [];

    for (const [cssVar, accessor] of Object.entries(semanticVarMap)) {
      const cssValue = rootVars.get(cssVar);
      if (!cssValue) {
        mismatches.push(`${cssVar}: not found in :root`);
        continue;
      }
      const resolved = resolveValue(cssValue, rootVars);
      const themeValue = accessor(theme.light.semantic);

      if (resolved !== themeValue) {
        mismatches.push(`${cssVar}: css="${resolved}" theme="${themeValue}"`);
      }
    }

    if (mismatches.length > 0) {
      throw new Error(
        `CSS ↔ Theme sync failure (light mode):\n  ${mismatches.join('\n  ')}`
      );
    }
  });

  test('dark semantic CSS variables match createTheme() dark output', () => {
    const theme = createTheme();
    const { rootBlock, darkBlock } = extractBlocks();
    const rootVars = parseVars(rootBlock);
    const darkVars = parseVars(darkBlock);
    const mismatches: string[] = [];

    for (const [cssVar, accessor] of Object.entries(semanticVarMap)) {
      const cssValue = darkVars.get(cssVar);
      if (!cssValue) continue; // Not all semantic vars are overridden in dark
      const resolved = resolveValue(cssValue, rootVars);
      const themeValue = accessor(theme.dark.semantic);

      if (resolved !== themeValue) {
        mismatches.push(`${cssVar}: css="${resolved}" theme="${themeValue}"`);
      }
    }

    if (mismatches.length > 0) {
      throw new Error(
        `CSS ↔ Theme sync failure (dark mode):\n  ${mismatches.join('\n  ')}`
      );
    }
  });

  test('CSS contains all 69 light semantic variables', () => {
    const { rootBlock } = extractBlocks();
    const rootVars = parseVars(rootBlock);
    const missing = Object.keys(semanticVarMap).filter((v) => !rootVars.has(v));
    expect(missing).toEqual([]);
  });

  test('CSS contains all expected dark overrides', () => {
    const { darkBlock } = extractBlocks();
    const darkVars = parseVars(darkBlock);
    // Dark should override all semantic vars that change between light/dark
    expect(darkVars.size).toBeGreaterThan(50);
  });
});

// ============================================
// COMPONENT DARK ↔ THEME SYNC GUARD
// Ensures componentsDark matches createTheme().dark.components
// ============================================

describe('Component Dark ↔ Theme Sync Guard', () => {
  const theme = createTheme();
  const themeComponents = theme.dark.components;

  /**
   * Collect all leaf key paths and values from a nested object.
   */
  function collectLeaves(
    obj: Record<string, unknown>,
    prefix = ''
  ): Array<{ path: string; value: unknown }> {
    const leaves: Array<{ path: string; value: unknown }> = [];
    for (const [key, val] of Object.entries(obj)) {
      const fullPath = prefix ? `${prefix}.${key}` : key;
      if (typeof val === 'object' && val !== null) {
        leaves.push(...collectLeaves(val as Record<string, unknown>, fullPath));
      } else {
        leaves.push({ path: fullPath, value: val });
      }
    }
    return leaves;
  }

  /**
   * Get a nested value by dot-separated path.
   */
  function getByPath(obj: Record<string, unknown>, dotPath: string): unknown {
    const parts = dotPath.split('.');
    let current: unknown = obj;
    for (const part of parts) {
      if (current === null || current === undefined || typeof current !== 'object') return undefined;
      current = (current as Record<string, unknown>)[part];
    }
    return current;
  }

  // componentsDark has intentional overrides vs the generic theme derivation:
  // e.g., card.bg uses gray-800 (not gray-900), badge text uses brighter shades,
  // modal uses heavier overlay, glass uses medium (not light) for dark mode.
  // These are curated design choices, not drift.
  const knownOverrides = new Set([
    'card.bg',
    'badge.primary.text',
    'badge.secondary.text',
    'modal.bg',
    'modal.overlay',
    'glass.card.bg',
    'glass.nav.bg',
  ]);

  test('every theme dark component value exists in componentsDark (overrides allowed)', () => {
    const themeLeaves = collectLeaves(themeComponents as unknown as Record<string, unknown>);
    const mismatches: string[] = [];

    for (const { path: leafPath, value: themeVal } of themeLeaves) {
      const darkVal = getByPath(componentsDark as unknown as Record<string, unknown>, leafPath);
      if (darkVal === undefined) {
        mismatches.push(`${leafPath}: missing in componentsDark (theme="${themeVal}")`);
      } else if (darkVal !== themeVal && !knownOverrides.has(leafPath)) {
        mismatches.push(`${leafPath}: componentsDark="${darkVal}" theme="${themeVal}"`);
      }
    }

    if (mismatches.length > 0) {
      throw new Error(
        `componentsDark has drifted from createTheme().dark.components:\n  ${mismatches.join('\n  ')}`
      );
    }
  });

  test('theme dark component keys are a subset of componentsDark keys', () => {
    const themeLeaves = collectLeaves(themeComponents as unknown as Record<string, unknown>);
    const darkLeaves = collectLeaves(componentsDark as unknown as Record<string, unknown>);
    const darkPaths = new Set(darkLeaves.map((l) => l.path));

    const missingInDark = themeLeaves
      .map((l) => l.path)
      .filter((p) => !darkPaths.has(p));

    expect(missingInDark).toEqual([]);
  });

  test('componentsDark has extra keys beyond theme (superset check)', () => {
    // componentsDark is allowed to have extras (e.g., input.bgHover, badge.*.border, alert.*.icon, glass.modal)
    const themeLeaves = collectLeaves(themeComponents as unknown as Record<string, unknown>);
    const darkLeaves = collectLeaves(componentsDark as unknown as Record<string, unknown>);
    const themePaths = new Set(themeLeaves.map((l) => l.path));

    const extrasInDark = darkLeaves
      .map((l) => l.path)
      .filter((p) => !themePaths.has(p));

    // Just verify extras exist (this is expected behavior, not a failure)
    expect(extrasInDark.length).toBeGreaterThan(0);
  });
});

// ============================================
// FLUID TOKEN TESTS
// Validates CSS clamp() output format and constraints
// ============================================

describe('Fluid Token Tests', () => {
  const clampRegex = /^clamp\((\d+)px, calc\((\d+)px \+ (\d+) \* \(\(100vw - (\d+)px\) \/ (\d+)\)\), (\d+)px\)$/;

  describe('clampExpr', () => {
    test('returns plain Npx when min === max', () => {
      expect(clampExpr(10, 10)).toBe('10px');
      expect(clampExpr(0, 0)).toBe('0px');
    });

    test('returns valid clamp() when min < max', () => {
      const result = clampExpr(14, 20);
      expect(result).toMatch(/^clamp\(/);
      expect(result).toContain('100vw');
    });

    test('uses viewportMin (375) and viewportMax (1440) in calc', () => {
      const result = clampExpr(16, 24);
      expect(result).toContain(`${fluidConfig.viewportMin}px`);
      const range = fluidConfig.viewportMax - fluidConfig.viewportMin;
      expect(result).toContain(`${range})`);
    });
  });

  describe('fluid font-size tokens', () => {
    test.each(Object.entries(FLUID_FONT_SIZES))(
      'font-size %s: min (%d) <= max (%d)',
      (_key, [min, max]) => {
        expect(min).toBeLessThanOrEqual(max);
      }
    );

    test('fluid font sizes produce valid clamp() or fixed Npx', () => {
      for (const [, [min, max]] of Object.entries(FLUID_FONT_SIZES)) {
        const result = clampExpr(min, max);
        if (min === max) {
          expect(result).toBe(`${min}px`);
        } else {
          expect(result).toMatch(clampRegex);
        }
      }
    });

    test('fixed-size font tokens (2xs) stay as plain Npx', () => {
      const [min, max] = FLUID_FONT_SIZES['2xs'];
      expect(min).toBe(max);
      expect(clampExpr(min, max)).toBe(`${min}px`);
    });
  });

  describe('fluid spacing tokens', () => {
    test.each(Object.entries(FLUID_SPACINGS))(
      'spacing %s: min (%d) <= max (%d)',
      (_key, [min, max]) => {
        expect(min).toBeLessThanOrEqual(max);
      }
    );

    test('no spacing below key 4 is in the fluid map (0-3 stay fixed)', () => {
      for (const key of ['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5']) {
        expect(FLUID_SPACINGS[key]).toBeUndefined();
      }
    });

    test('all fluid spacings produce valid clamp() expressions', () => {
      for (const [, [min, max]] of Object.entries(FLUID_SPACINGS)) {
        const result = clampExpr(min, max);
        expect(result).toMatch(clampRegex);
      }
    });
  });

  describe('fluid radius tokens', () => {
    test.each(Object.entries(FLUID_RADII))(
      'radius %s: min (%d) <= max (%d)',
      (_key, [min, max]) => {
        expect(min).toBeLessThanOrEqual(max);
      }
    );

    test('small radius tokens (xs, sm, md) are NOT in the fluid map', () => {
      expect(FLUID_RADII['xs']).toBeUndefined();
      expect(FLUID_RADII['sm']).toBeUndefined();
      expect(FLUID_RADII['md']).toBeUndefined();
    });

    test('all fluid radii produce valid clamp() expressions', () => {
      for (const [, [min, max]] of Object.entries(FLUID_RADII)) {
        const result = clampExpr(min, max);
        expect(result).toMatch(clampRegex);
      }
    });
  });

  describe('clamp() format validation', () => {
    test('clamp min value matches first argument', () => {
      const result = clampExpr(14, 20);
      const match = result.match(clampRegex);
      expect(match).not.toBeNull();
      expect(parseInt(match![1])).toBe(14); // first clamp arg = min
      expect(parseInt(match![6])).toBe(20); // last clamp arg = max
    });

    test('calc contains correct delta', () => {
      const result = clampExpr(16, 24);
      // delta = 24 - 16 = 8
      expect(result).toContain('8 *');
    });
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

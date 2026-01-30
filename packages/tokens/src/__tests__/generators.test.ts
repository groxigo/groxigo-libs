/**
 * Generator Tests
 *
 * Validates that generators produce correct output formats.
 * Updated for the generic three-tier architecture.
 */

import { generateCSS } from '../generators/css';
import { generateReactNative } from '../generators/react-native';
import { generateJSON } from '../generators/json';

// ============================================
// CSS GENERATOR TESTS
// ============================================

describe('CSS Generator', () => {
  let cssOutput: string;

  beforeAll(() => {
    cssOutput = generateCSS();
  });

  test('generates valid CSS with :root selector', () => {
    expect(cssOutput).toContain(':root {');
    expect(cssOutput).toContain('}');
  });

  test('includes font import', () => {
    expect(cssOutput).toContain('@import url(');
    expect(cssOutput).toContain('Inter');
  });

  test('generates primitive color variables', () => {
    expect(cssOutput).toContain('--color-gray-50:');
    expect(cssOutput).toContain('--color-blue-600:');
    expect(cssOutput).toContain('--color-green-500:');
    expect(cssOutput).toContain('--color-red-400:');
    expect(cssOutput).toContain('--color-yellow-700:');
  });

  test('generates new color families', () => {
    expect(cssOutput).toContain('--color-orange-');
    expect(cssOutput).toContain('--color-purple-');
    expect(cssOutput).toContain('--color-cyan-');
    expect(cssOutput).toContain('--color-pink-');
    expect(cssOutput).toContain('--color-indigo-');
    expect(cssOutput).toContain('--color-teal-');
  });

  test('generates semantic surface variables', () => {
    expect(cssOutput).toContain('--surface-primary:');
    expect(cssOutput).toContain('--surface-secondary:');
    expect(cssOutput).toContain('--surface-tertiary:');
    expect(cssOutput).toContain('--surface-elevated:');
    expect(cssOutput).toContain('--surface-disabled:');
  });

  test('generates semantic text variables', () => {
    expect(cssOutput).toContain('--text-primary:');
    expect(cssOutput).toContain('--text-secondary:');
    expect(cssOutput).toContain('--text-tertiary:');
    expect(cssOutput).toContain('--text-inverse:');
    expect(cssOutput).toContain('--text-link:');
  });

  test('generates semantic border variables', () => {
    expect(cssOutput).toContain('--border-subtle:');
    expect(cssOutput).toContain('--border-default:');
    expect(cssOutput).toContain('--border-strong:');
    expect(cssOutput).toContain('--border-focus:');
  });

  test('generates brand variables', () => {
    expect(cssOutput).toContain('--brand-primary:');
    expect(cssOutput).toContain('--brand-primary-hover:');
    expect(cssOutput).toContain('--brand-secondary:');
    expect(cssOutput).toContain('--brand-accent:');
  });

  test('generates status variables', () => {
    expect(cssOutput).toContain('--status-success:');
    expect(cssOutput).toContain('--status-warning:');
    expect(cssOutput).toContain('--status-error:');
    expect(cssOutput).toContain('--status-info:');
  });

  test('generates component button variables', () => {
    expect(cssOutput).toContain('--button-primary-bg:');
    expect(cssOutput).toContain('--button-primary-text:');
    expect(cssOutput).toContain('--button-secondary-bg:');
    expect(cssOutput).toContain('--button-outline-bg:');
    expect(cssOutput).toContain('--button-ghost-bg:');
    expect(cssOutput).toContain('--button-danger-bg:');
  });

  test('generates component input variables', () => {
    expect(cssOutput).toContain('--input-bg:');
    expect(cssOutput).toContain('--input-text:');
    expect(cssOutput).toContain('--input-border:');
    expect(cssOutput).toContain('--input-border-focus:');
    expect(cssOutput).toContain('--input-border-error:');
  });

  test('generates component card variables', () => {
    expect(cssOutput).toContain('--card-bg:');
    expect(cssOutput).toContain('--card-border:');
  });

  test('generates glass variables', () => {
    expect(cssOutput).toContain('--glass-surface-');
    expect(cssOutput).toContain('--glass-border-');
    expect(cssOutput).toContain('--glass-card-bg:');
    expect(cssOutput).toContain('--glass-button-bg:');
  });

  test('generates animation variables', () => {
    expect(cssOutput).toContain('--duration-fast:');
    expect(cssOutput).toContain('--duration-normal:');
    expect(cssOutput).toContain('--easing-standard:');
    expect(cssOutput).toContain('--transition-all:');
    expect(cssOutput).toContain('--delay-short:');
  });

  test('generates dark mode media query', () => {
    expect(cssOutput).toContain('@media (prefers-color-scheme: dark)');
  });

  test('generates dark mode class selector', () => {
    expect(cssOutput).toContain('.dark {');
  });

  test('dark mode overrides light mode variables', () => {
    // Check that dark mode contains overrides for key variables
    const darkModeSection = cssOutput.split('.dark {')[1];
    expect(darkModeSection).toContain('--surface-primary:');
    expect(darkModeSection).toContain('--text-primary:');
  });

  test('generates blur tokens', () => {
    expect(cssOutput).toContain('--blur-none:');
    expect(cssOutput).toContain('--blur-sm:');
    expect(cssOutput).toContain('--blur-md:');
  });

  test('CSS variables use var() references where appropriate', () => {
    // Semantic tokens should reference primitives
    expect(cssOutput).toContain('var(--color-');
    // Component tokens should reference semantic tokens
    expect(cssOutput).toContain('var(--surface-');
    expect(cssOutput).toContain('var(--text-');
    expect(cssOutput).toContain('var(--brand-');
  });
});

// ============================================
// REACT NATIVE GENERATOR TESTS
// ============================================

describe('React Native Generator', () => {
  let rnOutput: string;

  beforeAll(() => {
    rnOutput = generateReactNative();
  });

  test('generates valid JavaScript export', () => {
    expect(rnOutput).toContain('export const tokens =');
    expect(rnOutput).toContain('export default tokens;');
  });

  test('generates helper function for theme colors', () => {
    expect(rnOutput).toContain('export function getThemeColors(isDark)');
  });

  test('generates helper function for themed styles', () => {
    expect(rnOutput).toContain('export function createThemedStyles(stylesFn)');
  });

  test('includes JSDoc example', () => {
    expect(rnOutput).toContain('@example');
    expect(rnOutput).toContain('StyleSheet.create');
  });

  test('includes dark mode usage example', () => {
    expect(rnOutput).toContain('useColorScheme');
  });

  test('output is valid JSON when extracted', () => {
    // Extract the tokens object from the output
    const tokensMatch = rnOutput.match(/export const tokens = ({[\s\S]*?});/);
    expect(tokensMatch).not.toBeNull();

    if (tokensMatch) {
      const tokensJson = tokensMatch[1];
      expect(() => JSON.parse(tokensJson)).not.toThrow();
    }
  });

  test('includes all token categories', () => {
    expect(rnOutput).toContain('"colors"');
    expect(rnOutput).toContain('"spacing"');
    expect(rnOutput).toContain('"typography"');
    expect(rnOutput).toContain('"shadows"');
    expect(rnOutput).toContain('"radius"');
    expect(rnOutput).toContain('"opacity"');
    expect(rnOutput).toContain('"blur"');
    expect(rnOutput).toContain('"animation"');
  });

  test('includes three-tier color structure', () => {
    expect(rnOutput).toContain('"primitives"');
    expect(rnOutput).toContain('"semantic"');
    expect(rnOutput).toContain('"components"');
  });

  test('includes dark mode tokens', () => {
    expect(rnOutput).toContain('"dark"');
  });

  test('color values are hex strings', () => {
    // Check for hex color pattern in output
    expect(rnOutput).toMatch(/"#[0-9A-Fa-f]{6}"/);
  });
});

// ============================================
// JSON GENERATOR TESTS
// ============================================

describe('JSON Generator', () => {
  let jsonOutput: string;
  let parsedJson: any;

  beforeAll(() => {
    jsonOutput = generateJSON();
    parsedJson = JSON.parse(jsonOutput);
  });

  test('generates valid JSON', () => {
    expect(() => JSON.parse(jsonOutput)).not.toThrow();
  });

  test('has correct Figma Tokens Studio structure', () => {
    // Figma Tokens Studio expects a collections-based structure
    expect(parsedJson).toHaveProperty('collections');
    expect(parsedJson.collections).toHaveProperty('Primitives');
    expect(parsedJson.collections).toHaveProperty('Semantic');
    expect(parsedJson.collections).toHaveProperty('Components');
  });

  test('primitives collection has color families', () => {
    const primitives = parsedJson.collections?.['Primitives'];
    expect(primitives).toBeDefined();
    expect(primitives.variables).toHaveProperty('Gray');
    expect(primitives.variables).toHaveProperty('Blue');
    expect(primitives.variables).toHaveProperty('Green');
    expect(primitives.variables).toHaveProperty('Red');
    expect(primitives.variables).toHaveProperty('Yellow');
    expect(primitives.variables).toHaveProperty('Orange');
    expect(primitives.variables).toHaveProperty('Purple');
    expect(primitives.variables).toHaveProperty('Cyan');
  });

  test('primitives has absolute colors', () => {
    const primitives = parsedJson.collections?.['Primitives'];
    expect(primitives.variables).toHaveProperty('Absolute');
    expect(primitives.variables.Absolute.White).toBe('#ffffff');
    expect(primitives.variables.Absolute.Black).toBe('#000000');
  });

  test('primitives has modes and description', () => {
    const primitives = parsedJson.collections?.['Primitives'];
    expect(primitives).toHaveProperty('modes');
    expect(primitives).toHaveProperty('description');
    expect(primitives.modes).toContain('Light');
  });

  test('semantic collection has surface, text, border tokens', () => {
    const semantic = parsedJson.collections?.['Semantic'];
    expect(semantic).toBeDefined();
    expect(semantic.variables).toHaveProperty('Surface');
    expect(semantic.variables).toHaveProperty('Text');
    expect(semantic.variables).toHaveProperty('Border');
  });

  test('semantic collection has brand tokens', () => {
    const semantic = parsedJson.collections?.['Semantic'];
    expect(semantic.variables).toHaveProperty('Brand');
    expect(semantic.variables.Brand).toHaveProperty('Primary');
    expect(semantic.variables.Brand).toHaveProperty('Secondary');
    expect(semantic.variables.Brand).toHaveProperty('Accent');
  });

  test('semantic collection has status tokens', () => {
    const semantic = parsedJson.collections?.['Semantic'];
    expect(semantic.variables).toHaveProperty('Status');
    expect(semantic.variables.Status).toHaveProperty('Success');
    expect(semantic.variables.Status).toHaveProperty('Warning');
    expect(semantic.variables.Status).toHaveProperty('Error');
    expect(semantic.variables.Status).toHaveProperty('Info');
  });

  test('semantic collection has glass tokens', () => {
    const semantic = parsedJson.collections?.['Semantic'];
    expect(semantic.variables).toHaveProperty('Glass');
    expect(semantic.variables.Glass).toHaveProperty('Surface');
    expect(semantic.variables.Glass).toHaveProperty('Border');
  });

  test('component collection has button tokens', () => {
    const components = parsedJson.collections?.['Components'];
    expect(components).toBeDefined();
    expect(components.variables).toHaveProperty('Button');
    expect(components.variables.Button).toHaveProperty('Primary');
    expect(components.variables.Button).toHaveProperty('Secondary');
    expect(components.variables.Button).toHaveProperty('Outline');
    expect(components.variables.Button).toHaveProperty('Ghost');
    expect(components.variables.Button).toHaveProperty('Danger');
  });

  test('component collection has input and card tokens', () => {
    const components = parsedJson.collections?.['Components'];
    expect(components.variables).toHaveProperty('Input');
    expect(components.variables).toHaveProperty('Card');
  });

  test('component collection has badge tokens', () => {
    const components = parsedJson.collections?.['Components'];
    expect(components.variables).toHaveProperty('Badge');
    expect(components.variables.Badge).toHaveProperty('Default');
    expect(components.variables.Badge).toHaveProperty('Success');
    expect(components.variables.Badge).toHaveProperty('Error');
  });

  test('component collection has glass components', () => {
    const components = parsedJson.collections?.['Components'];
    expect(components.variables).toHaveProperty('Glass');
    expect(components.variables.Glass).toHaveProperty('Card');
    expect(components.variables.Glass).toHaveProperty('Button');
    expect(components.variables.Glass).toHaveProperty('Nav');
  });

  test('semantic and component collections have Light and Dark modes', () => {
    const semantic = parsedJson.collections?.['Semantic'];
    const components = parsedJson.collections?.['Components'];
    expect(semantic.modes).toContain('Light');
    expect(semantic.modes).toContain('Dark');
    expect(components.modes).toContain('Light');
    expect(components.modes).toContain('Dark');
  });

  test('semantic tokens use arrow references to primitives', () => {
    const semantic = parsedJson.collections?.['Semantic'];
    // Surface tokens should reference primitives
    expect(semantic.variables.Surface.Primary).toContain('→ Primitives/');
    expect(semantic.variables.Text.Primary).toContain('→ Primitives/');
  });

  test('component tokens use arrow references to semantic', () => {
    const components = parsedJson.collections?.['Components'];
    // Button tokens should reference semantic
    expect(components.variables.Button.Primary.BG).toContain('→ Semantic/');
    expect(components.variables.Button.Primary.Text).toContain('→ Semantic/');
  });
});

// ============================================
// CROSS-GENERATOR CONSISTENCY TESTS
// ============================================

describe('Cross-Generator Consistency', () => {
  let cssOutput: string;
  let rnOutput: string;
  let jsonOutput: string;

  beforeAll(() => {
    cssOutput = generateCSS();
    rnOutput = generateReactNative();
    jsonOutput = generateJSON();
  });

  test('all generators include the same color families', () => {
    const colorFamilies = ['gray', 'blue', 'green', 'red', 'yellow', 'orange', 'purple', 'cyan'];

    colorFamilies.forEach((family) => {
      expect(cssOutput.toLowerCase()).toContain(family);
      expect(rnOutput.toLowerCase()).toContain(family);
      expect(jsonOutput.toLowerCase()).toContain(family);
    });
  });

  test('specific color values match across generators', () => {
    // Blue 600 should be consistent
    const blue600 = '#2563eb';
    expect(cssOutput).toContain(blue600);
    expect(rnOutput).toContain(blue600);
    expect(jsonOutput).toContain(blue600);
  });

  test('spacing values are consistent', () => {
    // Spacing 4 = 16
    expect(rnOutput).toContain('"4": 16');
  });

  test('all generators support three-tier architecture', () => {
    // CSS has primitive, semantic, and component layers
    expect(cssOutput).toContain('--color-'); // Primitives
    expect(cssOutput).toContain('--surface-'); // Semantic
    expect(cssOutput).toContain('--button-'); // Components

    // RN has primitives, semantic, components
    expect(rnOutput).toContain('"primitives"');
    expect(rnOutput).toContain('"semantic"');
    expect(rnOutput).toContain('"components"');

    // JSON has Primitives, Semantic, Components collections
    expect(jsonOutput).toContain('"Primitives"');
    expect(jsonOutput).toContain('"Semantic"');
    expect(jsonOutput).toContain('"Components"');
  });
});

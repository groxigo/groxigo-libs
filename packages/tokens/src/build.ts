/**
 * Build Script
 *
 * Generates platform-specific output files from token sources.
 * Supports multiple output formats for different use cases.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { generateCSS } from './generators/css';
import { generateReactNative } from './generators/react-native';
import { generateJSON } from './generators/json';
import { generateSCSS, generateCSSModules } from './generators/scss';
import { generateCSSTypes } from './generators/css-types';
import { generateDocs } from './generators/docs';
import { validateTokens } from './utils/validation';
import { tokens } from './tokens';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, '../dist');

// Ensure dist directories exist
function ensureDirs() {
  const dirs = [
    path.join(DIST_DIR, 'css'),
    path.join(DIST_DIR, 'scss'),
    path.join(DIST_DIR, 'js'),
    path.join(DIST_DIR, 'json'),
    path.join(DIST_DIR, 'types'),
    path.join(DIST_DIR, 'docs'),
  ];

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

// Validate tokens before build
function validateBeforeBuild(): boolean {
  console.log('🔍 Validating tokens...');
  const result = validateTokens(tokens);

  if (!result.valid) {
    console.error('❌ Token validation failed:');
    for (const error of result.errors) {
      console.error(`   ${error.path}: ${error.message}`);
    }
    return false;
  }

  if (result.warnings.length > 0) {
    console.warn('⚠️  Token warnings:');
    for (const warning of result.warnings) {
      console.warn(`   ${warning.path}: ${warning.message}`);
      if (warning.suggestion) {
        console.warn(`   💡 ${warning.suggestion}`);
      }
    }
  }

  console.log('✅ Tokens validated successfully\n');
  return true;
}

// Build all platform outputs
function build() {
  console.log('🏗️  Building Groxigo Design Tokens...\n');

  ensureDirs();

  // Validate first
  if (!validateBeforeBuild()) {
    process.exit(1);
  }

  try {
    // Generate CSS
    console.log('📝 Generating CSS variables...');
    const css = generateCSS();
    const cssPath = path.join(DIST_DIR, 'css', 'tokens.css');
    fs.writeFileSync(cssPath, css, 'utf-8');
    console.log(`   ✅ ${cssPath}`);

    // Generate minified CSS
    const cssMinPath = path.join(DIST_DIR, 'css', 'tokens.min.css');
    const cssMin = css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/\s*([{}:;,])\s*/g, '$1') // Remove space around punctuation
      .trim();
    fs.writeFileSync(cssMinPath, cssMin, 'utf-8');
    console.log(`   ✅ ${cssMinPath}`);

    // Generate SCSS
    console.log('📝 Generating SCSS variables...');
    const scss = generateSCSS();
    const scssPath = path.join(DIST_DIR, 'scss', '_tokens.scss');
    fs.writeFileSync(scssPath, scss, 'utf-8');
    console.log(`   ✅ ${scssPath}`);

    // Generate CSS Modules
    const cssModules = generateCSSModules();
    const cssModulesPath = path.join(DIST_DIR, 'css', 'tokens.module.css');
    fs.writeFileSync(cssModulesPath, cssModules, 'utf-8');
    console.log(`   ✅ ${cssModulesPath}`);

    // Generate React Native
    console.log('📱 Generating React Native tokens...');
    const rn = generateReactNative();
    const rnPath = path.join(DIST_DIR, 'js', 'tokens.js');
    fs.writeFileSync(rnPath, rn, 'utf-8');
    console.log(`   ✅ ${rnPath}`);

    // Generate JSON (Figma)
    console.log('🎨 Generating JSON (Figma) tokens...');
    const json = generateJSON();
    const jsonPath = path.join(DIST_DIR, 'json', 'tokens.json');
    fs.writeFileSync(jsonPath, json, 'utf-8');
    console.log(`   ✅ ${jsonPath}`);

    // Generate JSON (flat structure for easier consumption)
    const flatJson = generateFlatJSON();
    const flatJsonPath = path.join(DIST_DIR, 'json', 'tokens.flat.json');
    fs.writeFileSync(flatJsonPath, flatJson, 'utf-8');
    console.log(`   ✅ ${flatJsonPath}`);

    // Generate CSS variable TypeScript types (reuses the css string from above)
    console.log('📘 Generating CSS variable types...');
    const cssTypes = generateCSSTypes(css);
    const cssTypesPath = path.join(DIST_DIR, 'types', 'css-vars.d.ts');
    fs.writeFileSync(cssTypesPath, cssTypes, 'utf-8');
    console.log(`   ✅ ${cssTypesPath}`);

    // Generate token documentation
    console.log('📖 Generating token documentation...');
    const docs = generateDocs();
    const docsPath = path.join(DIST_DIR, 'docs', 'token-catalog.md');
    fs.writeFileSync(docsPath, docs, 'utf-8');
    console.log(`   ✅ ${docsPath}`);

    console.log('\n✨ Build complete!');
    console.log('\n📦 Generated files:');
    console.log('   - dist/css/tokens.css        (CSS variables)');
    console.log('   - dist/css/tokens.min.css    (Minified CSS)');
    console.log('   - dist/css/tokens.module.css (CSS Modules)');
    console.log('   - dist/scss/_tokens.scss     (SCSS variables + mixins)');
    console.log('   - dist/js/tokens.js          (React Native/JS)');
    console.log('   - dist/json/tokens.json      (Figma Tokens Studio)');
    console.log('   - dist/json/tokens.flat.json (Flat JSON)');
    console.log('   - dist/types/css-vars.d.ts   (CSS variable types)');
    console.log('   - dist/docs/token-catalog.md (Token documentation)');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// Generate flat JSON for easy consumption
function generateFlatJSON(): string {
  const flat: Record<string, unknown> = {};

  // Flatten colors
  const colorFamilies = ['gray', 'blue', 'green', 'red', 'yellow', 'orange', 'purple', 'cyan', 'pink', 'indigo', 'teal'] as const;
  for (const family of colorFamilies) {
    const shades = tokens.colors.primitives[family];
    for (const [shade, value] of Object.entries(shades)) {
      flat[`color.${family}.${shade}`] = value;
    }
  }

  // Flatten semantic
  flat['color.white'] = tokens.colors.primitives.white;
  flat['color.black'] = tokens.colors.primitives.black;

  // Flatten spacing
  for (const [key, value] of Object.entries(tokens.spacing)) {
    if (key === 'base') continue; // internal multiplier, not a public token
    flat[`spacing.${key}`] = value;
  }

  // Flatten typography
  for (const [key, value] of Object.entries(tokens.typography.fontSize)) {
    flat[`fontSize.${key}`] = value;
  }
  for (const [key, value] of Object.entries(tokens.typography.fontWeight)) {
    flat[`fontWeight.${key}`] = value;
  }

  // Flatten radius
  for (const [key, value] of Object.entries(tokens.radius)) {
    if (key === 'base') continue; // internal value, not a public token
    flat[`radius.${key}`] = value;
  }

  // Flatten shadows
  for (const [key, value] of Object.entries(tokens.shadows)) {
    if (typeof value === 'string') {
      flat[`shadow.${key}`] = value;
    } else if (typeof value === 'object') {
      for (const [subKey, subValue] of Object.entries(value)) {
        flat[`shadow.${key}.${subKey}`] = subValue;
      }
    }
  }

  // Flatten blur
  for (const [key, value] of Object.entries(tokens.blur)) {
    flat[`blur.${key}`] = value;
  }

  // Flatten animation durations
  for (const [key, value] of Object.entries(tokens.animation.duration)) {
    flat[`duration.${key}`] = value;
  }

  // Flatten chart colors (§36)
  for (const [key, value] of Object.entries(tokens.colors.chart.categorical)) {
    flat[`chart.categorical.${key}`] = value;
  }
  for (const [key, value] of Object.entries(tokens.colors.chart.sequential)) {
    flat[`chart.sequential.${key}`] = value;
  }
  tokens.colors.chart.diverging.forEach((value, i) => {
    flat[`chart.diverging.${i + 1}`] = value;
  });
  flat['chart.neutral'] = tokens.colors.chart.neutral;

  // Flatten opacity
  for (const [key, value] of Object.entries(tokens.opacity)) {
    flat[`opacity.${key}`] = value;
  }

  // Flatten z-index
  for (const [key, value] of Object.entries(tokens.zIndex)) {
    flat[`zIndex.${key}`] = value;
  }

  // Flatten border widths
  for (const [key, value] of Object.entries(tokens.border.width)) {
    flat[`borderWidth.${key}`] = value;
  }

  // Flatten icon sizes
  for (const [key, value] of Object.entries(tokens.icon.size)) {
    flat[`iconSize.${key}`] = value;
  }
  for (const [key, value] of Object.entries(tokens.icon.container)) {
    flat[`iconContainer.${key}`] = value;
  }

  // Flatten layout
  flat['layout.pageMaxWidth'] = tokens.layout.pageMaxWidth;
  flat['layout.contentMaxWidth'] = tokens.layout.contentMaxWidth;
  flat['layout.narrowMaxWidth'] = tokens.layout.narrowMaxWidth;
  flat['layout.sidebarWidth'] = tokens.layout.sidebarWidth;
  flat['layout.screenMargin.mobile'] = tokens.layout.screenMargin.mobile;
  flat['layout.screenMargin.tablet'] = tokens.layout.screenMargin.tablet;
  flat['layout.gridGutter.mobile'] = tokens.layout.gridGutter.mobile;
  flat['layout.gridGutter.tablet'] = tokens.layout.gridGutter.tablet;
  flat['layout.gridGutter.desktop'] = tokens.layout.gridGutter.desktop;

  // Flatten focus ring
  for (const [key, value] of Object.entries(tokens.focus.width)) {
    flat[`focusRing.width.${key}`] = value;
  }
  for (const [key, value] of Object.entries(tokens.focus.offset)) {
    flat[`focusRing.offset.${key}`] = value;
  }

  return JSON.stringify(flat, null, 2);
}

// Run build if executed directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('/build.ts')) {
  build();
}

export { build };

/**
 * Build Script
 *
 * Generates platform-specific output files from token sources.
 * Supports multiple output formats for different use cases.
 */

import * as fs from 'fs';
import * as path from 'path';
import { generateCSS } from './generators/css';
import { generateReactNative } from './generators/react-native';
import { generateJSON } from './generators/json';
import { generateSCSS, generateCSSModules } from './generators/scss';
import { validateTokens } from './utils/validation';
import { tokens } from './tokens';

const DIST_DIR = path.join(__dirname, '../dist');

// Ensure dist directories exist
function ensureDirs() {
  const dirs = [
    path.join(DIST_DIR, 'css'),
    path.join(DIST_DIR, 'scss'),
    path.join(DIST_DIR, 'js'),
    path.join(DIST_DIR, 'json'),
    path.join(DIST_DIR, 'types'),
  ];

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

// Generate TypeScript declaration file
function generateTypeDeclaration(): string {
  return `/**
 * Groxigo Design Tokens - Type Declarations
 * Auto-generated - Do not edit directly
 */

export * from '../src/types';
export * from '../src/tokens';
export * from '../src/theme';
export * from '../src/utils';

import { tokens } from '../src/tokens';
export default tokens;
`;
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

    // Generate TypeScript declarations
    console.log('📘 Generating TypeScript declarations...');
    const dts = generateTypeDeclaration();
    const dtsPath = path.join(DIST_DIR, 'types', 'index.d.ts');
    fs.writeFileSync(dtsPath, dts, 'utf-8');
    console.log(`   ✅ ${dtsPath}`);

    console.log('\n✨ Build complete!');
    console.log('\n📦 Generated files:');
    console.log('   - dist/css/tokens.css       (CSS variables)');
    console.log('   - dist/css/tokens.min.css   (Minified CSS)');
    console.log('   - dist/css/tokens.module.css (CSS Modules)');
    console.log('   - dist/scss/_tokens.scss    (SCSS variables + mixins)');
    console.log('   - dist/js/tokens.js         (React Native/JS)');
    console.log('   - dist/json/tokens.json     (Figma Tokens Studio)');
    console.log('   - dist/json/tokens.flat.json (Flat JSON)');
    console.log('   - dist/types/index.d.ts     (TypeScript declarations)');
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
    flat[`radius.${key}`] = value;
  }

  // Flatten shadows
  for (const [key, value] of Object.entries(tokens.shadows)) {
    if (typeof value === 'string') {
      flat[`shadow.${key}`] = value;
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

  return JSON.stringify(flat, null, 2);
}

// Run build if executed directly
if (require.main === module) {
  build();
}

export { build };

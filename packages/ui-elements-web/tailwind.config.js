/**
 * Tailwind Configuration for @groxigo/ui-elements-web
 *
 * This config uses @groxigo/tokens to ensure consistency
 * between mobile and web platforms.
 *
 * Usage in your Next.js app:
 * ```js
 * // tailwind.config.js
 * const groxigoConfig = require('@groxigo/ui-elements-web/tailwind');
 * module.exports = {
 *   presets: [groxigoConfig],
 *   content: [
 *     './src/**\/*.{js,ts,jsx,tsx}',
 *     './node_modules/@groxigo/ui-elements-web/**\/*.{js,ts,jsx,tsx}',
 *   ],
 * };
 * ```
 */

// Import tokens from @groxigo/tokens
// Note: For CommonJS compatibility, we import from the built dist if available,
// otherwise fall back to requiring the package directly (monorepo workspace resolution)
let tokens;
try {
  // In production or when package is published, use the built dist
  tokens = require('@groxigo/tokens/dist/js/tokens');
} catch {
  // In development/monorepo, the package.json exports will resolve
  // We need to handle TypeScript source - use a dynamic approach
  try {
    // Try direct require (works if ts-node or similar is configured)
    tokens = require('@groxigo/tokens');
  } catch {
    // Fallback: define tokens inline for build compatibility
    // This should rarely happen - primarily when tokens package isn't built
    console.warn(
      '@groxigo/ui-elements-web: Could not load @groxigo/tokens. Using fallback values.'
    );
    tokens = null;
  }
}

// Helper to convert pixel values to Tailwind-compatible strings
const pxToString = (value) => (typeof value === 'number' ? `${value}px` : value);

// Helper to create spacing object with px strings from tokens
const createSpacing = (spacingTokens) => {
  if (!spacingTokens) return {};
  const result = {};
  for (const [key, value] of Object.entries(spacingTokens)) {
    if (key === 'base') continue; // Skip the base unit meta property
    if (typeof value === 'number') {
      result[key] = pxToString(value);
    }
  }
  return result;
};

// Helper to create border radius object with px strings from tokens
const createRadius = (radiusTokens) => {
  if (!radiusTokens) return {};
  const result = {};
  for (const [key, value] of Object.entries(radiusTokens)) {
    if (key === 'base') continue; // Skip the base unit meta property
    if (typeof value === 'number') {
      result[key] = value === 9999 ? '9999px' : pxToString(value);
    }
  }
  return result;
};

// Helper to create font size object with line heights
const createFontSizes = (fontSizeTokens, lineHeightTokens) => {
  if (!fontSizeTokens) return {};
  const result = {};
  // Default line height multiplier
  const defaultLineHeight = lineHeightTokens?.normal || 1.5;

  for (const [key, size] of Object.entries(fontSizeTokens)) {
    if (typeof size === 'number') {
      // Calculate line height based on font size
      const lineHeight = Math.round(size * defaultLineHeight);
      result[key] = [pxToString(size), { lineHeight: pxToString(lineHeight) }];
    }
  }
  return result;
};

// Extract tokens or use fallbacks
const primitives = tokens?.colors?.primitives || tokens?.default?.colors?.primitives || {};
const semantic = tokens?.colors?.semantic || tokens?.default?.colors?.semantic || {};
const spacing = tokens?.spacing || tokens?.default?.spacing || {};
const typography = tokens?.typography || tokens?.default?.typography || {};
const radius = tokens?.radius || tokens?.default?.radius || {};
const shadows = tokens?.shadows || tokens?.default?.shadows || {};
const animation = tokens?.animation || tokens?.default?.animation || {};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Colors from @groxigo/tokens
      colors: {
        // Primitive color palettes
        gray: primitives.gray || {},
        blue: primitives.blue || {},
        green: primitives.green || {},
        red: primitives.red || {},
        yellow: primitives.yellow || {},
        orange: primitives.orange || {},
        purple: primitives.purple || {},
        cyan: primitives.cyan || {},
        pink: primitives.pink || {},
        indigo: primitives.indigo || {},
        teal: primitives.teal || {},

        // Brand colors (mapped from semantic tokens)
        primary: {
          50: primitives.blue?.[50] || '#eff6ff',
          100: primitives.blue?.[100] || '#dbeafe',
          200: primitives.blue?.[200] || '#bfdbfe',
          300: primitives.blue?.[300] || '#93c5fd',
          400: primitives.blue?.[400] || '#60a5fa',
          500: primitives.blue?.[500] || '#3b82f6',
          600: primitives.blue?.[600] || '#2563eb',
          700: primitives.blue?.[700] || '#1d4ed8',
          800: primitives.blue?.[800] || '#1e40af',
          900: primitives.blue?.[900] || '#1e3a8a',
          DEFAULT: semantic.brand?.primary?.default || primitives.blue?.[600] || '#2563eb',
        },
        secondary: {
          50: primitives.purple?.[50] || '#faf5ff',
          100: primitives.purple?.[100] || '#f3e8ff',
          200: primitives.purple?.[200] || '#e9d5ff',
          300: primitives.purple?.[300] || '#d8b4fe',
          400: primitives.purple?.[400] || '#c084fc',
          500: primitives.purple?.[500] || '#a855f7',
          600: primitives.purple?.[600] || '#9333ea',
          700: primitives.purple?.[700] || '#7c3aed',
          800: primitives.purple?.[800] || '#6b21a8',
          900: primitives.purple?.[900] || '#581c87',
          DEFAULT: semantic.brand?.secondary?.default || primitives.purple?.[600] || '#9333ea',
        },
        accent: {
          50: primitives.cyan?.[50] || '#ecfeff',
          100: primitives.cyan?.[100] || '#cffafe',
          200: primitives.cyan?.[200] || '#a5f3fc',
          300: primitives.cyan?.[300] || '#67e8f9',
          400: primitives.cyan?.[400] || '#22d3ee',
          500: primitives.cyan?.[500] || '#06b6d4',
          600: primitives.cyan?.[600] || '#0891b2',
          700: primitives.cyan?.[700] || '#0e7490',
          800: primitives.cyan?.[800] || '#155e75',
          900: primitives.cyan?.[900] || '#164e63',
          DEFAULT: semantic.brand?.accent?.default || primitives.cyan?.[500] || '#06b6d4',
        },

        // Semantic status colors
        success: {
          light: primitives.green?.[400] || '#4ade80',
          DEFAULT: semantic.status?.success?.default || primitives.green?.[600] || '#16a34a',
          dark: primitives.green?.[700] || '#15803d',
          subtle: semantic.status?.success?.subtle || primitives.green?.[50] || '#f0fdf4',
          muted: semantic.status?.success?.muted || primitives.green?.[100] || '#dcfce7',
        },
        warning: {
          light: primitives.yellow?.[400] || '#facc15',
          DEFAULT: semantic.status?.warning?.default || primitives.yellow?.[500] || '#eab308',
          dark: primitives.yellow?.[600] || '#ca8a04',
          subtle: semantic.status?.warning?.subtle || primitives.yellow?.[50] || '#fefce8',
          muted: semantic.status?.warning?.muted || primitives.yellow?.[100] || '#fef9c3',
        },
        error: {
          light: primitives.red?.[400] || '#f87171',
          DEFAULT: semantic.status?.error?.default || primitives.red?.[600] || '#dc2626',
          dark: primitives.red?.[700] || '#b91c1c',
          subtle: semantic.status?.error?.subtle || primitives.red?.[50] || '#fef2f2',
          muted: semantic.status?.error?.muted || primitives.red?.[100] || '#fee2e2',
        },
        info: {
          light: primitives.blue?.[400] || '#60a5fa',
          DEFAULT: semantic.status?.info?.default || primitives.blue?.[500] || '#3b82f6',
          dark: primitives.blue?.[600] || '#2563eb',
          subtle: semantic.status?.info?.subtle || primitives.blue?.[50] || '#eff6ff',
          muted: semantic.status?.info?.muted || primitives.blue?.[100] || '#dbeafe',
        },

        // Surface colors
        surface: {
          primary: semantic.surface?.primary || primitives.white || '#ffffff',
          secondary: semantic.surface?.secondary || primitives.gray?.[50] || '#f8fafc',
          tertiary: semantic.surface?.tertiary || primitives.gray?.[100] || '#f1f5f9',
          elevated: semantic.surface?.elevated || primitives.white || '#ffffff',
          sunken: semantic.surface?.sunken || primitives.gray?.[100] || '#f1f5f9',
          disabled: semantic.surface?.disabled || primitives.gray?.[100] || '#f1f5f9',
        },

        // Text colors
        text: {
          primary: semantic.text?.primary || primitives.gray?.[900] || '#0f172a',
          secondary: semantic.text?.secondary || primitives.gray?.[600] || '#475569',
          tertiary: semantic.text?.tertiary || primitives.gray?.[500] || '#64748b',
          disabled: semantic.text?.disabled || primitives.gray?.[400] || '#94a3b8',
          inverse: semantic.text?.inverse || primitives.white || '#ffffff',
          link: semantic.text?.link || primitives.blue?.[600] || '#2563eb',
        },

        // Border colors
        border: {
          DEFAULT: semantic.border?.default || primitives.gray?.[300] || '#cbd5e1',
          subtle: semantic.border?.subtle || primitives.gray?.[200] || '#e2e8f0',
          strong: semantic.border?.strong || primitives.gray?.[400] || '#94a3b8',
          focus: semantic.border?.focus || primitives.blue?.[500] || '#3b82f6',
          disabled: semantic.border?.disabled || primitives.gray?.[200] || '#e2e8f0',
        },

        // Glass/overlay colors
        overlay: {
          light: semantic.overlay?.light || 'rgba(255, 255, 255, 0.5)',
          medium: semantic.overlay?.medium || 'rgba(0, 0, 0, 0.3)',
          dark: semantic.overlay?.dark || 'rgba(0, 0, 0, 0.5)',
          heavy: semantic.overlay?.heavy || 'rgba(0, 0, 0, 0.7)',
        },
      },

      // Spacing from @groxigo/tokens
      spacing: createSpacing(spacing),

      // Font family from @groxigo/tokens
      fontFamily: {
        sans: [
          typography.fontFamily?.sansWeb || "'Kanit', sans-serif",
          'system-ui',
          'sans-serif',
        ],
        mono: [
          typography.fontFamily?.mono ||
            "'JetBrains Mono', ui-monospace, monospace",
          'monospace',
        ],
      },

      // Font sizes from @groxigo/tokens
      fontSize: createFontSizes(typography.fontSize, typography.lineHeight),

      // Font weights from @groxigo/tokens
      fontWeight: typography.fontWeight || {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },

      // Line heights from @groxigo/tokens
      lineHeight: typography.lineHeight || {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.625,
      },

      // Letter spacing from @groxigo/tokens
      letterSpacing: {
        tight: `${typography.letterSpacing?.tight || -0.025}em`,
        normal: `${typography.letterSpacing?.normal || 0}em`,
        wide: `${typography.letterSpacing?.wide || 0.025}em`,
      },

      // Border radius from @groxigo/tokens
      borderRadius: {
        none: '0',
        sm: pxToString(radius.sm || 6),
        DEFAULT: pxToString(radius.md || 8),
        md: pxToString(radius.md || 8),
        lg: pxToString(radius.lg || 10),
        xl: pxToString(radius.xl || 14),
        '2xl': '24px',
        full: '9999px',
      },

      // Shadows from @groxigo/tokens
      boxShadow: {
        none: 'none',
        xs: shadows.xs || '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        sm:
          shadows.sm ||
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        DEFAULT:
          shadows.md ||
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        md:
          shadows.md ||
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg:
          shadows.lg ||
          '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl:
          shadows.xl ||
          '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': shadows['2xl'] || '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        card: shadows.card || '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        // Glass shadows
        'glass-sm': shadows.glass?.sm || '0 2px 8px rgba(0, 0, 0, 0.08)',
        'glass-md': shadows.glass?.md || '0 4px 16px rgba(0, 0, 0, 0.12)',
        'glass-lg': shadows.glass?.lg || '0 8px 24px rgba(0, 0, 0, 0.16)',
      },

      // Animation from @groxigo/tokens
      transitionDuration: {
        instant: `${animation.duration?.instant || 75}ms`,
        fast: `${animation.duration?.fast || 150}ms`,
        normal: `${animation.duration?.normal || 200}ms`,
        moderate: `${animation.duration?.moderate || 300}ms`,
        slow: `${animation.duration?.slow || 400}ms`,
        slower: `${animation.duration?.slower || 500}ms`,
        deliberate: `${animation.duration?.deliberate || 700}ms`,
      },

      transitionTimingFunction: {
        standard: animation.easing?.standard || 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        emphasized: animation.easing?.emphasized || 'cubic-bezier(0.2, 0.0, 0, 1)',
        decelerate: animation.easing?.decelerate || 'cubic-bezier(0.0, 0.0, 0.2, 1)',
        accelerate: animation.easing?.accelerate || 'cubic-bezier(0.4, 0.0, 1, 1)',
        bounce: animation.easing?.bounce || 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        elastic: animation.easing?.elastic || 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
        'ios-spring': animation.easing?.iosSpring || 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },

      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        skeleton: 'skeleton 1.5s ease-in-out infinite',
        'fade-in': `fadeIn ${animation.duration?.normal || 200}ms ${animation.easing?.standard || 'ease-out'}`,
        'slide-up': `slideInUp ${animation.duration?.moderate || 300}ms ${animation.easing?.decelerate || 'ease-out'}`,
        'slide-down': `slideInDown ${animation.duration?.moderate || 300}ms ${animation.easing?.decelerate || 'ease-out'}`,
        'scale-in': `scaleIn ${animation.duration?.normal || 200}ms ${animation.easing?.bounce || 'ease-out'}`,
      },

      keyframes: {
        skeleton: {
          '0%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
          '100%': { opacity: '0.4' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        slideInUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        slideInDown: {
          from: { transform: 'translateY(-20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

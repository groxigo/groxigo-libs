/**
 * JSON Generator
 *
 * Generates JSON format compatible with Figma Tokens Studio
 * from token source files. Uses the generic three-tier architecture.
 */

import { tokens } from '../tokens';

/**
 * Generate Figma-compatible JSON structure
 */
export function generateJSON(): string {
  const figmaStructure = {
    collections: {
      'Primitives': {
        description: 'Foundation colors - raw color values. Reference these in Semantic tokens.',
        modes: ['Light'],
        variables: {} as Record<string, Record<string, string>>,
      },
      'Semantic': {
        description: 'Meaningful names mapped from Primitives. Use these for theming.',
        modes: ['Light', 'Dark'],
        variables: {
          Surface: {} as Record<string, string>,
          Text: {} as Record<string, string>,
          Border: {} as Record<string, string>,
          Brand: {
            Primary: {} as Record<string, string>,
            Secondary: {} as Record<string, string>,
            Accent: {} as Record<string, string>,
          },
          Status: {
            Success: {} as Record<string, string>,
            Warning: {} as Record<string, string>,
            Error: {} as Record<string, string>,
            Info: {} as Record<string, string>,
          },
          Interactive: {} as Record<string, string>,
          Overlay: {} as Record<string, string>,
          Glass: {
            Surface: {} as Record<string, string>,
            Border: {} as Record<string, string>,
          },
        },
      },
      'Components': {
        description: 'Component-specific tokens for UI elements.',
        modes: ['Light', 'Dark'],
        variables: {
          Button: {
            Primary: {} as Record<string, string>,
            Secondary: {} as Record<string, string>,
            Outline: {} as Record<string, string>,
            Ghost: {} as Record<string, string>,
            Danger: {} as Record<string, string>,
          },
          Input: {} as Record<string, string>,
          Card: {} as Record<string, string>,
          Badge: {
            Default: {} as Record<string, string>,
            Primary: {} as Record<string, string>,
            Secondary: {} as Record<string, string>,
            Success: {} as Record<string, string>,
            Warning: {} as Record<string, string>,
            Error: {} as Record<string, string>,
            Info: {} as Record<string, string>,
          },
          Modal: {} as Record<string, string>,
          Nav: {} as Record<string, string>,
          Tab: {} as Record<string, string>,
          Toggle: {} as Record<string, string>,
          Progress: {} as Record<string, string>,
          Alert: {
            Success: {} as Record<string, string>,
            Warning: {} as Record<string, string>,
            Error: {} as Record<string, string>,
            Info: {} as Record<string, string>,
          },
          Glass: {
            Card: {} as Record<string, string>,
            Button: {} as Record<string, string>,
            Nav: {} as Record<string, string>,
          },
        },
      },
    },
  };

  // Populate Primitives
  const primitives = figmaStructure.collections['Primitives'].variables;

  // Add absolute colors
  primitives['Absolute'] = {
    White: tokens.colors.primitives.white,
    Black: tokens.colors.primitives.black,
    Transparent: tokens.colors.primitives.transparent,
  };

  // Add color families
  const colorFamilies = ['gray', 'blue', 'green', 'red', 'yellow', 'orange', 'purple', 'cyan', 'pink', 'indigo', 'teal'] as const;

  for (const family of colorFamilies) {
    const shades = tokens.colors.primitives[family];
    if (!shades) continue;

    const colorKey = family.charAt(0).toUpperCase() + family.slice(1);
    primitives[colorKey] = {};

    for (const [shade, value] of Object.entries(shades)) {
      primitives[colorKey][shade] = value;
    }
  }

  // Populate Semantic tokens
  const semantic = figmaStructure.collections['Semantic'].variables;

  // Surface
  semantic.Surface = {
    Primary: '→ Primitives/Absolute/White',
    Secondary: '→ Primitives/Gray/50',
    Tertiary: '→ Primitives/Gray/100',
    Elevated: '→ Primitives/Absolute/White',
    Sunken: '→ Primitives/Gray/100',
    Disabled: '→ Primitives/Gray/100',
  };

  // Text
  semantic.Text = {
    Primary: '→ Primitives/Gray/900',
    Secondary: '→ Primitives/Gray/600',
    Tertiary: '→ Primitives/Gray/500',
    Disabled: '→ Primitives/Gray/400',
    Inverse: '→ Primitives/Absolute/White',
    Link: '→ Primitives/Blue/600',
    'Link Hover': '→ Primitives/Blue/700',
  };

  // Border
  semantic.Border = {
    Subtle: '→ Primitives/Gray/200',
    Default: '→ Primitives/Gray/300',
    Strong: '→ Primitives/Gray/400',
    Focus: '→ Primitives/Blue/500',
    Disabled: '→ Primitives/Gray/200',
  };

  // Brand
  semantic.Brand = {
    Primary: {
      Default: '→ Primitives/Blue/600',
      Hover: '→ Primitives/Blue/700',
      Active: '→ Primitives/Blue/800',
      Subtle: '→ Primitives/Blue/50',
      Muted: '→ Primitives/Blue/100',
    },
    Secondary: {
      Default: '→ Primitives/Purple/600',
      Hover: '→ Primitives/Purple/700',
      Active: '→ Primitives/Purple/800',
      Subtle: '→ Primitives/Purple/50',
      Muted: '→ Primitives/Purple/100',
    },
    Accent: {
      Default: '→ Primitives/Cyan/500',
      Hover: '→ Primitives/Cyan/600',
      Active: '→ Primitives/Cyan/700',
      Subtle: '→ Primitives/Cyan/50',
      Muted: '→ Primitives/Cyan/100',
    },
  };

  // Status
  semantic.Status = {
    Success: {
      Default: '→ Primitives/Green/600',
      Hover: '→ Primitives/Green/700',
      Subtle: '→ Primitives/Green/50',
      Muted: '→ Primitives/Green/100',
      Text: '→ Primitives/Green/700',
    },
    Warning: {
      Default: '→ Primitives/Yellow/500',
      Hover: '→ Primitives/Yellow/600',
      Subtle: '→ Primitives/Yellow/50',
      Muted: '→ Primitives/Yellow/100',
      Text: '→ Primitives/Yellow/700',
    },
    Error: {
      Default: '→ Primitives/Red/600',
      Hover: '→ Primitives/Red/700',
      Subtle: '→ Primitives/Red/50',
      Muted: '→ Primitives/Red/100',
      Text: '→ Primitives/Red/700',
    },
    Info: {
      Default: '→ Primitives/Blue/500',
      Hover: '→ Primitives/Blue/600',
      Subtle: '→ Primitives/Blue/50',
      Muted: '→ Primitives/Blue/100',
      Text: '→ Primitives/Blue/700',
    },
  };

  // Interactive
  semantic.Interactive = {
    Default: '→ Primitives/Gray/600',
    Hover: '→ Primitives/Gray/700',
    Active: '→ Primitives/Gray/800',
    Disabled: '→ Primitives/Gray/400',
    Focus: '→ Primitives/Blue/500',
  };

  // Overlay
  semantic.Overlay = {
    Light: tokens.colors.semantic.overlay.light,
    Medium: tokens.colors.semantic.overlay.medium,
    Dark: tokens.colors.semantic.overlay.dark,
    Heavy: tokens.colors.semantic.overlay.heavy,
  };

  // Glass
  semantic.Glass = {
    Surface: {
      Light: tokens.colors.semantic.glass.surface.light,
      Medium: tokens.colors.semantic.glass.surface.medium,
      Heavy: tokens.colors.semantic.glass.surface.heavy,
      Dark: tokens.colors.semantic.glass.surface.dark,
    },
    Border: {
      Light: tokens.colors.semantic.glass.border.light,
      Default: tokens.colors.semantic.glass.border.default,
      Subtle: tokens.colors.semantic.glass.border.subtle,
    },
  };

  // Populate Component tokens
  const components = figmaStructure.collections['Components'].variables;

  // Button
  components.Button = {
    Primary: {
      BG: '→ Semantic/Brand/Primary/Default',
      'BG Hover': '→ Semantic/Brand/Primary/Hover',
      'BG Active': '→ Semantic/Brand/Primary/Active',
      'BG Disabled': '→ Semantic/Surface/Disabled',
      Text: '→ Semantic/Text/Inverse',
      'Text Disabled': '→ Semantic/Text/Disabled',
    },
    Secondary: {
      BG: '→ Semantic/Surface/Secondary',
      'BG Hover': '→ Semantic/Surface/Tertiary',
      Text: '→ Semantic/Text/Primary',
      Border: '→ Semantic/Border/Default',
    },
    Outline: {
      BG: '→ Primitives/Absolute/Transparent',
      'BG Hover': '→ Semantic/Brand/Primary/Subtle',
      Text: '→ Semantic/Brand/Primary/Default',
      Border: '→ Semantic/Brand/Primary/Default',
    },
    Ghost: {
      BG: '→ Primitives/Absolute/Transparent',
      'BG Hover': '→ Semantic/Surface/Secondary',
      Text: '→ Semantic/Text/Primary',
    },
    Danger: {
      BG: '→ Semantic/Status/Error/Default',
      'BG Hover': '→ Semantic/Status/Error/Hover',
      Text: '→ Semantic/Text/Inverse',
    },
  };

  // Input
  components.Input = {
    BG: '→ Semantic/Surface/Primary',
    'BG Disabled': '→ Semantic/Surface/Disabled',
    Text: '→ Semantic/Text/Primary',
    'Text Disabled': '→ Semantic/Text/Disabled',
    Placeholder: '→ Semantic/Text/Tertiary',
    Border: '→ Semantic/Border/Default',
    'Border Hover': '→ Semantic/Border/Strong',
    'Border Focus': '→ Semantic/Border/Focus',
    'Border Error': '→ Semantic/Status/Error/Default',
    'Border Disabled': '→ Semantic/Border/Disabled',
  };

  // Card
  components.Card = {
    BG: '→ Semantic/Surface/Primary',
    Border: '→ Semantic/Border/Subtle',
    'Border Hover': '→ Semantic/Border/Default',
  };

  // Badge
  components.Badge = {
    Default: {
      BG: '→ Semantic/Surface/Tertiary',
      Text: '→ Semantic/Text/Secondary',
    },
    Primary: {
      BG: '→ Semantic/Brand/Primary/Subtle',
      Text: '→ Semantic/Brand/Primary/Default',
    },
    Secondary: {
      BG: '→ Semantic/Brand/Secondary/Subtle',
      Text: '→ Semantic/Brand/Secondary/Default',
    },
    Success: {
      BG: '→ Semantic/Status/Success/Subtle',
      Text: '→ Semantic/Status/Success/Text',
    },
    Warning: {
      BG: '→ Semantic/Status/Warning/Subtle',
      Text: '→ Semantic/Status/Warning/Text',
    },
    Error: {
      BG: '→ Semantic/Status/Error/Subtle',
      Text: '→ Semantic/Status/Error/Text',
    },
    Info: {
      BG: '→ Semantic/Status/Info/Subtle',
      Text: '→ Semantic/Status/Info/Text',
    },
  };

  // Modal
  components.Modal = {
    BG: '→ Semantic/Surface/Primary',
    Border: '→ Semantic/Border/Subtle',
    Overlay: '→ Semantic/Overlay/Dark',
  };

  // Nav
  components.Nav = {
    BG: '→ Semantic/Surface/Primary',
    'BG Hover': '→ Semantic/Surface/Secondary',
    'BG Active': '→ Semantic/Brand/Primary/Subtle',
    Text: '→ Semantic/Text/Secondary',
    'Text Hover': '→ Semantic/Text/Primary',
    'Text Active': '→ Semantic/Brand/Primary/Default',
    Border: '→ Semantic/Border/Subtle',
  };

  // Tab
  components.Tab = {
    BG: '→ Primitives/Absolute/Transparent',
    'BG Hover': '→ Semantic/Surface/Secondary',
    'BG Active': '→ Semantic/Surface/Primary',
    Text: '→ Semantic/Text/Secondary',
    'Text Hover': '→ Semantic/Text/Primary',
    'Text Active': '→ Semantic/Brand/Primary/Default',
    Border: '→ Semantic/Border/Subtle',
    'Border Active': '→ Semantic/Brand/Primary/Default',
  };

  // Toggle
  components.Toggle = {
    'BG Off': '→ Semantic/Surface/Tertiary',
    'BG On': '→ Semantic/Brand/Primary/Default',
    'BG Disabled': '→ Semantic/Surface/Disabled',
    Thumb: '→ Primitives/Absolute/White',
  };

  // Progress
  components.Progress = {
    BG: '→ Semantic/Surface/Tertiary',
    Fill: '→ Semantic/Brand/Primary/Default',
    'Fill Success': '→ Semantic/Status/Success/Default',
    'Fill Warning': '→ Semantic/Status/Warning/Default',
    'Fill Error': '→ Semantic/Status/Error/Default',
  };

  // Alert
  components.Alert = {
    Success: {
      BG: '→ Semantic/Status/Success/Subtle',
      Border: '→ Semantic/Status/Success/Muted',
      Text: '→ Semantic/Status/Success/Text',
    },
    Warning: {
      BG: '→ Semantic/Status/Warning/Subtle',
      Border: '→ Semantic/Status/Warning/Muted',
      Text: '→ Semantic/Status/Warning/Text',
    },
    Error: {
      BG: '→ Semantic/Status/Error/Subtle',
      Border: '→ Semantic/Status/Error/Muted',
      Text: '→ Semantic/Status/Error/Text',
    },
    Info: {
      BG: '→ Semantic/Status/Info/Subtle',
      Border: '→ Semantic/Status/Info/Muted',
      Text: '→ Semantic/Status/Info/Text',
    },
  };

  // Glass components
  components.Glass = {
    Card: {
      BG: '→ Semantic/Glass/Surface/Light',
      Border: '→ Semantic/Glass/Border/Default',
    },
    Button: {
      BG: '→ Semantic/Glass/Surface/Light',
      'BG Hover': '→ Semantic/Glass/Surface/Medium',
      Border: '→ Semantic/Glass/Border/Light',
      Text: '→ Semantic/Text/Primary',
    },
    Nav: {
      BG: '→ Semantic/Glass/Surface/Light',
      Border: '→ Semantic/Glass/Border/Subtle',
    },
  };

  return JSON.stringify(figmaStructure, null, 2);
}

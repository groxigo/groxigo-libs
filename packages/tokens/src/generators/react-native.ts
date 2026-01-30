/**
 * React Native Generator
 *
 * Generates JavaScript objects compatible with React Native StyleSheet
 * from token source files.
 */

import { tokens } from '../tokens';

/**
 * Generate React Native tokens as a JavaScript object
 */
export function generateReactNative(): string {
  const tokensObject = {
    colors: {
      // Tier 1: Primitives
      primitives: tokens.colors.primitives,

      // Tier 2: Semantic (Light)
      semantic: tokens.colors.semantic,

      // Tier 3: Components (Light)
      components: tokens.colors.components,

      // Dark mode
      dark: {
        semantic: tokens.colors.dark.semantic,
        components: tokens.colors.dark.components,
      },
    },
    spacing: tokens.spacing,
    typography: tokens.typography,
    shadows: tokens.shadows,
    radius: tokens.radius,
    opacity: tokens.opacity,
    blur: tokens.blur,
    breakpoints: tokens.breakpoints,
    animation: tokens.animation,
  };

  // Convert to formatted JavaScript/TypeScript export
  return `/**
 * Groxigo Design Tokens - React Native
 *
 * A generic, reusable design token system following three-tier architecture:
 * - Tier 1: Primitives (raw color values)
 * - Tier 2: Semantic (meaningful names)
 * - Tier 3: Components (UI element tokens)
 *
 * @example Basic usage
 * import { tokens } from '@groxigo/tokens';
 *
 * const styles = StyleSheet.create({
 *   button: {
 *     backgroundColor: tokens.colors.semantic.brand.primary.default,
 *     padding: tokens.spacing[4],
 *     borderRadius: tokens.radius.md,
 *   },
 * });
 *
 * @example Dark mode with React Native
 * import { tokens, getThemeColors } from '@groxigo/tokens';
 * import { useColorScheme } from 'react-native';
 *
 * function MyComponent() {
 *   const colorScheme = useColorScheme();
 *   const theme = getThemeColors(colorScheme === 'dark');
 *
 *   return (
 *     <View style={{ backgroundColor: theme.semantic.surface.primary }}>
 *       <Text style={{ color: theme.semantic.text.primary }}>Hello</Text>
 *     </View>
 *   );
 * }
 *
 * @example Component tokens
 * const buttonStyles = {
 *   backgroundColor: tokens.colors.components.button.primary.bg,
 *   color: tokens.colors.components.button.primary.text,
 * };
 */

export const tokens = ${JSON.stringify(tokensObject, null, 2)};

/**
 * Helper function to get theme-aware colors
 * @param {boolean} isDark - Whether dark mode is enabled
 * @returns The appropriate color tokens for the current theme
 *
 * @example
 * const theme = getThemeColors(isDarkMode);
 * // Access: theme.semantic.surface.primary
 * // Access: theme.components.button.primary.bg
 */
export function getThemeColors(isDark) {
  if (isDark) {
    return {
      primitives: tokens.colors.primitives,
      semantic: tokens.colors.dark.semantic,
      components: tokens.colors.dark.components,
    };
  }
  return {
    primitives: tokens.colors.primitives,
    semantic: tokens.colors.semantic,
    components: tokens.colors.components,
  };
}

/**
 * Helper function to create themed styles
 * @param {function} stylesFn - Function that receives theme colors and returns styles
 * @returns {function} A function that accepts isDark and returns themed styles
 *
 * @example
 * const createStyles = createThemedStyles((theme) => ({
 *   container: {
 *     backgroundColor: theme.semantic.surface.primary,
 *   },
 *   text: {
 *     color: theme.semantic.text.primary,
 *   },
 * }));
 *
 * // In component:
 * const styles = createStyles(isDarkMode);
 */
export function createThemedStyles(stylesFn) {
  return (isDark) => stylesFn(getThemeColors(isDark));
}

export default tokens;
`;
}

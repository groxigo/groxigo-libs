/**
 * Theme Provider
 *
 * Provides theme context to all child components.
 * Supports light/dark mode switching and custom themes.
 */

import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { ThemeContext } from './ThemeContext';
import { lightTheme, darkTheme, defaultTheme } from './defaultTheme';
import type { Theme, PartialTheme, ThemeContextValue, DeepPartial } from './types';

// ============================================
// DEEP MERGE UTILITY
// ============================================

function deepMerge<T extends object>(target: T, source: DeepPartial<T>): T {
  const result = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (
        sourceValue !== null &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue !== null &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        (result as any)[key] = deepMerge(targetValue as object, sourceValue as object);
      } else if (sourceValue !== undefined) {
        (result as any)[key] = sourceValue;
      }
    }
  }

  return result;
}

// ============================================
// THEME PROVIDER PROPS
// ============================================

export interface ThemeProviderProps {
  /**
   * Custom theme to use. Can be a full theme or partial override.
   */
  theme?: PartialTheme;

  /**
   * Custom light theme (used when colorScheme is 'light')
   */
  lightTheme?: PartialTheme;

  /**
   * Custom dark theme (used when colorScheme is 'dark')
   */
  darkTheme?: PartialTheme;

  /**
   * Initial color scheme. Defaults to system preference.
   */
  initialColorScheme?: 'light' | 'dark' | 'system';

  /**
   * Whether to follow system color scheme changes.
   * @default true
   */
  followSystem?: boolean;

  /**
   * Children to render
   */
  children: React.ReactNode;
}

// ============================================
// THEME PROVIDER COMPONENT
// ============================================

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme: customTheme,
  lightTheme: customLightTheme,
  darkTheme: customDarkTheme,
  initialColorScheme = 'system',
  followSystem = true,
  children,
}) => {
  // Get system color scheme
  const rawSystemScheme = useRNColorScheme();
  const systemColorScheme: 'light' | 'dark' = rawSystemScheme === 'dark' ? 'dark' : 'light';

  // Determine initial scheme
  const getInitialScheme = (): 'light' | 'dark' => {
    if (initialColorScheme === 'system') {
      return systemColorScheme;
    }
    return initialColorScheme;
  };

  // Color scheme state
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(getInitialScheme);

  // Follow system changes if enabled
  useEffect(() => {
    if (followSystem && initialColorScheme === 'system') {
      setColorScheme(systemColorScheme);
    }
  }, [systemColorScheme, followSystem, initialColorScheme]);

  // Toggle color scheme
  const toggleColorScheme = useCallback(() => {
    setColorScheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Build the final theme
  const theme = useMemo<Theme>(() => {
    // Start with base theme based on color scheme
    const baseTheme = colorScheme === 'dark' ? darkTheme : lightTheme;

    // Apply color-scheme specific custom theme
    const schemeCustomTheme =
      colorScheme === 'dark' ? customDarkTheme : customLightTheme;

    // Merge: base -> scheme custom -> general custom
    let mergedTheme = baseTheme;

    if (schemeCustomTheme) {
      mergedTheme = deepMerge(mergedTheme, schemeCustomTheme);
    }

    if (customTheme) {
      mergedTheme = deepMerge(mergedTheme, customTheme);
    }

    // Ensure mode is correct
    mergedTheme = {
      ...mergedTheme,
      mode: colorScheme,
    };

    return mergedTheme;
  }, [colorScheme, customTheme, customLightTheme, customDarkTheme]);

  // Context value
  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      theme,
      colorScheme,
      setColorScheme,
      toggleColorScheme,
    }),
    [theme, colorScheme, toggleColorScheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

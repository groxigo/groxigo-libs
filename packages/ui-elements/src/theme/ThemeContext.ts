/**
 * Theme Context
 *
 * React Context for theme distribution throughout the component tree.
 */

import { createContext } from 'react';
import type { ThemeContextValue } from './types';
import { defaultTheme } from './defaultTheme';

export const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
  colorScheme: 'light',
  setColorScheme: () => {},
  toggleColorScheme: () => {},
});

ThemeContext.displayName = 'ThemeContext';

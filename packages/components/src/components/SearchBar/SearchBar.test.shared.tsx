/**
 * Shared test utilities and common test cases for SearchBar
 * These tests can be reused for both mobile and web implementations
 */

import type { SearchBarProps } from './SearchBar.types';

export const defaultProps: Partial<SearchBarProps> = {
  placeholderSuggestions: ['atta', 'tomato', 'onion'],
};

export const mockResults = [
  { id: '1', title: 'Product 1', type: 'product' as const },
  { id: '2', title: 'Product 2', type: 'product' as const },
  { id: '3', title: 'Recipe 1', type: 'recipe' as const },
];

/**
 * Common test cases that should work for both platforms
 * These can be imported and used in platform-specific test files
 */
export const commonTestCases = {
  // Test descriptions and expectations that are platform-agnostic
  placeholderRotation: {
    description: 'rotates placeholder suggestions',
    suggestions: ['atta', 'tomato', 'onion'],
  },
  debouncing: {
    description: 'debounces search callback',
    debounceMs: 300,
  },
  minSearchLength: {
    description: 'only triggers search after minimum character length',
    minLength: 3,
  },
};


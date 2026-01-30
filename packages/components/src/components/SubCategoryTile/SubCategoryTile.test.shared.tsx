/**
 * Shared test utilities and constants for SubCategoryTile tests
 */

import { vi } from 'vitest';
import type { SubCategoryTileProps } from './SubCategoryTile.types';

export const defaultProps: SubCategoryTileProps = {
  title: 'Test SubCategory',
  icon: 'home',
};

export const propsWithImage: SubCategoryTileProps = {
  title: 'Test SubCategory with Image',
  image: { uri: 'https://example.com/image.jpg' },
};

export const propsWithOnPress: SubCategoryTileProps = {
  ...defaultProps,
  onPress: vi.fn(),
};

export const propsWithAllSizes: SubCategoryTileProps[] = [
  { ...defaultProps, size: 'sm' },
  { ...defaultProps, size: 'md' },
  { ...defaultProps, size: 'lg' },
];

export const propsDisabled: SubCategoryTileProps = {
  ...defaultProps,
  disabled: true,
};





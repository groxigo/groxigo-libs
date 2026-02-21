import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useColorScheme, useSDUIColors } from '../useColorScheme';
import type { ThemeColors } from '../useColorScheme';

const mockTheme: ThemeColors = {
  primary: '#4CAF50',
  secondary: '#FF9800',
  accent: '#9C27B0',
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: '#212121',
  textSecondary: '#757575',
  error: '#F44336',
  warning: '#FF9800',
  success: '#4CAF50',
  info: '#2196F3',
  border: '#E0E0E0',
};

describe('useColorScheme', () => {
  it('returns default scheme when no colorScheme specified', () => {
    const { result } = renderHook(() =>
      useColorScheme({ theme: mockTheme })
    );

    expect(result.current.background).toBe(mockTheme.surface);
    expect(result.current.text).toBe(mockTheme.text);
    expect(result.current.textSecondary).toBe(mockTheme.textSecondary);
    expect(result.current.accent).toBe(mockTheme.primary);
    expect(result.current.border).toBe(mockTheme.border);
    expect(result.current.icon).toBe(mockTheme.textSecondary);
    expect(result.current.badgeBackground).toBe(mockTheme.primary);
    expect(result.current.badgeText).toBe('#FFFFFF');
    expect(result.current.buttonBackground).toBe(mockTheme.primary);
    expect(result.current.buttonText).toBe('#FFFFFF');
  });

  it('returns all 10 color properties', () => {
    const { result } = renderHook(() =>
      useColorScheme({ theme: mockTheme })
    );

    const keys = Object.keys(result.current);
    expect(keys).toHaveLength(10);
    expect(keys).toContain('background');
    expect(keys).toContain('text');
    expect(keys).toContain('textSecondary');
    expect(keys).toContain('accent');
    expect(keys).toContain('border');
    expect(keys).toContain('icon');
    expect(keys).toContain('badgeBackground');
    expect(keys).toContain('badgeText');
    expect(keys).toContain('buttonBackground');
    expect(keys).toContain('buttonText');
  });

  describe('preset overrides', () => {
    it('primary scheme uses inverted colors', () => {
      const { result } = renderHook(() =>
        useColorScheme({ theme: mockTheme, colorScheme: 'primary' })
      );

      expect(result.current.background).toBe(mockTheme.primary);
      expect(result.current.text).toBe('#FFFFFF');
      expect(result.current.buttonBackground).toBe('#FFFFFF');
      expect(result.current.buttonText).toBe(mockTheme.primary);
    });

    it('sale scheme uses red accent', () => {
      const { result } = renderHook(() =>
        useColorScheme({ theme: mockTheme, colorScheme: 'sale' })
      );

      expect(result.current.background).toBe('#FFF0F0');
      expect(result.current.accent).toBe('#E53935');
      expect(result.current.badgeBackground).toBe('#E53935');
    });

    it('highlight scheme uses warm colors', () => {
      const { result } = renderHook(() =>
        useColorScheme({ theme: mockTheme, colorScheme: 'highlight' })
      );

      expect(result.current.background).toBe('#FFF8E7');
      expect(result.current.accent).toBe('#FF9500');
    });

    it('muted scheme uses subdued colors', () => {
      const { result } = renderHook(() =>
        useColorScheme({ theme: mockTheme, colorScheme: 'muted' })
      );

      expect(result.current.background).toBe('#F5F5F5');
      expect(result.current.text).toBe(mockTheme.textSecondary);
    });

    it('error scheme uses error theme color', () => {
      const { result } = renderHook(() =>
        useColorScheme({ theme: mockTheme, colorScheme: 'error' })
      );

      expect(result.current.accent).toBe(mockTheme.error);
      expect(result.current.badgeBackground).toBe(mockTheme.error);
    });

    it('success scheme uses success theme color', () => {
      const { result } = renderHook(() =>
        useColorScheme({ theme: mockTheme, colorScheme: 'success' })
      );

      expect(result.current.accent).toBe(mockTheme.success);
    });
  });

  describe('custom colors override presets', () => {
    it('custom colors override preset values', () => {
      const { result } = renderHook(() =>
        useColorScheme({
          theme: mockTheme,
          colorScheme: 'sale',
          customColors: {
            background: '#FF0000',
            text: '#000000',
          },
        })
      );

      expect(result.current.background).toBe('#FF0000');
      expect(result.current.text).toBe('#000000');
      // Non-overridden props still come from preset
      expect(result.current.accent).toBe('#E53935');
    });

    it('custom scheme with customColors only uses custom + default', () => {
      const { result } = renderHook(() =>
        useColorScheme({
          theme: mockTheme,
          colorScheme: 'custom',
          customColors: {
            background: '#123456',
          },
        })
      );

      expect(result.current.background).toBe('#123456');
      // Falls back to default for non-specified
      expect(result.current.text).toBe(mockTheme.text);
    });
  });

  describe('merge priority: default < preset < custom', () => {
    it('preset overrides default, custom overrides both', () => {
      const { result } = renderHook(() =>
        useColorScheme({
          theme: mockTheme,
          colorScheme: 'primary',
          customColors: { background: '#CUSTOM' },
        })
      );

      // Custom overrides primary preset
      expect(result.current.background).toBe('#CUSTOM');
      // Primary preset overrides default
      expect(result.current.text).toBe('#FFFFFF');
    });
  });
});

describe('useSDUIColors', () => {
  it('delegates to useColorScheme with color props', () => {
    const { result } = renderHook(() =>
      useSDUIColors(mockTheme, {
        colorScheme: 'sale',
        customColors: { accent: '#FF0000' },
      })
    );

    expect(result.current.accent).toBe('#FF0000');
    expect(result.current.background).toBe('#FFF0F0');
  });

  it('returns default scheme when colorProps is undefined', () => {
    const { result } = renderHook(() => useSDUIColors(mockTheme));

    expect(result.current.background).toBe(mockTheme.surface);
    expect(result.current.text).toBe(mockTheme.text);
  });
});

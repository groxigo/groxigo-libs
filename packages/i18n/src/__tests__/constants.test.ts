import { describe, it, expect } from 'vitest';
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  RTL_LOCALES,
  LOCALE_META,
  isValidLocale,
  isRtlLocale,
} from '../constants';
import type { Locale } from '../types';

describe('constants', () => {
  it('DEFAULT_LOCALE is in SUPPORTED_LOCALES', () => {
    expect(SUPPORTED_LOCALES).toContain(DEFAULT_LOCALE);
  });

  it('RTL_LOCALES is a subset of SUPPORTED_LOCALES', () => {
    for (const rtl of RTL_LOCALES) {
      expect(SUPPORTED_LOCALES).toContain(rtl);
    }
  });

  it('LOCALE_META has an entry for every supported locale', () => {
    for (const locale of SUPPORTED_LOCALES) {
      expect(LOCALE_META[locale]).toBeDefined();
      expect(LOCALE_META[locale].code).toBe(locale);
      expect(LOCALE_META[locale].name).toBeTruthy();
      expect(LOCALE_META[locale].nativeName).toBeTruthy();
      expect(['ltr', 'rtl']).toContain(LOCALE_META[locale].direction);
    }
  });

  it('LOCALE_META direction matches RTL_LOCALES', () => {
    for (const locale of SUPPORTED_LOCALES) {
      const meta = LOCALE_META[locale];
      if (RTL_LOCALES.includes(locale)) {
        expect(meta.direction).toBe('rtl');
      } else {
        expect(meta.direction).toBe('ltr');
      }
    }
  });
});

describe('isValidLocale', () => {
  it('returns true for supported locales', () => {
    expect(isValidLocale('en')).toBe(true);
    expect(isValidLocale('hi')).toBe(true);
    expect(isValidLocale('ar')).toBe(true);
    expect(isValidLocale('ur')).toBe(true);
  });

  it('returns false for unsupported locales', () => {
    expect(isValidLocale('fr')).toBe(false);
    expect(isValidLocale('de')).toBe(false);
    expect(isValidLocale('')).toBe(false);
  });
});

describe('isRtlLocale', () => {
  it('returns true for RTL locales', () => {
    expect(isRtlLocale('ar')).toBe(true);
    expect(isRtlLocale('ur')).toBe(true);
  });

  it('returns false for LTR locales', () => {
    expect(isRtlLocale('en' as Locale)).toBe(false);
    expect(isRtlLocale('hi' as Locale)).toBe(false);
  });
});

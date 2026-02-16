import type { Locale, LocaleMeta } from './types';

export const SUPPORTED_LOCALES: readonly Locale[] = ['en', 'hi', 'ar', 'ur'] as const;

export const DEFAULT_LOCALE: Locale = 'en';

export const RTL_LOCALES: readonly Locale[] = ['ar', 'ur'] as const;

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr' },
  hi: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', direction: 'ltr' },
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl' },
  ur: { code: 'ur', name: 'Urdu', nativeName: 'اردو', direction: 'rtl' },
};

export function isValidLocale(code: string): code is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(code);
}

export function isRtlLocale(locale: Locale): boolean {
  return (RTL_LOCALES as readonly string[]).includes(locale);
}

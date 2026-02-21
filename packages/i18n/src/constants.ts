import type { Locale, LocaleMeta } from './types';

export const SUPPORTED_LOCALES: readonly Locale[] = [
  'en',
  'hi',
  'ar',
  'ur',
  'te', // stub — English translations (awaiting Telugu translation)
  'ta', // stub — English translations (awaiting Tamil translation)
  'kn', // stub — English translations (awaiting Kannada translation)
  'ml', // stub — English translations (awaiting Malayalam translation)
  'gu', // stub — English translations (awaiting Gujarati translation)
] as const;

export const DEFAULT_LOCALE: Locale = 'en';

export const RTL_LOCALES: readonly Locale[] = ['ar', 'ur'] as const;

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr' },
  hi: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', direction: 'ltr' },
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl' },
  ur: { code: 'ur', name: 'Urdu', nativeName: 'اردو', direction: 'rtl' },
  te: { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', direction: 'ltr' },
  ta: { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', direction: 'ltr' },
  kn: { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', direction: 'ltr' },
  ml: { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', direction: 'ltr' },
  gu: { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', direction: 'ltr' },
};

export function isValidLocale(code: string): code is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(code);
}

export function isRtlLocale(locale: Locale): boolean {
  return (RTL_LOCALES as readonly string[]).includes(locale);
}

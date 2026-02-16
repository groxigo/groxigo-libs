export type Locale = 'en' | 'hi' | 'ar' | 'ur';

export type Direction = 'ltr' | 'rtl';

export interface LocaleMeta {
  code: Locale;
  name: string;
  nativeName: string;
  direction: Direction;
}

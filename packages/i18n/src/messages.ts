import type { Locale } from './types';
import en from './messages/en.json';
import hi from './messages/hi.json';
import ar from './messages/ar.json';
import ur from './messages/ur.json';

export type Messages = typeof en;

export const allMessages: Record<Locale, Messages> = { en, hi, ar, ur };

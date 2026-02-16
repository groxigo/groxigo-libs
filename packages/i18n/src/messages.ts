import type { Locale } from './types';
import en from './messages/en.json';
import hi from './messages/hi.json';
import ar from './messages/ar.json';
import ur from './messages/ur.json';
import te from './messages/te.json';
import ta from './messages/ta.json';
import kn from './messages/kn.json';
import ml from './messages/ml.json';
import gu from './messages/gu.json';

export type Messages = typeof en;

export const allMessages: Record<Locale, Messages> = { en, hi, ar, ur, te, ta, kn, ml, gu };

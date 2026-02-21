import { describe, it, expect } from 'vitest';
import en from '../messages/en.json';
import hi from '../messages/hi.json';
import ar from '../messages/ar.json';
import ur from '../messages/ur.json';
import te from '../messages/te.json';
import ta from '../messages/ta.json';
import kn from '../messages/kn.json';
import ml from '../messages/ml.json';
import gu from '../messages/gu.json';

function getKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...getKeys(value as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys.sort();
}

function getValues(obj: Record<string, unknown>, prefix = ''): Array<{ key: string; value: unknown }> {
  const entries: Array<{ key: string; value: unknown }> = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      entries.push(...getValues(value as Record<string, unknown>, fullKey));
    } else {
      entries.push({ key: fullKey, value });
    }
  }
  return entries;
}

const locales = { en, hi, ar, ur, te, ta, kn, ml, gu };
const enKeys = getKeys(en);

describe('message files', () => {
  it('en.json has keys', () => {
    expect(enKeys.length).toBeGreaterThan(0);
  });

  for (const [locale, messages] of Object.entries(locales)) {
    if (locale === 'en') continue;

    describe(`${locale}.json`, () => {
      it('has the same key structure as en.json', () => {
        const localeKeys = getKeys(messages as Record<string, unknown>);
        expect(localeKeys).toEqual(enKeys);
      });

      it('has no empty string values', () => {
        const values = getValues(messages as Record<string, unknown>);
        const emptyKeys = values
          .filter(({ value }) => typeof value === 'string' && value.trim() === '')
          .map(({ key }) => key);
        expect(emptyKeys).toEqual([]);
      });
    });
  }

  it('en.json has no empty string values', () => {
    const values = getValues(en);
    const emptyKeys = values
      .filter(({ value }) => typeof value === 'string' && value.trim() === '')
      .map(({ key }) => key);
    expect(emptyKeys).toEqual([]);
  });
});

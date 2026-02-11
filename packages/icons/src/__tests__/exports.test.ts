import { describe, it, expect } from 'vitest';
import { LineIcons, SolidIcons } from '../index';

describe('Package exports', () => {
  describe('LineIcons namespace', () => {
    it('exports Abacus icon', () => {
      expect(LineIcons.Abacus).toBeDefined();
    });

    it('exports Search icon', () => {
      expect(LineIcons.Search).toBeDefined();
    });

    it('exports Heart icon', () => {
      expect(LineIcons.Heart).toBeDefined();
    });

    it('exports Star icon', () => {
      expect(LineIcons.Star).toBeDefined();
    });

    it('exports Times icon', () => {
      expect(LineIcons.Times).toBeDefined();
    });

    it('exports Plus icon', () => {
      expect(LineIcons.Plus).toBeDefined();
    });

    it('all exports are functions (IconComponent)', () => {
      const icons = Object.values(LineIcons);
      for (const icon of icons) {
        expect(typeof icon).toBe('function');
      }
    });

    it('each icon has a displayName', () => {
      const icons = Object.entries(LineIcons);
      for (const [exportName, icon] of icons) {
        const fn = icon as { displayName?: string };
        expect(fn.displayName).toBeTruthy();
      }
    });

    it('has at least 1200 icons', () => {
      const count = Object.keys(LineIcons).length;
      expect(count).toBeGreaterThanOrEqual(1200);
    });
  });

  describe('SolidIcons namespace', () => {
    it('exports Star icon', () => {
      expect(SolidIcons.Star).toBeDefined();
    });

    it('exports Analysis icon', () => {
      expect(SolidIcons.Analysis).toBeDefined();
    });

    it('exports AngleDown icon', () => {
      expect(SolidIcons.AngleDown).toBeDefined();
    });

    it('all exports are functions (IconComponent)', () => {
      const icons = Object.values(SolidIcons);
      for (const icon of icons) {
        expect(typeof icon).toBe('function');
      }
    });

    it('each icon has a displayName', () => {
      const icons = Object.entries(SolidIcons);
      for (const [exportName, icon] of icons) {
        const fn = icon as { displayName?: string };
        expect(fn.displayName).toBeTruthy();
      }
    });

    it('has at least 180 icons', () => {
      const count = Object.keys(SolidIcons).length;
      expect(count).toBeGreaterThanOrEqual(180);
    });
  });
});

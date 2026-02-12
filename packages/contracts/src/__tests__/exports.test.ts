/**
 * Export validation tests for @groxigo/contracts
 *
 * Since contracts is a type-only package (all exports are `export type`),
 * we validate by checking the generated .d.ts files contain expected types.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const DIST = resolve(__dirname, '../../dist');

function readDecl(subpath: string): string {
  const path = resolve(DIST, subpath);
  if (!existsSync(path)) return '';
  return readFileSync(path, 'utf-8');
}

describe('dist declarations exist', () => {
  const files = [
    'index.d.ts',
    'elements/index.d.ts',
    'components/index.d.ts',
    'animation/index.d.ts',
  ];

  it.each(files)('%s exists', (file) => {
    expect(existsSync(resolve(DIST, file))).toBe(true);
  });
});

describe('declarationMap is enabled', () => {
  it('generates .d.ts.map files', () => {
    expect(existsSync(resolve(DIST, 'index.d.ts.map'))).toBe(true);
  });
});

describe('element contracts', () => {
  const dts = readDecl('elements/index.d.ts');

  const requiredElements = [
    'TextPropsBase',
    'ButtonPropsBase',
    'BadgePropsBase',
    'InputPropsBase',
    'CardPropsBase',
    'ImagePropsBase',
    'SpinnerPropsBase',
    'SkeletonPropsBase',
    'AvatarPropsBase',
    'CheckboxPropsBase',
    'RadioPropsBase',
    'SwitchPropsBase',
    'SelectPropsBase',
    'DividerPropsBase',
    'ProgressPropsBase',
    'ModalPropsBase',
    'DrawerPropsBase',
    'TabsPropsBase',
    'ToastPropsBase',
    'TooltipPropsBase',
    'MenuPropsBase',
    'MenuItemPropsBase',
    'TextAreaPropsBase',
    'LinkPropsBase',
    'BreadcrumbPropsBase',
    'BreadcrumbItemPropsBase',
    'SpacerPropsBase',
  ];

  it.each(requiredElements)('exports %s', (name) => {
    expect(dts).toContain(name);
  });
});

describe('component contracts', () => {
  const dts = readDecl('components/index.d.ts');

  const requiredComponents = [
    'ProductCardPropsBase',
    'SearchBarPropsBase',
    'CategoryCardPropsBase',
    'RecipeCardPropsBase',
    'CartItemPropsBase',
    'QuantitySelectorPropsBase',
    'PriceDisplayPropsBase',
    'RatingPropsBase',
    'FilterBarPropsBase',
    'HeaderPropsBase',
    'FooterPropsBase',
    'SectionHeaderPropsBase',
    'ProductTilePropsBase',
    'OrderCardPropsBase',
    'AuthCardPropsBase',
    // New contracts
    'CarouselPropsBase',
    'GridPropsBase',
    'StickyBottomBarPropsBase',
    'FloatingCartButtonPropsBase',
    'ProductImageCarouselPropsBase',
    'VariantSelectorPropsBase',
  ];

  it.each(requiredComponents)('exports %s', (name) => {
    expect(dts).toContain(name);
  });
});

describe('naming conventions', () => {
  const allDts = readDecl('index.d.ts')
    + readDecl('elements/index.d.ts')
    + readDecl('components/index.d.ts');

  it('uses onPress not onClick in contracts', () => {
    // Check individual contract d.ts files for onClick (should be onPress)
    const breadcrumb = readDecl('elements/breadcrumb.d.ts');
    const menu = readDecl('elements/menu.d.ts');
    const toast = readDecl('elements/toast.d.ts');

    expect(breadcrumb).not.toContain('onClick');
    expect(menu).not.toContain('onClick');
    expect(toast).not.toContain('onClick');

    if (breadcrumb) expect(breadcrumb).toContain('onPress');
    if (menu) expect(menu).toContain('onPress');
    if (toast) expect(toast).toContain('onPress');
  });

  it('all exported Props types end with PropsBase', () => {
    // Extract all exported type names that contain "Props"
    const propsMatches = allDts.match(/export\s+(?:type\s+)?{\s*[\w\s,]*?([\w]*Props[\w]*)/g) || [];
    const propsNames = propsMatches
      .map((m) => {
        const match = m.match(/([\w]*Props[\w]*)/);
        return match ? match[1] : null;
      })
      .filter(Boolean) as string[];

    for (const name of propsNames) {
      expect(name).toMatch(/PropsBase$/);
    }
  });
});

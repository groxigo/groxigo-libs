/**
 * Registry Builder
 *
 * Creates a type-safe component registry for SDUI.
 */

import type { ComponentType } from 'react';
import type { ComponentRegistry, RegisteredComponent, RegistryBuilder } from '../types/registry';

/**
 * Create a new registry builder
 */
export function createRegistry(): RegistryBuilder {
  const registry: ComponentRegistry = {};

  const builder: RegistryBuilder = {
    register<P>(
      type: string,
      component: ComponentType<P>,
      options?: Omit<RegisteredComponent<P>, 'component'>
    ): RegistryBuilder {
      registry[type] = {
        component,
        ...options,
      };
      return builder;
    },

    build(): ComponentRegistry {
      return { ...registry };
    },
  };

  return builder;
}

/**
 * Default action props that should be converted from actions
 */
export const DEFAULT_ACTION_PROPS = [
  'onPress',
  'onAddToCart',
  'onQuantityChange',
  'onToggleFavorite',
  'onRemove',
  'onAction',
  'onRetry',
  'onRefresh',
  'onSelect',
  'onChange',
  'onSubmit',
  'onCancel',
  'onClose',
  'onOpen',
];

/**
 * Create a registry with Groxigo components
 *
 * @example
 * ```ts
 * import { ProductCard, CartItem } from '@groxigo/components';
 *
 * const registry = createRegistry()
 *   .register('ProductCard', ProductCard, {
 *     actionProps: ['onPress', 'onAddToCart', 'onToggleFavorite'],
 *   })
 *   .register('CartItem', CartItem, {
 *     actionProps: ['onQuantityChange', 'onRemove'],
 *   })
 *   .build();
 * ```
 */

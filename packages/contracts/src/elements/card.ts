/**
 * Card Component Contract
 */

import type { ReactNode } from 'react';

export type CardVariant = 'elevated' | 'outline' | 'filled' | 'unstyled';
export type CardSize = 'sm' | 'md' | 'lg';

/**
 * Base Card props that all platforms must support
 *
 * @example
 * // Basic card with content
 * <Card>
 *   <CardBody>
 *     <Text>Card content here</Text>
 *   </CardBody>
 * </Card>
 *
 * @example
 * // Pressable card with header and footer
 * <Card variant="elevated" pressable onPress={handlePress}>
 *   <CardHeader>
 *     <Text variant="h4">Product Name</Text>
 *   </CardHeader>
 *   <CardBody>
 *     <Image src={productImage} alt="Product" />
 *   </CardBody>
 *   <CardFooter>
 *     <Text>$19.99</Text>
 *   </CardFooter>
 * </Card>
 *
 * @example
 * // Outlined card
 * <Card variant="outline" size="lg">
 *   <CardBody>Large outlined card</CardBody>
 * </Card>
 */
export interface CardPropsBase {
  /** Card variant @default 'elevated' */
  variant?: CardVariant;
  /** Card size (affects padding) @default 'md' */
  size?: CardSize;
  /** Whether card is pressable */
  pressable?: boolean;
  /** Press handler */
  onPress?: () => void;
  /** Card content */
  children?: ReactNode;
  /** Test ID */
  testID?: string;
}

export interface CardHeaderPropsBase {
  children?: ReactNode;
  /** Test ID for testing */
  testID?: string;
}

export interface CardBodyPropsBase {
  children?: ReactNode;
  /** Test ID for testing */
  testID?: string;
}

export interface CardFooterPropsBase {
  children?: ReactNode;
  /** Test ID for testing */
  testID?: string;
}

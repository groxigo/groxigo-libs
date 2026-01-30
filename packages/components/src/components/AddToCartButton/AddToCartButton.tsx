import { Button, Badge, useTheme } from '@groxigo/ui-elements';
import type { AddToCartButtonProps } from './AddToCartButton.types';

/**
 * AddToCartButton component
 *
 * Specialized button for adding items to cart.
 * Uses theme colors via ui-elements for consistent styling.
 */
export const AddToCartButton = ({
  label = 'Add to Cart',
  inCart = false,
  quantity,
  onPress,
  variant = 'solid',
  size = 'md',
  ...props
}: AddToCartButtonProps) => {
  const theme = useTheme();
  const displayLabel = inCart ? (quantity && quantity > 1 ? `In Cart (${quantity})` : 'In Cart') : label;
  const displayVariant = inCart ? 'outline' : variant;

  return (
    <Button
      variant={displayVariant}
      size={size}
      onPress={onPress}
      {...props}
    >
      {displayLabel}
      {inCart && quantity && quantity > 0 && (
        <Badge colorScheme="primary" size="sm" style={{ marginLeft: theme.spacing[2] }}>
          {quantity}
        </Badge>
      )}
    </Button>
  );
};

export default AddToCartButton;

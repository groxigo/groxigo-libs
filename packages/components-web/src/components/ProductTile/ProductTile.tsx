'use client';

import { forwardRef, useCallback } from 'react';
import type { ProductTilePropsBase } from '@groxigo/contracts/components';
import { Badge } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './ProductTile.module.css';
import { PriceDisplay } from '../PriceDisplay';
import { Star, Heart } from '@groxigo/icons/line';

export interface ProductTileProps extends ProductTilePropsBase {
  /** Additional CSS class */
  className?: string;
}

const BADGE_COLOR_MAP: Record<string, 'primary' | 'success' | 'warning' | 'error'> = {
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

const SIZE_CLASS: Record<string, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

export const ProductTile = forwardRef<HTMLDivElement, ProductTileProps>(
  (
    {
      id,
      name,
      imageUrl,
      price,
      originalPrice,
      discountPercent,
      discountText,
      weight,
      brand,
      badge,
      badgeVariant = 'primary',
      rating,
      reviewCount,
      timerText,
      outOfStock = false,
      showAddButton = false,
      addButtonText,
      optionsText,
      quantity,
      onAddPress,
      onIncrement,
      onDecrement,
      showFavorite = false,
      isFavorite = false,
      onFavoritePress,
      size = 'md',
      width,
      onPress,
      testID,
      className,
    },
    ref
  ) => {
    const isCategory = price == null;
    const mode = isCategory ? 'category' : 'product';

    const handleClick = useCallback(() => {
      onPress?.();
    }, [onPress]);

    const handleAddClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onAddPress?.();
      },
      [onAddPress]
    );

    const handleFavoriteClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onFavoritePress?.();
      },
      [onFavoritePress]
    );

    const rootStyle = width != null ? { width: `${width}px` } : undefined;

    return (
      <div
        ref={ref}
        className={clsx(
          styles.root,
          mode === 'product' ? styles.rootProduct : styles.rootCategory,
          !width && SIZE_CLASS[size],
          className
        )}
        style={rootStyle}
        data-testid={testID}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={name}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        {/* ── Image section ── */}
        <div className={styles.imageSection}>
          {imageUrl ? (
            <img src={imageUrl} alt={name} className={styles.image} />
          ) : (
            <div className={styles.imagePlaceholder} />
          )}

          {badge && (
            <div className={styles.badge}>
              <Badge
                variant="subtle"
                colorScheme={BADGE_COLOR_MAP[badgeVariant] ?? 'primary'}
                size="xs"
                rounded
              >
                {badge}
              </Badge>
            </div>
          )}

          {showFavorite && (
            <button
              type="button"
              className={styles.favoriteButton}
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart size={24} color={isFavorite ? 'var(--status-error, #dc2626)' : 'var(--text-tertiary, #64748b)'} />
            </button>
          )}

          {outOfStock && (
            <div className={styles.outOfStockOverlay}>
              <span className={styles.outOfStockText}>Out of Stock</span>
            </div>
          )}

          {!outOfStock && showAddButton && mode === 'product' && (
            <button
              type="button"
              className={styles.addButton}
              onClick={handleAddClick}
              aria-label={addButtonText ?? 'Add'}
            >
              +
            </button>
          )}
        </div>

        {/* ── Info section ── */}
        <div
          className={clsx(
            styles.infoSection,
            mode === 'product' ? styles.infoProduct : styles.infoCategory
          )}
        >
          {mode === 'product' && weight && (
            <span className={styles.weightBadge}>{weight}</span>
          )}

          <p className={clsx(styles.name, mode === 'category' && styles.nameCategory)}>
            {name}
          </p>

          {mode === 'product' && rating != null && (
            <div className={styles.ratingRow}>
              <Star size={14} />
              <span className={styles.ratingText}>{rating.toFixed(1)}</span>
              {reviewCount != null && (
                <span className={styles.ratingCount}>({reviewCount})</span>
              )}
            </div>
          )}

          {mode === 'product' && price != null && (
            <PriceDisplay
              price={price}
              originalPrice={originalPrice}
              size="sm"
            />
          )}
        </div>
      </div>
    );
  }
);

ProductTile.displayName = 'ProductTile';
export default ProductTile;

'use client';

import { forwardRef, useCallback, useState, useRef, useEffect, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import type { ProductTilePropsBase } from '@groxigo/contracts/components';
import { Badge, StarRating } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './ProductTile.module.css';
import { PriceDisplay } from '../PriceDisplay';
import { HeartFilled } from '@groxigo/icons/custom';
import { buildSrcSetFromUrl } from '../../utils/image-url';

export interface ProductTileProps extends ProductTilePropsBase {
  /** Additional CSS class */
  className?: string;
  /** Load image eagerly (for above-the-fold tiles) */
  priority?: boolean;
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
      onRatingPress,
      onRatingSubmit,
      size = 'md',
      width,
      onPress,
      testID,
      className,
      priority = false,
    },
    ref
  ) => {
    const isCategory = price == null;
    const mode = isCategory ? 'category' : 'product';

    const handleClick = useCallback(() => {
      onPress?.();
    }, [onPress]);

    const handleAddClick = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        onAddPress?.();
      },
      [onAddPress]
    );

    const handleFavoriteClick = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        onFavoritePress?.();
      },
      [onFavoritePress]
    );

    const handleRatingClick = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        onRatingPress?.();
      },
      [onRatingPress]
    );

    // Zoom-to-rate state
    const [ratingZoomed, setRatingZoomed] = useState(false);
    const [popupPos, setPopupPos] = useState<{ top: number; left: number } | null>(null);
    const ratingAreaRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    // Track whether popup was opened by click/tap (vs hover) to prevent
    // mouseleave from closing it on touch devices
    const openedByClickRef = useRef(false);

    const openRatingPopup = useCallback((fromClick = false) => {
      if (!ratingZoomed && fromClick) openedByClickRef.current = true;
      if (ratingAreaRef.current) {
        const rect = ratingAreaRef.current.getBoundingClientRect();
        setPopupPos({ top: rect.top, left: rect.left });
      }
      setRatingZoomed(true);
    }, [ratingZoomed]);

    const scheduleClose = useCallback(() => {
      // Don't auto-close on mouseleave if opened by click/tap (touch devices)
      if (openedByClickRef.current) return;
      closeTimerRef.current = setTimeout(() => {
        // Don't close if pointer is still over the popup or rating area
        // (mouseenter may not fire on a portal that appeared under a stationary cursor)
        if (popupRef.current?.matches(':hover')) return;
        if (ratingAreaRef.current?.matches(':hover')) return;
        setRatingZoomed(false);
      }, 300);
    }, []);

    const cancelClose = useCallback(() => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    }, []);

    useEffect(() => {
      return () => { if (closeTimerRef.current) clearTimeout(closeTimerRef.current); };
    }, []);

    // Reset openedByClick when popup closes
    useEffect(() => {
      if (!ratingZoomed) openedByClickRef.current = false;
    }, [ratingZoomed]);

    // Close on outside click/tap (mobile dismiss)
    useEffect(() => {
      if (!ratingZoomed) return;
      const handler = (e: Event) => {
        const target = e.target as Node;
        if (
          !ratingAreaRef.current?.contains(target) &&
          !popupRef.current?.contains(target)
        ) {
          setRatingZoomed(false);
        }
      };
      document.addEventListener('pointerdown', handler);
      return () => document.removeEventListener('pointerdown', handler);
    }, [ratingZoomed]);

    // Close on scroll
    useEffect(() => {
      if (!ratingZoomed) return;
      const handler = () => setRatingZoomed(false);
      window.addEventListener('scroll', handler, { passive: true, capture: true });
      return () => window.removeEventListener('scroll', handler, { capture: true });
    }, [ratingZoomed]);

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
            <img
              src={imageUrl}
              srcSet={buildSrcSetFromUrl(imageUrl, ['sm', 'md', 'lg'])}
              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 200px"
              alt={name}
              loading={priority ? 'eager' : 'lazy'}
              className={styles.image}
            />
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
              <HeartFilled
                size={20}
                color={isFavorite ? 'var(--status-error, #dc2626)' : 'var(--surface-primary, #ffffff)'}
                style={!isFavorite ? { stroke: 'var(--text-tertiary, #64748b)', strokeWidth: 1.5 } : undefined}
              />
            </button>
          )}

          {outOfStock && (
            <div className={styles.outOfStockOverlay}>
              <span className={styles.outOfStockText}>Out of Stock</span>
            </div>
          )}

          {!outOfStock && showAddButton && mode === 'product' && (
            quantity && quantity > 0 ? (
              <div className={styles.quantityStepper}>
                <button
                  type="button"
                  className={styles.stepperButton}
                  onClick={(e) => { e.stopPropagation(); onDecrement?.(); }}
                  aria-label="Decrease quantity"
                >
                  {quantity === 1 ? '\u2212' : '\u2212'}
                </button>
                <span className={styles.stepperCount}>{quantity}</span>
                <button
                  type="button"
                  className={styles.stepperButton}
                  onClick={(e) => { e.stopPropagation(); onIncrement?.(); }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                type="button"
                className={styles.addButton}
                onClick={handleAddClick}
                aria-label={addButtonText ?? 'Add'}
              >
                +
              </button>
            )
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

          {mode === 'product' && (
            onRatingSubmit ? (
              <>
                <div
                  ref={ratingAreaRef}
                  className={styles.ratingArea}
                  onMouseEnter={() => { cancelClose(); openRatingPopup(false); }}
                  onMouseLeave={scheduleClose}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!ratingZoomed) openRatingPopup(true);
                  }}
                >
                  <StarRating
                    value={rating ?? 0}
                    size="xs"
                    reviewCount={reviewCount ?? 0}
                  />
                </div>
                {ratingZoomed && popupPos && typeof document !== 'undefined' && createPortal(
                  <div
                    ref={popupRef}
                    className={styles.ratingPopup}
                    style={{ top: popupPos.top, left: popupPos.left }}
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  >
                    <StarRating
                      value={rating ?? 0}
                      size="sm"
                      editable
                      onChange={(val) => {
                        onRatingSubmit(val);
                        setRatingZoomed(false);
                      }}
                    />
                  </div>,
                  document.body
                )}
              </>
            ) : onRatingPress ? (
              <button
                type="button"
                className={styles.ratingButton}
                onClick={handleRatingClick}
                aria-label="Rate this product"
              >
                <StarRating
                  value={rating ?? 0}
                  size="xs"
                  reviewCount={reviewCount ?? 0}
                />
              </button>
            ) : (
              <StarRating
                value={rating ?? 0}
                size="xs"
                reviewCount={reviewCount ?? 0}
              />
            )
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

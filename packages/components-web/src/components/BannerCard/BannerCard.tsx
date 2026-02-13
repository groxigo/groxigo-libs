'use client';

import { forwardRef } from 'react';
import type { BannerCardPropsBase } from '@groxigo/contracts/components/banner-card';
import { Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './BannerCard.module.css';
import { buildSrcSetFromUrl } from '../../utils/image-url';

export interface BannerCardProps extends BannerCardPropsBase {
  className?: string;
}

/** Size → CSS class mappings */
const SIZE_ROOT: Record<string, string> = {
  sm: styles.rootSm,
  md: styles.rootMd,
  lg: styles.rootLg,
};

const SIZE_CONTENT: Record<string, string> = {
  sm: styles.contentSm,
  md: styles.contentMd,
  lg: styles.contentLg,
};

const SIZE_TITLE: Record<string, string> = {
  sm: styles.titleSm,
  md: styles.titleMd,
  lg: styles.titleLg,
};

const SIZE_SUBTITLE: Record<string, string> = {
  sm: styles.subtitleSm,
  md: styles.subtitleMd,
  lg: styles.subtitleLg,
};

export const BannerCard = forwardRef<HTMLDivElement, BannerCardProps>(
  (
    {
      title,
      subtitle,
      imageUrl,
      gradientFrom,
      gradientTo,
      ctaText,
      onCtaPress,
      onPress,
      size = 'md',
      className,
      testID,
    },
    ref
  ) => {
    /** Set CSS custom properties for gradient when provided */
    const rootStyle: Record<string, string> = {};
    if (gradientFrom) {
      rootStyle['--gradient-from'] = gradientFrom;
    }
    if (gradientTo) {
      rootStyle['--gradient-to'] = gradientTo;
    }

    /** Render CTA button — all sizes use Button primitive */
    const renderCta = () => {
      if (!ctaText) return null;

      if (size === 'sm') {
        return (
          <div className={styles.ctaWrapper}>
            <Button
              variant="solid"
              size="sm"
              onPress={() => onCtaPress?.()}
            >
              {ctaText}
            </Button>
          </div>
        );
      }

      return (
        <div className={styles.ctaWrapper}>
          <Button
            variant="solid"
            colorScheme="secondary"
            size={size === 'lg' ? 'md' : 'sm'}
            onPress={() => onCtaPress?.()}
          >
            {ctaText}
          </Button>
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={clsx(styles.root, SIZE_ROOT[size], className)}
        style={rootStyle}
        data-testid={testID}
        role="button"
        tabIndex={0}
        onClick={onPress}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPress?.();
          }
        }}
      >
        {/* Gradient background */}
        <div className={styles.background} aria-hidden="true" />

        {/* Optional background image */}
        {imageUrl && (
          <img
            className={styles.backgroundImage}
            src={imageUrl}
            srcSet={buildSrcSetFromUrl(imageUrl, ['md', 'lg', 'xl', '2xl'])}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
        )}

        {/* Content overlay */}
        <div className={clsx(styles.content, SIZE_CONTENT[size])}>
          <h3 className={clsx(styles.title, SIZE_TITLE[size])}>{title}</h3>

          {subtitle && (
            <p className={clsx(styles.subtitle, SIZE_SUBTITLE[size])}>
              {subtitle}
            </p>
          )}

          {renderCta()}
        </div>
      </div>
    );
  }
);

BannerCard.displayName = 'BannerCard';
export default BannerCard;

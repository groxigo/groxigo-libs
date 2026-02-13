'use client';

import { forwardRef, useMemo } from 'react';
import type { RecipeCardPropsBase } from '@groxigo/contracts/components/recipe-card';
import { Badge } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './RecipeCard.module.css';
import { RecipeTagChip } from '../RecipeTagChip';
import type { RecipeTagColorScheme } from '@groxigo/contracts/components/recipe-tag-chip';
import { Clock } from '@groxigo/icons/line';
import { buildSrcSetFromUrl } from '../../utils/image-url';

export interface RecipeCardProps extends RecipeCardPropsBase {
  className?: string;
}

/** Map difficulty to a human-readable label */
const DIFFICULTY_LABEL: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

/** Format minutes to a readable string */
function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

/** Resolve a color scheme string to a valid RecipeTagColorScheme */
function resolveColorScheme(scheme?: string | null): RecipeTagColorScheme {
  if (
    scheme === 'success' ||
    scheme === 'warning' ||
    scheme === 'info' ||
    scheme === 'neutral'
  ) {
    return scheme;
  }
  return 'neutral';
}

export const RecipeCard = forwardRef<HTMLDivElement, RecipeCardProps>(
  (
    {
      id,
      title,
      imageUrl,
      prepTime,
      cookTime,
      totalTime,
      servings,
      difficulty,
      tags,
      size = 'md',
      onPress,
      className,
      testID,
    },
    ref
  ) => {
    const isSm = size === 'sm';

    const displayTime = useMemo(() => {
      if (totalTime != null) return formatTime(totalTime);
      if (prepTime != null && cookTime != null)
        return formatTime(prepTime + cookTime);
      if (prepTime != null) return formatTime(prepTime);
      if (cookTime != null) return formatTime(cookTime);
      return null;
    }, [totalTime, prepTime, cookTime]);

    return (
      <div
        ref={ref}
        className={clsx(
          styles.root,
          isSm ? styles.rootSm : styles.rootMd,
          className
        )}
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
        aria-label={title}
      >
        {/* ── Image section ── */}
        <div
          className={clsx(
            styles.imageSection,
            isSm ? styles.imageSm : styles.imageMd
          )}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              srcSet={buildSrcSetFromUrl(imageUrl, ['sm', 'md', 'lg'])}
              sizes="(max-width: 640px) 50vw, 300px"
              alt={title}
              loading="lazy"
              className={styles.image}
            />
          ) : (
            <div className={styles.imagePlaceholder} aria-hidden="true" />
          )}

          {displayTime && (
            <div className={styles.timerTag}>
              <Badge variant="subtle" colorScheme="neutral" size="xs" leftIcon={<Clock size={14} />}>
                {displayTime}
              </Badge>
            </div>
          )}
        </div>

        {/* ── Info section ── */}
        <div className={clsx(styles.info, isSm ? styles.infoSm : styles.infoMd)}>
          <p className={clsx(styles.title, isSm ? styles.titleSm : styles.titleMd)}>
            {title}
          </p>

          {/* Meta row: time, difficulty, servings */}
          <div className={clsx(styles.meta, isSm ? styles.metaSm : styles.metaMd)}>
            {displayTime && (
              <span className={styles.metaItem}>{displayTime}</span>
            )}
            {difficulty && (
              <>
                {displayTime && (
                  <span className={styles.metaSeparator} aria-hidden="true">
                    &middot;
                  </span>
                )}
                <span className={styles.metaItem}>
                  {DIFFICULTY_LABEL[difficulty] ?? difficulty}
                </span>
              </>
            )}
            {!isSm && servings != null && (
              <>
                {(displayTime || difficulty) && (
                  <span className={styles.metaSeparator} aria-hidden="true">
                    &middot;
                  </span>
                )}
                <span className={styles.metaItem}>
                  {servings} {servings === 1 ? 'serving' : 'servings'}
                </span>
              </>
            )}
          </div>

          {/* Tags row -- md only */}
          {!isSm && tags && tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag, idx) => (
                <RecipeTagChip
                  key={`${tag.name}-${idx}`}
                  label={tag.name}
                  colorScheme={resolveColorScheme(tag.color)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

RecipeCard.displayName = 'RecipeCard';
export default RecipeCard;

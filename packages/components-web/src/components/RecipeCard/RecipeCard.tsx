/**
 * RecipeCard Component (Web)
 *
 * Composite component for displaying recipe information.
 * Implements @groxigo/contracts RecipeCardPropsBase.
 */

'use client';

import React, { forwardRef } from 'react';
import { Text, Badge, Card, Icon, cn } from '@groxigo/ui-elements-web';
import type { RecipeCardPropsBase } from '@groxigo/contracts';

const sizeClasses: Record<string, { card: string; image: string; title: string }> = {
  sm: {
    card: 'w-40',
    image: 'h-28',
    title: 'text-sm',
  },
  md: {
    card: 'w-[180px]',
    image: 'h-[126px]',
    title: 'text-sm',
  },
  lg: {
    card: 'w-60',
    image: 'h-40',
    title: 'text-base',
  },
};

const difficultyColors: Record<string, { dot: string; text: string }> = {
  easy: { dot: 'bg-success', text: 'text-text-secondary' },
  medium: { dot: 'bg-warning', text: 'text-text-secondary' },
  hard: { dot: 'bg-error', text: 'text-text-secondary' },
};

export interface RecipeCardProps extends RecipeCardPropsBase {}

export const RecipeCard = forwardRef<HTMLDivElement, RecipeCardProps>(
  (
    {
      id,
      imageUrl,
      title,
      description,
      prepTime,
      cookTime,
      totalTime,
      servings,
      difficulty,
      cuisine,
      rating,
      ratingCount,
      tags,
      badge,
      badgeVariant = 'primary',
      size = 'md',
      variant = 'default',
      width,
      onPress,
      className,
      testID,
      ...props
    },
    ref
  ) => {
    const sizeConfig = sizeClasses[size];

    // Calculate display time
    const displayTime = totalTime || (prepTime && cookTime ? prepTime + cookTime : prepTime || cookTime);

    // Get cuisine from tags or direct prop
    const cuisineTag = tags?.find(t => t.type === 'cuisine') || (cuisine ? { name: cuisine, color: null } : null);

    // Map badge variant to colorScheme
    const badgeColorScheme = {
      primary: 'primary' as const,
      success: 'success' as const,
      danger: 'error' as const,
      warning: 'warning' as const,
      info: 'info' as const,
    }[badgeVariant] || 'primary';

    const difficultyStyle = difficulty ? difficultyColors[difficulty.toLowerCase()] : null;

    // Compact variant
    if (variant === 'compact') {
      return (
        <Card
          ref={ref}
          variant="outline"
          size="sm"
          pressable={!!onPress}
          onPress={onPress}
          className={cn('flex flex-row gap-3 w-full', className)}
          testID={testID}
          {...props}
        >
          {imageUrl && (
            <div className="relative w-20 h-20 flex-shrink-0">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
          <div className="flex-1 flex flex-col justify-between py-1">
            <Text variant="bodySmall" weight="semibold" className="line-clamp-2">
              {title}
            </Text>
            <div className="flex items-center gap-2 text-text-secondary">
              {displayTime && (
                <span className="flex items-center gap-1">
                  <Icon name="clock" size="xs" colorScheme="muted" />
                  <Text variant="caption" colorScheme="muted">{displayTime} min</Text>
                </span>
              )}
              {difficulty && difficultyStyle && (
                <div className="flex items-center gap-1">
                  <span className={cn('w-1.5 h-1.5 rounded-full', difficultyStyle.dot)} />
                  <Text variant="caption" className={difficultyStyle.text}>
                    {difficulty}
                  </Text>
                </div>
              )}
            </div>
          </div>
        </Card>
      );
    }

    // Horizontal variant
    if (variant === 'horizontal') {
      return (
        <Card
          ref={ref}
          variant="outline"
          size="sm"
          pressable={!!onPress}
          onPress={onPress}
          className={cn('flex flex-row gap-4', className)}
          testID={testID}
          {...props}
        >
          {imageUrl && (
            <div className="relative w-32 h-32 flex-shrink-0">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover rounded-lg"
              />
              {badge && (
                <Badge
                  colorScheme={badgeColorScheme}
                  size="xs"
                  className="absolute top-2 left-2"
                >
                  {badge}
                </Badge>
              )}
            </div>
          )}
          <div className="flex-1 flex flex-col justify-between py-1">
            <div>
              <Text variant="body" weight="semibold" className="line-clamp-2 mb-1">
                {title}
              </Text>
              {description && (
                <Text variant="bodySmall" colorScheme="muted" className="line-clamp-2">
                  {description}
                </Text>
              )}
            </div>
            <div className="flex items-center gap-3">
              {displayTime && (
                <span className="flex items-center gap-1">
                  <Icon name="clock" size="sm" colorScheme="muted" />
                  <Text variant="caption" colorScheme="muted">{displayTime} min</Text>
                </span>
              )}
              {rating != null && rating > 0 && (
                <span className="flex items-center gap-1">
                  <Icon name="star" size="sm" className="text-warning" />
                  <Text variant="caption">{rating.toFixed(1)}</Text>
                </span>
              )}
              {difficulty && difficultyStyle && (
                <div className="flex items-center gap-1">
                  <span className={cn('w-1.5 h-1.5 rounded-full', difficultyStyle.dot)} />
                  <Text variant="caption" className={difficultyStyle.text}>
                    {difficulty}
                  </Text>
                </div>
              )}
            </div>
          </div>
        </Card>
      );
    }

    // Default vertical card (matches mobile design)
    return (
      <div
        ref={ref}
        onClick={onPress}
        className={cn(
          'flex flex-col overflow-hidden rounded-2xl bg-white cursor-pointer',
          width ? '' : sizeConfig.card,
          className
        )}
        style={width ? { width: `${width}px` } : undefined}
        data-testid={testID}
        {...props}
      >
        {/* Image container */}
        {imageUrl && (
          <div className="relative w-full" style={{ height: width ? `${width * 0.7}px` : undefined }}>
            <img
              src={imageUrl}
              alt={title}
              className={cn('w-full object-cover rounded-2xl', !width && sizeConfig.image)}
              style={width ? { height: `${width * 0.7}px` } : undefined}
            />

            {/* Time Badge - Top Left */}
            {displayTime && (
              <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-full">
                <Icon name="clock" size="xs" className="text-white" />
                <span>{displayTime} min</span>
              </div>
            )}

            {/* Rating Badge - Top Right */}
            {rating != null && rating > 0 && (
              <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-white text-xs font-semibold px-2 py-1 rounded-full">
                <Icon name="star" size="xs" className="text-warning" />
                <span>{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col p-3 gap-2">
          {/* Title */}
          <Text variant="bodySmall" weight="semibold" className="line-clamp-2 leading-tight">
            {title}
          </Text>

          {/* Meta Row: Cuisine + Difficulty */}
          <div className="flex items-center gap-2 flex-wrap">
            {cuisineTag && (
              <span
                className="text-[10px] px-2 py-0.5 rounded capitalize"
                style={{
                  backgroundColor: cuisineTag.color ? `${cuisineTag.color}20` : 'rgba(79, 70, 229, 0.1)',
                  color: cuisineTag.color || '#4F46E5',
                }}
              >
                {cuisineTag.name}
              </span>
            )}

            {difficulty && difficultyStyle && (
              <div className="flex items-center gap-1">
                <span className={cn('w-1.5 h-1.5 rounded-full', difficultyStyle.dot)} />
                <Text variant="caption" className={cn('capitalize', difficultyStyle.text)}>
                  {difficulty}
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

RecipeCard.displayName = 'RecipeCard';

export default RecipeCard;

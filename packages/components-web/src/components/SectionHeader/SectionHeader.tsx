'use client';

import { forwardRef, createElement } from 'react';
import type { SectionHeaderPropsBase } from '@groxigo/contracts/components';
import { Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './SectionHeader.module.css';

export interface SectionHeaderProps extends SectionHeaderPropsBase {}

/** Map titleVariant to CSS class and HTML heading element */
const TITLE_VARIANT_CLASS: Record<string, string> = {
  h1: styles.titleH1,
  h2: styles.titleH2,
  h3: styles.titleH3,
  h4: styles.titleH4,
  h5: styles.titleH5,
  h6: styles.titleH6,
};

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      title,
      titleVariant = 'h3',
      subtitle,
      showSeeAll = false,
      seeAllText = 'See all',
      onSeeAllPress,
      className,
      testID,
    },
    ref
  ) => {
    const headingElement = titleVariant;
    const titleClass = TITLE_VARIANT_CLASS[titleVariant] ?? styles.titleH3;

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        <div className={styles.titleArea}>
          {createElement(
            headingElement,
            { className: clsx(styles.title, titleClass) },
            title
          )}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        {showSeeAll && (
          <Button
            variant="ghost"
            colorScheme="primary"
            size="sm"
            onPress={onSeeAllPress}
            aria-label={`${seeAllText} ${title}`}
          >
            <span>{seeAllText}</span>
            <span className={styles.seeAllChevron} aria-hidden="true">
              &#8250;
            </span>
          </Button>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';
export default SectionHeader;

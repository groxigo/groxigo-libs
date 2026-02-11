'use client';

import { forwardRef, useState, useCallback, useId } from 'react';
import { AngleDown } from '@groxigo/icons/line';
import type { AccordionSectionPropsBase } from '@groxigo/contracts/components/accordion-section';
import { Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './AccordionSection.module.css';

export interface AccordionSectionProps extends AccordionSectionPropsBase {}


export const AccordionSection = forwardRef<HTMLDivElement, AccordionSectionProps>(
  (
    {
      title,
      defaultExpanded = false,
      expanded: controlledExpanded,
      onToggle,
      children,
      className,
      testID,
    },
    ref
  ) => {
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
    const headerId = useId();

    const isControlled = controlledExpanded !== undefined;
    const isExpanded = isControlled ? controlledExpanded : internalExpanded;

    const handleToggle = useCallback(() => {
      const nextExpanded = !isExpanded;

      if (!isControlled) {
        setInternalExpanded(nextExpanded);
      }

      onToggle?.(nextExpanded);
    }, [isExpanded, isControlled, onToggle]);

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        <Button
          variant="ghost"
          onPress={handleToggle}
          aria-expanded={isExpanded}
          fullWidth
          className={styles.header}
        >
          <span id={headerId} className={styles.title}>{title}</span>
          <span className={clsx(styles.chevron, isExpanded && styles.chevronExpanded)}>
            <AngleDown size={16} />
          </span>
        </Button>

        <div
          className={clsx(styles.content, !isExpanded && styles.contentCollapsed)}
          role="region"
          aria-labelledby={headerId}
        >
          {children}
        </div>
      </div>
    );
  }
);

AccordionSection.displayName = 'AccordionSection';
export default AccordionSection;

'use client';

import { forwardRef } from 'react';
import type { OnboardingStepPropsBase } from '@groxigo/contracts/components/onboarding-step';
import { Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './OnboardingStep.module.css';

export interface OnboardingStepProps extends OnboardingStepPropsBase {
  className?: string;
}

export const OnboardingStep = forwardRef<HTMLDivElement, OnboardingStepProps>(
  (
    {
      title,
      description,
      illustration,
      imageUrl,
      currentStep,
      totalSteps,
      ctaText = 'Next',
      onNext,
      onSkip,
      className,
      testID,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        {/* Illustration area */}
        <div className={styles.illustrationArea}>
          {illustration ? (
            illustration
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className={styles.illustrationImage}
            />
          ) : (
            <div className={styles.illustrationPlaceholder} />
          )}
        </div>

        {/* Text content */}
        <div className={styles.textContent}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        {/* Step dot indicators */}
        {totalSteps > 1 && (
          <div
            className={styles.dotIndicators}
            role="tablist"
            aria-label={`Step ${currentStep} of ${totalSteps}`}
          >
            {Array.from({ length: totalSteps }, (_, i) => (
              <span
                key={i}
                className={clsx(
                  styles.dot,
                  i + 1 === currentStep && styles.dotActive
                )}
                role="tab"
                aria-selected={i + 1 === currentStep}
                aria-label={`Step ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Actions */}
        <div className={styles.actions}>
          {onNext && (
            <Button
              variant="solid"
              colorScheme="primary"
              size="lg"
              fullWidth
              onPress={onNext}
              testID={testID ? `${testID}-next` : undefined}
            >
              {ctaText}
            </Button>
          )}
          {onSkip && (
            <button
              type="button"
              className={styles.skipLink}
              onClick={onSkip}
            >
              Skip
            </button>
          )}
        </div>
      </div>
    );
  }
);

OnboardingStep.displayName = 'OnboardingStep';
export default OnboardingStep;

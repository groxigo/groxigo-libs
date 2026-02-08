'use client';

import { forwardRef } from 'react';
import type {
  NutritionTablePropsBase,
  NutritionRow,
} from '@groxigo/contracts/components/nutrition-table';
import clsx from 'clsx';
import styles from './NutritionTable.module.css';

export type { NutritionRow };

export interface NutritionTableProps extends NutritionTablePropsBase {}

export const NutritionTable = forwardRef<HTMLDivElement, NutritionTableProps>(
  (
    {
      servingSize,
      servingsPerContainer,
      calories,
      rows,
      vitamins,
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
        {/* Title */}
        <div className={styles.titleRow}>
          <span className={styles.title}>Nutrition Facts</span>
        </div>

        {/* Serving info */}
        {servingSize && (
          <div className={styles.servingRow}>
            <span className={styles.servingLabel}>Serving Size</span>
            <span className={styles.servingValue}>{servingSize}</span>
          </div>
        )}

        {servingsPerContainer && (
          <div className={styles.servingRow}>
            <span className={styles.servingLabel}>Servings Per Container</span>
            <span className={styles.servingValue}>{servingsPerContainer}</span>
          </div>
        )}

        {/* Thick divider */}
        <div className={styles.thickDivider} />

        {/* Calories row */}
        {calories && (
          <div className={styles.caloriesRow}>
            <span className={styles.caloriesLabel}>Calories</span>
            <span className={styles.caloriesValue}>{calories}</span>
          </div>
        )}

        {/* Daily value header */}
        <div className={styles.dailyValueHeader}>
          <span className={styles.dailyValueText}>% Daily Value*</span>
        </div>

        {/* Nutrient rows */}
        {rows.map((row, index) => (
          <div
            key={`${row.label}-${index}`}
            className={clsx(
              styles.nutrientRow,
              row.indent && styles.indented,
              row.bold && styles.boldRow
            )}
          >
            <span
              className={clsx(
                styles.nutrientLabel,
                row.bold && styles.boldText,
                row.indent && styles.indentedText
              )}
            >
              {row.label}
            </span>
            <span className={styles.nutrientValue}>{row.value}</span>
            {row.dailyValue && (
              <span className={styles.dailyValue}>{row.dailyValue}</span>
            )}
          </div>
        ))}

        {/* Vitamins section */}
        {vitamins && vitamins.length > 0 && (
          <>
            <div className={styles.thinDivider} />
            <div className={styles.vitaminsRow}>
              {vitamins.map((v, i) => (
                <span key={`${v.label}-${i}`} className={styles.vitaminItem}>
                  {v.label} {v.value}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
);

NutritionTable.displayName = 'NutritionTable';
export default NutritionTable;

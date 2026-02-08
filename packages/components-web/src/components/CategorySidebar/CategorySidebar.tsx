'use client';

import { forwardRef, useState, useCallback, type ReactNode } from 'react';
import { AngleDown, AngleRight } from '@groxigo/icons/line';
import { Button } from '@groxigo/ui-elements-web';
import { SearchBar } from '../SearchBar';
import clsx from 'clsx';
import styles from './CategorySidebar.module.css';

export interface CategoryItem {
  id: string;
  label: string;
  subcategories?: { id: string; label: string }[];
}

export interface CategorySidebarProps {
  categories: CategoryItem[];
  selectedCategoryId?: string;
  selectedSubcategoryId?: string;
  onCategorySelect?: (categoryId: string) => void;
  onSubcategorySelect?: (categoryId: string, subcategoryId: string) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filterContent?: ReactNode;
  className?: string;
  testID?: string;
}


export const CategorySidebar = forwardRef<HTMLElement, CategorySidebarProps>(
  (
    {
      categories,
      selectedCategoryId,
      selectedSubcategoryId,
      onCategorySelect,
      onSubcategorySelect,
      searchValue = '',
      onSearchChange,
      filterContent,
      className,
      testID,
    },
    ref
  ) => {
    const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(
      selectedCategoryId ?? null
    );

    const handleCategoryClick = useCallback(
      (categoryId: string) => {
        setExpandedCategoryId((prev) =>
          prev === categoryId ? null : categoryId
        );
        onCategorySelect?.(categoryId);
      },
      [onCategorySelect]
    );

    const handleSubcategoryClick = useCallback(
      (categoryId: string, subcategoryId: string) => {
        onSubcategorySelect?.(categoryId, subcategoryId);
      },
      [onSubcategorySelect]
    );

    const handleSearchChange = useCallback(
      (value: string) => {
        onSearchChange?.(value);
      },
      [onSearchChange]
    );

    return (
      <aside
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        {/* Search */}
        <SearchBar
          value={searchValue}
          onChangeText={handleSearchChange}
          placeholder="Search categories..."
          size="sm"
        />

        {/* Divider */}
        <div className={styles.divider} role="separator" />

        {/* Category list */}
        <nav className={styles.categories} aria-label="Categories">
          {categories.map((category) => {
            const isExpanded = expandedCategoryId === category.id;
            const hasSubcategories =
              category.subcategories && category.subcategories.length > 0;
            const isCategoryActive = selectedCategoryId === category.id;

            return (
              <div key={category.id} className={styles.categoryItem}>
                <Button
                  variant="ghost"
                  fullWidth
                  onPress={() => handleCategoryClick(category.id)}
                  className={clsx(
                    styles.categoryHeader,
                    isCategoryActive && styles.categoryHeaderActive
                  )}
                  aria-expanded={hasSubcategories ? isExpanded : undefined}
                >
                  <span
                    className={clsx(
                      styles.categoryLabel,
                      isCategoryActive && styles.categoryLabelActive
                    )}
                  >
                    {category.label}
                  </span>
                  {hasSubcategories && (
                    <span className={styles.chevron}>
                      {isExpanded ? <AngleDown size={16} /> : <AngleRight size={16} />}
                    </span>
                  )}
                </Button>

                {hasSubcategories && isExpanded && (
                  <div className={styles.subcategories}>
                    {category.subcategories!.map((sub) => {
                      const isSubActive = selectedSubcategoryId === sub.id;

                      return (
                        <Button
                          key={sub.id}
                          variant="ghost"
                          size="sm"
                          fullWidth
                          onPress={() =>
                            handleSubcategoryClick(category.id, sub.id)
                          }
                          className={clsx(
                            styles.subcategoryItem,
                            isSubActive
                              ? styles.subcategoryActive
                              : styles.subcategoryDefault
                          )}
                        >
                          {sub.label}
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Divider before filters */}
        {filterContent && (
          <>
            <div className={styles.divider} role="separator" />
            <div className={styles.filterSection}>
              <span className={styles.filterTitle}>Filters</span>
              {filterContent}
            </div>
          </>
        )}
      </aside>
    );
  }
);

CategorySidebar.displayName = 'CategorySidebar';
export default CategorySidebar;

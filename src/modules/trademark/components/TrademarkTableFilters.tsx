"use client";

import React from 'react';
import styles from '../../../styles/TrademarkTable.module.css';
import { useTranslation } from '../../../i18n';

interface TrademarkTableFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const TrademarkTableFilters: React.FC<TrademarkTableFiltersProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder={t('trademark.portfolio.search.placeholder')}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
        {searchTerm && (
          <button
            className={styles.clearButton}
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default TrademarkTableFilters;

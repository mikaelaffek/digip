import React from 'react';
import styles from '../../styles/TrademarkTable.module.css';

interface TrademarkTableFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const TrademarkTableFilters: React.FC<TrademarkTableFiltersProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search trademarks..."
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

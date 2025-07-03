"use client";

import React from 'react';
import { useTrademarkTable } from '@modules/trademark/hooks/useTrademarkTable';
import { Table } from '@components/Table/Table';
import { useTranslation } from '@/i18n';
import { Trademark } from '@/types/trademark';
import styles from '@styles/TrademarkTable.module.css';
import TrademarkTableFilters from './TrademarkTableFilters';
import TrademarkModal from './TrademarkTableModals';

const TrademarkTable: React.FC = () => {
  const { t } = useTranslation();
  
  // Use our custom hook that encapsulates all the table logic
  const {
    trademarks,
    isLoading,
    error,
    totalCount,
    apiTotalCount,
    pagination,
    searchTerm,
    setSearchTerm,
    handleFilterChange,
    filters,
    sortConfig,
    handleSort,
    selectedTrademark,
    handleCloseModal,
    columns
  } = useTrademarkTable();

  return (
    <div className={styles.trademarkTableContainer}>
      <div className={styles.tableHeader}>
        <h1>{t('trademark.portfolio.title')}</h1>
        <div className={styles.tableStats}>
          <span>{t('trademark.portfolio.total', { count: apiTotalCount })}</span>
          {totalCount !== apiTotalCount && (
            <span className={styles.filteredCount}> ({t('trademark.portfolio.filteredResults', { count: totalCount })})</span>
          )}
        </div>
      </div>

      <TrademarkTableFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <Table<Trademark>
        columns={columns}
        data={trademarks}
        isLoading={isLoading}
        error={error}
        onRowClick={undefined}
        sortConfig={sortConfig}
        onSort={handleSort}
        filters={filters}
        onFilterChange={handleFilterChange}
        emptyMessage="No trademarks found matching your criteria"
        containerWidth="100%"
        pagination={pagination}
      />

      {selectedTrademark && (
        <TrademarkModal
          trademark={selectedTrademark}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default TrademarkTable;

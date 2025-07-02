"use client";

import React, { useState } from 'react';
import { useTrademarks } from '../hooks/useTrademarks';
import { Table } from '../../../components/Table/Table';
import { Trademark } from '../../../types/trademark';
import { TableFilters } from '../../../types/table';
import styles from '../../../styles/TrademarkTable.module.css';
import TrademarkTableFilters from './TrademarkTableFilters';
import TrademarkModal from './TrademarkTableModals';
import { getTrademarkColumns } from './TrademarkTableColumns';

const TrademarkTable: React.FC = () => {
  const {
    trademarks,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    sortConfig,
    handleSort,
    totalCount,
    pagination,
    dateFilters,
    setDateFilters,
    statusFilters,
    setStatusFilters,
  } = useTrademarks();

  const [selectedTrademark, setSelectedTrademark] = useState<Trademark | null>(null);

  // Handle view button click to show modal
  const handleViewClick = (trademark: Trademark) => {
    setSelectedTrademark(trademark);
  };

  // Get columns from the separated file and pass the handler
  const columns = getTrademarkColumns(handleViewClick);
  
  // Handle filter changes
  const handleFilterChange = (filters: TableFilters) => {
    console.log('Filter changed:', filters);
    
    if (filters.searchTerm !== undefined && filters.searchTerm !== searchTerm) {
      setSearchTerm(filters.searchTerm);
    }
    
    // Update date filters
    setDateFilters(filters.dateFilters);
    
    // Update status filters
    console.log('Setting status filters:', filters.statusFilters);
    setStatusFilters(filters.statusFilters);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setSelectedTrademark(null);
  };

  return (
    <div className={styles.trademarkTableContainer}>
      <div className={styles.tableHeader}>
        <h1>Trademark Portfolio</h1>
        <div className={styles.tableStats}>
          <span>Total: {totalCount} trademarks</span>
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
        filters={{
          dateFilters: dateFilters || {},
          statusFilters: statusFilters || {},
          searchTerm: searchTerm
        }}
        onFilterChange={handleFilterChange}
        emptyMessage="No trademarks found matching your criteria"
        containerWidth="100%"
        pagination={{
          currentPage: pagination.currentPage,
          totalPages: pagination.totalPages,
          pageSize: pagination.pageSize,
          onPageChange: pagination.onPageChange,
          onPageSizeChange: pagination.onPageSizeChange,
          pageSizeOptions: pagination.pageSizeOptions
        }}
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

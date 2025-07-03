"use client";

import React, { useState, useEffect } from 'react';
import { useTrademarks, usePagination } from '../hooks';
import { Table } from '../../../components/Table/Table';
import { Trademark } from '../../../types/trademark';
import { TableFilters, DateFilterConfig, StatusFilterConfig, SortConfig } from '../../../types/table';
import styles from '../../../styles/TrademarkTable.module.css';
import TrademarkTableFilters from './TrademarkTableFilters';
import TrademarkModal from './TrademarkTableModals';
import { getTrademarkColumns } from './TrademarkTableColumns';

const TrademarkTable: React.FC = () => {
    // Initialize search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilters, setDateFilters] = useState<Record<string, DateFilterConfig>>({});
  const [statusFilters, setStatusFilters] = useState<Record<string, StatusFilterConfig>>({});
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'properties.display_text',
    direction: 'asc'
  });
  
  // Initialize pagination
  const [totalCount, setTotalCount] = useState(0);
  const pagination = usePagination(1, 3, totalCount, [3, 8, 16, 32]);
  
  // Handle sorting
  const handleSort = (key: string) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };
  
  // Fetch trademarks with all parameters
  const { trademarks, isLoading, error } = useTrademarks({
    page: pagination.currentPage,
    pageSize: pagination.pageSize,
    sortBy: sortConfig.key,
    sortOrder: sortConfig.direction,
    searchTerm,
    dateFilters,
    statusFilters,
    onTotalCountChange: setTotalCount
  });

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

  useEffect(() => {
    pagination.onPageChange(1);
  }, [searchTerm, dateFilters, statusFilters]);

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
          searchTerm
        }}
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

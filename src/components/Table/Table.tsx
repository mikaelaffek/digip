"use client";

import React, { useState, useEffect } from 'react';
import { TableProps, TableFilters, DateFilterConfig } from '@/types/table';
import styles from '@/styles/Table.module.css';
import { TableHeader } from '@/components/Table/TableHeader/TableHeader';
import { TableRow } from '@/components/Table/TableRow';
import { TableLoadingRow } from '@/components/Table/TableLoadingRow';
import { TablePagination } from '@/components/Table/TablePagination';

/**
 * Generic reusable Table component
 * Can be used for any data type with appropriate column configuration
 */
export function Table<T extends { id: string }>({
  columns,
  data,
  isLoading = false,
  error = null,
  onRowClick,
  sortConfig,
  onSort,
  filters,
  onFilterChange,
  emptyMessage = 'No data available',
  pagination,
  containerWidth,
}: TableProps<T>) {
  // State for delayed loading display
  const [showLoading, setShowLoading] = useState(false);
  
  // Initialize filters if not provided
  const [internalFilters, setInternalFilters] = useState<TableFilters>(
    filters || { dateFilters: {}, statusFilters: {} }
  );
  
  // Update internal filters when external filters change
  useEffect(() => {
    if (filters) {
      setInternalFilters(filters);
    }
  }, [filters]);
  
  // Handle filter changes
  const handleFilterChange = (newFilters: TableFilters) => {
    setInternalFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };
  
  // Effect to add delay before showing loading state
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isLoading) {
      // Add a small delay before showing loading indicators
      timer = setTimeout(() => {
        setShowLoading(true);
      }, 300); // 300ms delay for better UX
    } else {
      setShowLoading(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading]);
  
  // Handle loading state
  // Create container style with optional width
  const containerStyle = containerWidth ? { width: containerWidth } : {};

  if (isLoading) {
    return (
      <div className={styles.tableContainer} style={containerStyle}>
        <table className={styles.table}>
          <TableHeader 
          columns={columns} 
          filters={filters || internalFilters}
          onFilterChange={onFilterChange || handleFilterChange}
        />
          <tbody>
            {showLoading && [...Array(5)].map((_, index) => (
              <TableLoadingRow key={index} columns={columns} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className={styles.errorContainer} style={containerStyle}>
        <p>Error loading data: {error.message}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  // Handle empty data
  if (!data.length) {
    return (
      <div className={styles.tableContainer} style={containerStyle}>
        <table className={styles.table}>
          <TableHeader 
            columns={columns} 
            sortConfig={sortConfig} 
            onSort={onSort}
            filters={filters || internalFilters}
            onFilterChange={onFilterChange || handleFilterChange}
          />
          <tbody>
            <tr>
              <td colSpan={columns.length} className={styles.emptyMessage}>
                {emptyMessage}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // Render table with data
  return (
    <div className={styles.tableContainer} style={containerStyle}>
      <table className={styles.table}>
        <TableHeader 
          columns={columns} 
          sortConfig={sortConfig} 
          onSort={onSort} 
          filters={filters || internalFilters}
          onFilterChange={onFilterChange || handleFilterChange}
        />
        <tbody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              item={item}
              columns={columns}
              onRowClick={onRowClick}
            />
          ))}
        </tbody>
      </table>
      
      {/* Render pagination if pagination props are provided */}
      {pagination && (
        <TablePagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
          pageSize={pagination.pageSize}
          pageSizeOptions={pagination.pageSizeOptions}
          onPageSizeChange={pagination.onPageSizeChange}
        />
      )}
    </div>
  );
}

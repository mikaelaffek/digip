"use client";

import React from 'react';
import { TableProps, SortConfig } from '../../types/table';
import styles from '../../styles/Table.module.css';

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
  emptyMessage = 'No data available',
}: TableProps<T>) {
  // Handle loading state
  if (isLoading) {
    return (
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} style={{ width: column.width }}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className={styles.loadingRow}>
                {columns.map((column) => (
                  <td key={`${index}-${column.key}`} className={styles.loadingCell}>
                    <div className={styles.skeleton}></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>Error loading data: {error.message}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  // Render sort indicator
  const renderSortIndicator = (columnKey: string, currentSort?: SortConfig) => {
    if (!currentSort || columnKey !== currentSort.key) {
      return <span className={styles.sortIcon}>↕</span>;
    }
    
    return (
      <span className={styles.sortIcon}>
        {currentSort.direction === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  // Handle empty data
  if (!data.length) {
    return (
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} style={{ width: column.width }}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
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
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{ width: column.width }}
                className={column.sortable ? styles.sortable : ''}
                onClick={() => {
                  if (column.sortable && onSort) {
                    onSort(column.key);
                  }
                }}
              >
                <div className={styles.headerContent}>
                  {column.header}
                  {column.sortable && onSort && renderSortIndicator(column.key, sortConfig)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              onClick={() => onRowClick && onRowClick(item)}
              className={onRowClick ? styles.clickableRow : ''}
            >
              {columns.map((column) => (
                <td key={`${item.id}-${column.key}`}>
                  {column.render
                    ? column.render(item)
                    : getNestedValue(item, column.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Helper function to get nested values from an object using dot notation
// e.g., getNestedValue(obj, 'user.address.city')
function getNestedValue(obj: any, path: string): any {
  const keys = path.split('.');
  return keys.reduce((o, key) => (o && o[key] !== undefined ? o[key] : null), obj);
}

"use client";

import React from 'react';
import { TableColumn, SortConfig } from '../../types/table';
import styles from '../../styles/Table.module.css';

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  sortConfig?: SortConfig;
  onSort?: (key: string) => void;
}

export function TableHeader<T>({ columns, sortConfig, onSort }: TableHeaderProps<T>) {
  // Render sort indicator
  const renderSortIndicator = (columnKey: string) => {
    if (!sortConfig || columnKey !== sortConfig.key) {
      return <span className={styles.sortIcon}>↕</span>;
    }
    
    return (
      <span className={styles.sortIcon}>
        {sortConfig.direction === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  return (
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
              {column.sortable && onSort && renderSortIndicator(column.key)}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

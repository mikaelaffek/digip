"use client";

import React from 'react';
import { TableProps } from '../../types/table';
import styles from '../../styles/Table.module.css';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { LoadingRow } from './LoadingRow';
import { Pagination } from './Pagination';

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
  pagination,
}: TableProps<T>) {
  // Handle loading state
  if (isLoading) {
    return (
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <TableHeader columns={columns} />
          <tbody>
            {[...Array(5)].map((_, index) => (
              <LoadingRow key={index} columns={columns} index={index} />
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

  // Handle empty data
  if (!data.length) {
    return (
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <TableHeader columns={columns} sortConfig={sortConfig} onSort={onSort} />
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
        <TableHeader columns={columns} sortConfig={sortConfig} onSort={onSort} />
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
        <Pagination
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

"use client";
import React from 'react';
import { TableColumn, SortConfig, TableFilters } from '../../../types/table';
import styles from '../../../styles/Table.module.css';
import { DateFilterIcon } from './DateFilterIcon';
import { StatusFilterIcon } from './StatusFilterIcon';
import { useTableHeaderState } from './useTableHeaderState';

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  sortConfig?: SortConfig;
  onSort?: (key: string) => void;
  filters?: TableFilters;
  onFilterChange?: (filters: TableFilters) => void;
}

export function TableHeader<T>({ columns, sortConfig, onSort, filters, onFilterChange }: TableHeaderProps<T>) {
  const state = useTableHeaderState(filters, onFilterChange);

  // Status options for filter dropdown (customize as needed)
  const getAvailableStatuses = (columnKey: string): string[] => [
    'Registered', 'Published', 'Filed', 'Pending', 'Expired', 'Rejected'
  ];

  const renderSortIndicator = (columnKey: string) => {
    if (!sortConfig || columnKey !== sortConfig.key) {
      return <span className={styles.sortIcon}>↕</span>;
    }
    return <span className={styles.sortIcon}>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            style={{ width: column.width }}
            className={`${column.sortable ? styles.sortable : ''} ${column.type === 'date' ? styles.dateColumn : ''}`}
          >
            <div className={styles.headerContent}>
              <div
                className={styles.headerText}
                onClick={() => {
                  if (column.sortable && onSort) onSort(column.key);
                }}
              >
                {column.header}
                {column.sortable && onSort && renderSortIndicator(column.key)}
              </div>
              {column.type === 'date' && column.filterable && onFilterChange && (
                <DateFilterIcon
                  active={state.activeDateFilter === column.key}
                  onClick={e => { e.stopPropagation(); state.toggleDateFilter(column.key); }}
                  columnKey={column.key}
                  filter={filters?.dateFilters[column.key]}
                  onFilterChange={state.handleDateFilterChange}
                  onClose={() => state.setActiveDateFilter(null)}
                  isActive={!!state.isDateFilterActive(column.key)}
                />
              )}
              {column.type === 'status' && column.filterable && onFilterChange && (
                <StatusFilterIcon
                  active={state.activeStatusFilter === column.key}
                  onClick={e => { e.stopPropagation(); state.toggleStatusFilter(column.key); }}
                  columnKey={column.key}
                  availableStatuses={getAvailableStatuses(column.key)}
                  selectedStatuses={filters?.statusFilters[column.key]?.selectedStatuses || []}
                  onFilterChange={selected => state.handleStatusFilterChange(column.key, selected)}
                  onClose={() => state.setActiveStatusFilter(null)}
                  isActive={!!state.isStatusFilterActive(column.key)}
                />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

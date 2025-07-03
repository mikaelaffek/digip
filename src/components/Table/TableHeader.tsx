"use client";

import React, { useState } from 'react';
import { TableColumn, SortConfig, TableFilters, DateFilterConfig, StatusFilterConfig } from '@/types/table';
import styles from '@/styles/Table.module.css';
import TableDateFilter from '@/components/Table/TableDateFilter';
import { TableStatusFilter } from '@/components/Table/TableStatusFilter';
import { FaCalendarAlt, FaFilter } from 'react-icons/fa';

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  sortConfig?: SortConfig;
  onSort?: (key: string) => void;
  filters?: TableFilters;
  onFilterChange?: (filters: TableFilters) => void;
}

export function TableHeader<T>({ columns, sortConfig, onSort, filters, onFilterChange }: TableHeaderProps<T>) {
  const [activeDateFilter, setActiveDateFilter] = useState<string | null>(null);
  const [activeStatusFilter, setActiveStatusFilter] = useState<string | null>(null);
  
  // Get available statuses for each status column
  const getAvailableStatuses = (columnKey: string): string[] => {
    // In a real app, this would come from the API or be passed as a prop
    // For now, we'll hardcode some common trademark statuses
    return ['Registered', 'Published', 'Filed', 'Pending', 'Expired', 'Rejected'];
  };
  
  // Debug function to log filter state
  const logFilterState = () => {
    console.log('Active status filter:', activeStatusFilter);
    console.log('Current filters:', filters);
  };
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

  // Handle date filter changes
  const handleDateFilterChange = (columnKey: string, dateFilter: DateFilterConfig) => {
    if (onFilterChange && filters) {
      onFilterChange({
        ...filters,
        dateFilters: {
          ...filters.dateFilters,
          [columnKey]: dateFilter
        }
      });
    }
  };
  
  // Handle status filter changes
  const handleStatusFilterChange = (columnKey: string, selectedStatuses: string[]) => {
    console.log(`Status filter handler called for ${columnKey} with:`, selectedStatuses);
    if (onFilterChange && filters) {
      // Create a copy of the current filters
      const newFilters = {
        ...filters,
        statusFilters: {
          ...filters.statusFilters,
          [columnKey]: { selectedStatuses }
        }
      };
      console.log('New filters object:', newFilters);
      onFilterChange(newFilters);
    }
  };

  // Toggle date filter visibility
  const toggleDateFilter = (columnKey: string) => {
    setActiveDateFilter(activeDateFilter === columnKey ? null : columnKey);
    // Close status filter if open
    if (activeStatusFilter) {
      setActiveStatusFilter(null);
    }
  };
  
  // Toggle status filter visibility
  const toggleStatusFilter = (columnKey: string) => {
    setActiveStatusFilter(activeStatusFilter === columnKey ? null : columnKey);
    // Close date filter if open
    if (activeDateFilter) {
      setActiveDateFilter(null);
    }
  };

  // Check if a date filter is active
  const isDateFilterActive = (columnKey: string) => {
    return filters?.dateFilters[columnKey] && 
      (filters.dateFilters[columnKey].startDate || filters.dateFilters[columnKey].endDate);
  };
  
  // Check if a status filter is active
  const isStatusFilterActive = (columnKey: string) => {
    return filters?.statusFilters[columnKey] && 
      filters.statusFilters[columnKey].selectedStatuses.length > 0;
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
                  if (column.sortable && onSort) {
                    onSort(column.key);
                  }
                }}
              >
                {column.header}
                {column.sortable && onSort && renderSortIndicator(column.key)}
              </div>
              
              {column.type === 'date' && column.filterable && onFilterChange && (
                <div className={styles.filterIconContainer}>
                  <button 
                    className={`${styles.filterIcon} ${isDateFilterActive(column.key) ? styles.activeFilter : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDateFilter(column.key);
                    }}
                    aria-label={`Filter ${column.header}`}
                  >
                    <FaCalendarAlt />
                  </button>
                  
                  {activeDateFilter === column.key && (
                    <TableDateFilter
                      columnKey={column.key}
                      initialFilter={filters?.dateFilters[column.key]}
                      onFilterChange={handleDateFilterChange}
                      onClose={() => setActiveDateFilter(null)}
                    />
                  )}
                </div>
              )}
              
              {column.type === 'status' && column.filterable && onFilterChange && (
                <div className={styles.filterIconContainer}>
                  <button 
                    className={`${styles.filterIcon} ${isStatusFilterActive(column.key) ? styles.activeFilter : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStatusFilter(column.key);
                    }}
                    aria-label={`Filter ${column.header} status`}
                  >
                    <FaFilter />
                  </button>
                  
                  {activeStatusFilter === column.key && (
                    <TableStatusFilter
                      columnKey={column.key}
                      availableStatuses={getAvailableStatuses(column.key)}
                      selectedStatuses={filters?.statusFilters[column.key]?.selectedStatuses || []}
                      onFilterChange={(selectedStatuses) => {
                        console.log(`Status filter changed for ${column.key}:`, selectedStatuses);
                        handleStatusFilterChange(column.key, selectedStatuses);
                      }}
                      onClose={() => setActiveStatusFilter(null)}
                    />
                  )}
                </div>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

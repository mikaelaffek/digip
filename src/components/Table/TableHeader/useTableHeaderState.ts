import { useState } from "react";
import { TableFilters, DateFilterConfig, StatusFilterConfig } from "../../../types/table";

export function useTableHeaderState(filters?: TableFilters, onFilterChange?: (filters: TableFilters) => void) {
  const [activeDateFilter, setActiveDateFilter] = useState<string | null>(null);
  const [activeStatusFilter, setActiveStatusFilter] = useState<string | null>(null);

  // Date filter logic
  const handleDateFilterChange = (columnKey: string, dateFilter: DateFilterConfig) => {
    if (onFilterChange && filters) {
      onFilterChange({
        ...filters,
        dateFilters: {
          ...filters.dateFilters,
          [columnKey]: dateFilter,
        }
      });
    }
  };

  // Status filter logic
  const handleStatusFilterChange = (columnKey: string, selectedStatuses: string[]) => {
    if (onFilterChange && filters) {
      onFilterChange({
        ...filters,
        statusFilters: {
          ...filters.statusFilters,
          [columnKey]: { selectedStatuses }
        }
      });
    }
  };

  // Toggles
  const toggleDateFilter = (columnKey: string) => {
    setActiveDateFilter(activeDateFilter === columnKey ? null : columnKey);
    if (activeStatusFilter) setActiveStatusFilter(null);
  };
  
  const toggleStatusFilter = (columnKey: string) => {
    setActiveStatusFilter(activeStatusFilter === columnKey ? null : columnKey);
    if (activeDateFilter) setActiveDateFilter(null);
  };

  // Active checks
  const isDateFilterActive = (columnKey: string) => {
    return filters?.dateFilters[columnKey] &&
      (filters.dateFilters[columnKey].startDate || filters.dateFilters[columnKey].endDate);
  };
  
  const isStatusFilterActive = (columnKey: string) => {
    return filters?.statusFilters[columnKey] &&
      filters.statusFilters[columnKey].selectedStatuses.length > 0;
  };

  return {
    activeDateFilter,
    activeStatusFilter,
    handleDateFilterChange,
    handleStatusFilterChange,
    toggleDateFilter,
    toggleStatusFilter,
    isDateFilterActive,
    isStatusFilterActive,
    setActiveDateFilter,
    setActiveStatusFilter,
  };
}

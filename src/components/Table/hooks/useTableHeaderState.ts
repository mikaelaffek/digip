import { useState } from "react";
import { TableFilters, DateFilterConfig, StatusFilterConfig } from "@/types/table";

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

  const handleDateFilterToggle = (columnKey: string) => {
    setActiveDateFilter(prev => prev === columnKey ? null : columnKey);
    // Close any open status filter when opening a date filter
    if (activeStatusFilter) {
      setActiveStatusFilter(null);
    }
  };

  const handleDateFilterClose = () => {
    setActiveDateFilter(null);
  };

  // Status filter logic
  const handleStatusFilterChange = (columnKey: string, selectedStatuses: string[]) => {
    if (onFilterChange && filters) {
      onFilterChange({
        ...filters,
        statusFilters: {
          ...filters.statusFilters,
          [columnKey]: { selectedStatuses },
        }
      });
    }
  };

  const handleStatusFilterToggle = (columnKey: string) => {
    setActiveStatusFilter(prev => prev === columnKey ? null : columnKey);
    // Close any open date filter when opening a status filter
    if (activeDateFilter) {
      setActiveDateFilter(null);
    }
  };

  const handleStatusFilterClose = () => {
    setActiveStatusFilter(null);
  };

  return {
    activeDateFilter,
    activeStatusFilter,
    handleDateFilterChange,
    handleDateFilterToggle,
    handleDateFilterClose,
    handleStatusFilterChange,
    handleStatusFilterToggle,
    handleStatusFilterClose,
  };
}

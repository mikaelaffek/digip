import { useState } from 'react';
import { DateFilterConfig, StatusFilterConfig, TableFilters } from '@/types/table';

export interface UseTrademarkFiltersReturn {
  searchTerm: string;
  dateFilters: Record<string, DateFilterConfig>;
  statusFilters: Record<string, StatusFilterConfig>;
  setSearchTerm: (term: string) => void;
  handleFilterChange: (filters: TableFilters) => void;
  filters: TableFilters;
}

export const useTrademarkFilters = (): UseTrademarkFiltersReturn => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilters, setDateFilters] = useState<Record<string, DateFilterConfig>>({});
  const [statusFilters, setStatusFilters] = useState<Record<string, StatusFilterConfig>>({});

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

  const filters: TableFilters = {
    dateFilters: dateFilters || {},
    statusFilters: statusFilters || {},
    searchTerm
  };

  return {
    searchTerm,
    dateFilters,
    statusFilters,
    setSearchTerm,
    handleFilterChange,
    filters
  };
};

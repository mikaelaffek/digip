"use client";

import { useState, useMemo, useEffect } from 'react';
import { fetchTrademarks, filterTrademarks } from '../services/trademarkService';
import { Trademark, TrademarkResponse } from '../../../types/trademark';
import { SortConfig, DateFilterConfig, StatusFilterConfig } from '../../../types/table';
import { useApiResource } from '../../../hooks/useApiResource';
import { TABLE_CONFIG } from '../../../config/constants';

interface UseTrademarkParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  searchTerm?: string;
  dateFilters?: Record<string, DateFilterConfig>;
  statusFilters?: Record<string, StatusFilterConfig>;
  onTotalCountChange?: (count: number) => void;
}

export const useTrademarks = (params?: UseTrademarkParams) => {
  const [searchTerm, setSearchTerm] = useState(params?.searchTerm || '');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: params?.sortBy || 'properties.display_text',
    direction: params?.sortOrder || 'asc',
  });
  
  // Update sort config when params change
  useEffect(() => {
    if (params?.sortBy && params?.sortOrder) {
      setSortConfig({
        key: params.sortBy,
        direction: params.sortOrder,
      });
    }
  }, [params?.sortBy, params?.sortOrder]);
  
  // Previous sort config state
  const [prevSortConfig] = useState<SortConfig>({
    key: 'properties.display_text',
    direction: 'asc',
  });
  const [currentPage, setCurrentPage] = useState(params?.page || 1);
  
  // Update current page when params change
  useEffect(() => {
    if (params?.page) {
      setCurrentPage(params.page);
    }
  }, [params?.page]);
  const [pageSize, setPageSize] = useState(params?.pageSize || TABLE_CONFIG.DEFAULT_PAGE_SIZE);
  
  // Update page size when params change
  useEffect(() => {
    if (params?.pageSize) {
      setPageSize(params.pageSize);
    }
  }, [params?.pageSize]);
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);
  const [dateFilters, setDateFilters] = useState<Record<string, DateFilterConfig>>(params?.dateFilters || {});
  
  // Update date filters when params change
  useEffect(() => {
    if (params?.dateFilters) {
      setDateFilters(params.dateFilters);
    }
  }, [params?.dateFilters]);
  const [statusFilters, setStatusFilters] = useState<Record<string, StatusFilterConfig>>(params?.statusFilters || {});
  
  // Update status filters when params change
  useEffect(() => {
    if (params?.statusFilters) {
      setStatusFilters(params.statusFilters);
    }
  }, [params?.statusFilters]);

  // Fetch trademarks using our generic API resource hook with notifications
  const {
    data: trademarkResponse,
    isLoading: apiLoading,
    error,
    refetch,
  } = useApiResource<Trademark>(
    ['trademarks'], // queryKey
    fetchTrademarks, // fetchFn
    { // additional options
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      // Notification options - enable all for debugging
      showErrorNotification: true,
      showLoadingNotification: true,
      showSuccessNotification: true,
      loadingMessage: 'Loading trademark data...',
      successMessage: 'Trademark data loaded successfully'
    }
  );
  
  // Simulate loading delay for better UX
  useEffect(() => {
    if (apiLoading) {
      setIsDelayedLoading(true);
      return;
    }
    
    const timer = setTimeout(() => {
      setIsDelayedLoading(false);
    }, TABLE_CONFIG.LOADING_DELAY_MS);
    
    return () => clearTimeout(timer);
  }, [apiLoading]);

  // Helper function to apply date filters
  const applyDateFilters = (data: TrademarkResponse): TrademarkResponse => {
    
    // Apply date filters
    const dateFiltered = {...data};
    dateFiltered.data = data.data.filter(trademark => {
      // Check each date filter
      return Object.entries(dateFilters).every(([columnKey, filter]) => {
        if (!filter.startDate && !filter.endDate) return true;
        
        // Get the date value from the trademark based on the column key
        const keys = columnKey.split('.');
        let dateValue: any = trademark;
        
        // Traverse the nested properties
        for (const key of keys) {
          dateValue = dateValue?.[key];
        }
        
        // If no date value, it doesn't match the filter
        if (!dateValue) return false;
        
        // Convert to Date object if it's a string
        const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
        
        // Check if date is within range
        const afterStartDate = !filter.startDate || date >= filter.startDate;
        const beforeEndDate = !filter.endDate || date <= filter.endDate;
        
        return afterStartDate && beforeEndDate;
      });
    });
    
    return dateFiltered;
  };
  
  // Helper function to apply status filters
  const applyStatusFilters = (data: TrademarkResponse) => {
    // Apply status filters
    const statusFiltered = {...data};
    console.log('Applying status filters:', statusFilters);
    
    statusFiltered.data = data.data.filter(trademark => {
      // Check each status filter
      return Object.entries(statusFilters).every(([columnKey, filter]) => {
        if (filter.selectedStatuses.length === 0) return true;
        
        // Get the status value from the trademark based on the column key
        const keys = columnKey.split('.');
        let statusValue: any = trademark;
        
        // Traverse the nested properties
        for (const key of keys) {
          statusValue = statusValue?.[key];
        }
        
        console.log(`Column key: ${columnKey}, Status value: ${statusValue}, Selected statuses:`, filter.selectedStatuses);
        
        // If no status value, it doesn't match the filter
        if (!statusValue) return false;
        
        // Check if status is in the selected statuses
        const matches = filter.selectedStatuses.includes(statusValue);
        console.log(`Status ${statusValue} matches filter: ${matches}`);
        return matches;
      });
    });
    
    console.log(`Filtered from ${data.data.length} to ${statusFiltered.data.length} trademarks`);
    return statusFiltered;
  };
  
  // Filter trademarks based on search term and filters
  const filteredTrademarks = useMemo(() => {
    if (!trademarkResponse) return {
      status: true,
      message: "",
      data: [],
      meta: [],
      prev_page_query: null,
      next_page_query: null,
      path: "",
      current_page: 1,
      per_page: 10,
      pages: 1,
      to: 0,
      total: 0
    } as TrademarkResponse;
    
    // First filter by search term
    const searchFiltered = filterTrademarks(trademarkResponse, searchTerm);
    
    // Apply filters if they exist
    let filteredData = searchFiltered;
    
    // Apply date filters if any exist
    if (Object.keys(dateFilters).length > 0) {
      filteredData = applyDateFilters(filteredData);
    }
    
    // Apply status filters if any exist
    if (Object.keys(statusFilters).length > 0) {
      filteredData = applyStatusFilters(filteredData);
    }
    
    return filteredData;
  }, [trademarkResponse, searchTerm, dateFilters, statusFilters]);

  // Sort trademarks based on sort config
  const sortedTrademarks = useMemo(() => {
    if (!filteredTrademarks?.data) return [];
    
    if (!sortConfig.key) return filteredTrademarks.data;
    
    return [...filteredTrademarks.data].sort((a, b) => {
      // Handle nested properties (e.g., "properties.brand")
      const keys = sortConfig.key.split('.');
      let aValue: any = a;
      let bValue: any = b;
      
      // Traverse the nested properties
      for (const key of keys) {
        aValue = aValue?.[key];
        bValue = bValue?.[key];
      }
      
      // Handle null or undefined values
      if (aValue === null || aValue === undefined) return sortConfig.direction === 'asc' ? -1 : 1;
      if (bValue === null || bValue === undefined) return sortConfig.direction === 'asc' ? 1 : -1;
      
      // Compare values based on their type
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return sortConfig.direction === 'asc' 
        ? (aValue > bValue ? 1 : -1) 
        : (aValue > bValue ? -1 : 1);
    });
  }, [filteredTrademarks, sortConfig]);

  // Handle sorting
  const handleSort = (key: string) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Apply pagination to sorted trademarks
  const paginatedTrademarks = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedTrademarks.slice(startIndex, endIndex);
  }, [sortedTrademarks, currentPage, pageSize]);
  
  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(sortedTrademarks.length / pageSize);
  }, [sortedTrademarks.length, pageSize]);
  
  // Notify parent component of total count changes
  useEffect(() => {
    if (params?.onTotalCountChange) {
      params.onTotalCountChange(filteredTrademarks?.data?.length || 0);
    }
  }, [filteredTrademarks?.data?.length, params?.onTotalCountChange]);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // Handle page size change
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return {
    trademarks: paginatedTrademarks,
    isLoading: isDelayedLoading,
    error,
    refetch,
    searchTerm,
    setSearchTerm,
    sortConfig,
    handleSort,
    dateFilters,
    setDateFilters,
    statusFilters,
    setStatusFilters,
    totalCount: filteredTrademarks?.data?.length || 0,
    pagination: {
      currentPage,
      totalPages,
      pageSize,
      onPageChange: setCurrentPage,
      onPageSizeChange: setPageSize,
      pageSizeOptions: TABLE_CONFIG.PAGINATION_OPTIONS
    },
  };
};

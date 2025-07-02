"use client";

import { useState, useMemo, useEffect } from 'react';
import { fetchTrademarks, filterTrademarks } from '../services/trademarkService';
import { Trademark, TrademarkResponse } from '../../../types/trademark';
import { SortConfig } from '../../../types/table';
import { useApiResource } from '../../../hooks/useApiResource';
import { TABLE_CONFIG } from '../../../config/constants';

export const useTrademarks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'properties.display_text',
    direction: 'asc',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(TABLE_CONFIG.DEFAULT_PAGE_SIZE);
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);

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

  // Filter trademarks based on search term
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
    
    return filterTrademarks(trademarkResponse, searchTerm);
  }, [trademarkResponse, searchTerm]);

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
    totalCount: sortedTrademarks.length,
    pagination: {
      currentPage,
      totalPages,
      pageSize,
      onPageChange: handlePageChange,
      onPageSizeChange: handlePageSizeChange,
      pageSizeOptions: TABLE_CONFIG.PAGINATION_OPTIONS,
    },
  };
};

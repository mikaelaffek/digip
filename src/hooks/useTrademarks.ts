"use client";

import { useState, useMemo } from 'react';
import { fetchTrademarks, filterTrademarks } from '../services/trademarkService';
import { Trademark, TrademarkResponse } from '../types/trademark';
import { SortConfig } from '../types/table';
import { useApiResource } from './useApiResource';

export const useTrademarks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'properties.display_text',
    direction: 'asc',
  });

  // Fetch trademarks using our generic API resource hook
  const {
    data: trademarkResponse,
    isLoading,
    error,
    refetch,
  } = useApiResource<Trademark>(
    ['trademarks'], // queryKey
    fetchTrademarks, // fetchFn
    { // additional options
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false
    }
  );

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

  return {
    trademarks: sortedTrademarks,
    isLoading,
    error,
    refetch,
    searchTerm,
    setSearchTerm,
    sortConfig,
    handleSort,
    totalCount: trademarkResponse?.total || 0,
    pagination: {
      currentPage: trademarkResponse?.current_page || 1,
      totalPages: trademarkResponse?.pages || 1,
      perPage: trademarkResponse?.per_page || 10,
    },
  };
};

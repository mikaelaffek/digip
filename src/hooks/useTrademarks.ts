import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTrademarks, filterTrademarks } from '../services/trademarkService';
import { Trademark, TrademarkResponse } from '../types/trademark';
import { SortConfig } from '../types/table';

export const useTrademarks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'properties.display_text',
    direction: 'asc',
  });

  // Fetch trademarks using React Query
  const {
    data: trademarkResponse,
    isLoading,
    error,
    refetch,
  } = useQuery<TrademarkResponse, Error>({
    queryKey: ['trademarks'],
    queryFn: fetchTrademarks,
  });

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

    const { key, direction } = sortConfig;
    
    return [...filteredTrademarks.data].sort((a, b) => {
      // Handle nested properties (e.g., 'properties.display_text')
      const keys = key.split('.');
      
      // Get the values to compare
      let aValue: any = a;
      let bValue: any = b;
      
      for (const k of keys) {
        aValue = aValue?.[k];
        bValue = bValue?.[k];
      }
      
      // Handle null/undefined values
      if (aValue == null) return direction === 'asc' ? -1 : 1;
      if (bValue == null) return direction === 'asc' ? 1 : -1;
      
      // Compare values
      if (typeof aValue === 'string') {
        return direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      // For non-string values
      return direction === 'asc'
        ? aValue > bValue ? 1 : -1
        : aValue < bValue ? 1 : -1;
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

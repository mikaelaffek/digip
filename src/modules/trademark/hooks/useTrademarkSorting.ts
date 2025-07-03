import { useState } from 'react';
import { SortConfig } from '@/types/table';

export interface UseTrademarkSortingReturn {
  sortConfig: SortConfig;
  handleSort: (key: string) => void;
}

export const useTrademarkSorting = (initialSortKey: string = 'properties.display_text'): UseTrademarkSortingReturn => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: initialSortKey,
    direction: 'asc'
  });
  
  const handleSort = (key: string) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return {
    sortConfig,
    handleSort
  };
};

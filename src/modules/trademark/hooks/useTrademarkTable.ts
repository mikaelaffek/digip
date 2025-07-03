import { useEffect, useState } from 'react';
import { useTrademarks } from './useTrademarks';
import usePagination from './usePagination';
import { TABLE_CONFIG } from '@/config/constants';
import { Trademark } from '@/types/trademark';
import { useTrademarkFilters } from './useTrademarkFilters';
import { useTrademarkModal } from './useTrademarkModal';
import { useTrademarkSorting } from './useTrademarkSorting';
import { getTrademarkColumns } from '@modules/trademark/components/TrademarkTableColumns';

export interface UseTrademarkTableReturn {
  trademarks: Trademark[];
  isLoading: boolean;
  error: Error | null;
  totalCount: number;
  apiTotalCount: number;
  pagination: ReturnType<typeof usePagination>;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleFilterChange: ReturnType<typeof useTrademarkFilters>['handleFilterChange'];
  filters: ReturnType<typeof useTrademarkFilters>['filters'];
  sortConfig: ReturnType<typeof useTrademarkSorting>['sortConfig'];
  handleSort: ReturnType<typeof useTrademarkSorting>['handleSort'];
  selectedTrademark: Trademark | null;
  handleViewClick: (trademark: Trademark) => void;
  handleCloseModal: () => void;
  columns: ReturnType<typeof getTrademarkColumns>;
}

export const useTrademarkTable = (): UseTrademarkTableReturn => {
  const [totalCount, setTotalCount] = useState(0);
  
  // Initialize pagination
  const pagination = usePagination(1, TABLE_CONFIG.DEFAULT_PAGE_SIZE, totalCount, TABLE_CONFIG.PAGINATION_OPTIONS);
  
  // Use our custom hooks
  const { searchTerm, dateFilters, statusFilters, setSearchTerm, handleFilterChange, filters } = useTrademarkFilters();
  const { sortConfig, handleSort } = useTrademarkSorting();
  const { selectedTrademark, handleViewClick, handleCloseModal } = useTrademarkModal();
  
  // Fetch trademarks with all parameters
  const { trademarks, isLoading, error, apiTotalCount } = useTrademarks({
    page: pagination.currentPage,
    pageSize: pagination.pageSize,
    sortBy: sortConfig.key,
    sortOrder: sortConfig.direction,
    searchTerm,
    dateFilters,
    statusFilters,
    onTotalCountChange: setTotalCount
  });

  // Get columns from the separated file and pass the handler
  const columns = getTrademarkColumns(handleViewClick);
  
  // Reset to first page when filters change
  useEffect(() => {
    pagination.onPageChange(1);
  }, [searchTerm, dateFilters, statusFilters]);

  return {
    trademarks,
    isLoading,
    error,
    totalCount,
    apiTotalCount,
    pagination,
    searchTerm,
    setSearchTerm,
    handleFilterChange,
    filters,
    sortConfig,
    handleSort,
    selectedTrademark,
    handleViewClick,
    handleCloseModal,
    columns
  };
};

"use client";

import { useState, useEffect } from 'react';

export interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions: number[];
}

export function usePagination(
  initialPage = 1, 
  initialPageSize = 3, 
  totalCount = 0, 
  pageSizeOptions = [3, 8, 16, 32]
): PaginationConfig {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  
  // Calculate total pages based on total count and page size
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  
  // Reset to page 1 when page size changes or total count changes
  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize, totalCount]);
  
  // Ensure current page is valid when total pages changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);
  
  const handlePageChange = (page: number) => {
    // Ensure page is within valid range
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };
  
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
  };
  
  return {
    currentPage,
    totalPages,
    pageSize,
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageSizeChange,
    pageSizeOptions
  };
}

export default usePagination;

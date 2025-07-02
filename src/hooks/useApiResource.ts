"use client";

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiResponse } from '../types/api';
import { useNotification } from './useNotification';

/**
 * Generic hook for fetching any API resource
 * @param queryKey The React Query key for caching
 * @param fetchFn The function to fetch the resource
 * @param options Additional React Query options
 * @returns The React Query result with the API response
 */
export function useApiResource<T>(
  queryKey: string[],
  fetchFn: () => Promise<ApiResponse<T>>,
  options?: Omit<UseQueryOptions<ApiResponse<T>, Error>, 'queryKey' | 'queryFn'> & {
    showLoadingNotification?: boolean;
    showErrorNotification?: boolean;
    showSuccessNotification?: boolean;
    loadingMessage?: string;
    successMessage?: string;
  }
) {
  const { showInfo, showError, showSuccess, dismiss } = useNotification();
  
  const {
    showLoadingNotification = false,
    showErrorNotification = true,
    showSuccessNotification = false,
    loadingMessage = 'Loading data...',
    successMessage = 'Data loaded successfully',
    ...queryOptions
  } = options || {};
  
  return useQuery<ApiResponse<T>, Error>({
    queryKey,
    queryFn: async () => {
      // Show loading notification if enabled
      let loadingToastId;
      if (showLoadingNotification) {
        loadingToastId = showInfo(loadingMessage, { autoClose: false });
      }
      
      try {
        const result = await fetchFn();
        
        // Dismiss loading notification if it was shown
        if (showLoadingNotification && loadingToastId) {
          // Use our notification service's dismiss function directly
          dismiss(loadingToastId);
        }
        
        // Show success notification if enabled
        if (showSuccessNotification) {
          showSuccess(successMessage);
        }
        
        return result;
      } catch (error) {
        // Dismiss loading notification if it was shown
        if (showLoadingNotification && loadingToastId) {
          // Use our notification service's dismiss function directly
          dismiss(loadingToastId);
        }
        
        // Show error notification if enabled
        if (showErrorNotification && error instanceof Error) {
          showError(`Error: ${error.message}`);
        }
        throw error;
      }
    },
    ...queryOptions
  });
}

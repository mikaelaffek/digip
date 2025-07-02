"use client";

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiResponse } from '../types/api';

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
  options?: Omit<UseQueryOptions<ApiResponse<T>, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<ApiResponse<T>, Error>({
    queryKey,
    queryFn: fetchFn,
    ...options
  });
}

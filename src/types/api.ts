/**
 * Generic API response interface that can be used for any resource type
 * Makes pagination/meta fields optional for flexibility across different endpoints
 */
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T[];
  meta?: any[];
  prev_page_query?: string | null;
  next_page_query?: string | null;
  path?: string;
  current_page?: number;
  per_page?: number;
  pages?: number;
  to?: number;
  total?: number;
}

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

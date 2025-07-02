import { PaginationConfig } from './pagination';

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

export type ColumnType = 'text' | 'date' | 'number' | 'status';

export interface DateFilterConfig {
  startDate: Date | null;
  endDate: Date | null;
}

export interface StatusFilterConfig {
  selectedStatuses: string[];
}

export interface TableColumn<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  type?: ColumnType;
  filterable?: boolean;
}

export interface TableFilters {
  dateFilters: Record<string, DateFilterConfig>;
  statusFilters: Record<string, StatusFilterConfig>;
  searchTerm?: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  error?: Error | null;
  onRowClick?: (item: T) => void;
  sortConfig?: SortConfig;
  onSort?: (key: string) => void;
  filters?: TableFilters;
  onFilterChange?: (filters: TableFilters) => void;
  emptyMessage?: string;
  pagination?: PaginationConfig;
  containerWidth?: string;
}

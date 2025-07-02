export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

export interface TableColumn<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  error?: Error | null;
  onRowClick?: (item: T) => void;
  sortConfig?: SortConfig;
  onSort?: (key: string) => void;
  emptyMessage?: string;
}

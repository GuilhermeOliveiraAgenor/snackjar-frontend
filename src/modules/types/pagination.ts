export interface PaginationMeta {
  page: number;
  per_page: number;
  total_count: number;
  filters?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

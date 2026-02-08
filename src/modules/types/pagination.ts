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

export const EmptyPagination = <T>() => ({
  data: [] as T[],
  meta: {
    page: 1,
    per_page: 1,
    total_count: 0,
  },
});

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export interface PaginationEmits {
  (_event: 'update:currentPage', _page: number): void;
  (_event: 'prev'): void;
  (_event: 'next'): void;
}

export interface PaginationOptions {
  itemsPerPage?: number;
  initialPage?: number;
}

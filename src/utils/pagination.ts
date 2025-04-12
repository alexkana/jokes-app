import { PAGINATION } from '@constants';

/**
 * Generates an array of page numbers for a sliding window pagination
 *
 * @param currentPage - The currently active page
 * @param totalPages - Total number of pages
 * @param visibleCount - Number of page buttons to display
 * @returns Array of page numbers to display
 */
export function getVisiblePageNumbers(
  currentPage: number,
  totalPages: number,
  visibleCount: number = PAGINATION.DEFAULT_VISIBLE_PAGES
): number[] {
  const pages: number[] = [];

  if (totalPages <= visibleCount) {
    // If we have fewer pages than our limit, show all pages
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    // Calculate the start page based on current page
    let startPage = Math.max(1, currentPage - Math.floor(visibleCount / 2));

    // If we're near the end, adjust the window to keep visibleCount visible pages
    if (startPage + visibleCount > totalPages + 1) {
      startPage = totalPages - visibleCount + 1;
    }

    // Create the sliding window of pages
    for (let i = 0; i < visibleCount; i++) {
      if (startPage + i <= totalPages) {
        pages.push(startPage + i);
      }
    }
  }

  return pages;
}

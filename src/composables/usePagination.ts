import { ref, computed, type Ref, type ComputedRef, watch } from 'vue';

export interface PaginationOptions {
  itemsPerPage?: number;
  initialPage?: number;
}

export function usePagination<T>(items: Ref<T[]> | ComputedRef<T[]>, options: PaginationOptions = {}) {
  const itemsPerPage = ref(options.itemsPerPage || 5);
  const currentPage = ref(options.initialPage || 1);

  const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage.value));

  const paginatedItems = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    const endIndex = startIndex + itemsPerPage.value;
    return items.value.slice(startIndex, endIndex);
  });

  // Watch for changes in the items array length
  watch(() => items.value.length, (newLength) => {
    // If the current page is no longer valid (e.g., items were removed),
    // adjust the current page to the last valid page
    const maxPage = Math.max(1, Math.ceil(newLength / itemsPerPage.value));
    if (currentPage.value > maxPage) {
      currentPage.value = maxPage;
    }
  });

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };

  const resetPage = () => {
    currentPage.value = 1;
  };

  return {
    // State
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedItems,

    // Methods
    goToPage,
    nextPage,
    prevPage,
    resetPage,
  };
} 
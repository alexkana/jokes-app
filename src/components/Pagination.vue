<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed } from 'vue';
import type { PaginationProps, PaginationEmits } from '@interfaces';
import { getVisiblePageNumbers } from '@utils/pagination';
import { PAGINATION } from '@constants';

const props = defineProps<PaginationProps>();
const emit = defineEmits<PaginationEmits>();

// Use the utility function to compute visible page numbers
const visiblePages = computed(() => {
  return getVisiblePageNumbers(
    props.currentPage,
    props.totalPages,
    PAGINATION.DEFAULT_VISIBLE_PAGES
  );
});

const goToPage = (page: number) => {
  emit('update:currentPage', page);
};

const prevPage = () => {
  emit('prev');
};

const nextPage = () => {
  emit('next');
};
</script>

<template>
  <div v-if="totalPages > 1" class="mt-6 flex justify-center items-center space-x-2">
    <button
      class="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none"
      :disabled="currentPage === 1"
      aria-label="Previous page"
      @click="prevPage"
    >
      <Icon icon="mdi:chevron-left" width="20" height="20" />
    </button>

    <div class="flex space-x-1 overflow-x-auto max-w-[200px] sm:max-w-none">
      <button
        v-for="page in visiblePages"
        :key="page"
        class="px-3 py-1 rounded-md text-sm cursor-pointer min-w-[32px] focus:outline-none"
        :class="{
          'bg-indigo-600 text-white': page === currentPage,
          'text-gray-400 hover:text-white hover:bg-gray-700': page !== currentPage
        }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </div>

    <button
      class="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none"
      :disabled="currentPage === totalPages"
      aria-label="Next page"
      @click="nextPage"
    >
      <Icon icon="mdi:chevron-right" width="20" height="20" />
    </button>
  </div>
</template>

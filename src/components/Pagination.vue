<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { PaginationProps, PaginationEmits } from '@/interfaces';

defineProps<PaginationProps>();
const emit = defineEmits<PaginationEmits>();

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
      class="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      :disabled="currentPage === 1"
      aria-label="Previous page"
      @click="prevPage"
    >
      <Icon icon="mdi:chevron-left" width="20" height="20" />
    </button>

    <div class="flex space-x-1">
      <button
        v-for="page in totalPages"
        :key="page"
        class="px-3 py-1 rounded-md text-sm cursor-pointer"
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
      class="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      :disabled="currentPage === totalPages"
      aria-label="Next page"
      @click="nextPage"
    >
      <Icon icon="mdi:chevron-right" width="20" height="20" />
    </button>
  </div>
</template> 
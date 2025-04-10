<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { Message } from '@/interfaces';

defineProps<{
  message: Message;
}>();
</script>

<template>
  <div
    v-if="message"
    class="mb-4 p-3 rounded-md flex items-center text-xs sm:text-sm"
    :class="{
      'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100':
        message.type === 'success',
      'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100':
        message.type === 'info',
      'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100':
        message.type === 'error',
    }"
  >
    <Icon
      :icon="message.type === 'success' ? 'mdi:check-circle' : message.type === 'info' ? 'mdi:information' : 'mdi:alert'"
      class="mr-2 flex-shrink-0"
      width="20"
      height="20"
    />
    {{ message.text }}
  </div>
</template> 
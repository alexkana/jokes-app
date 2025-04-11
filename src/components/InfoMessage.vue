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
    class="mb-4 p-3 rounded-md inline-flex items-center font-bold text-sm sm:text-base w-full"
    :class="{
      'bg-green-900 text-green-100': message.type === 'success',
      'bg-blue-900 text-blue-100': message.type === 'info',
      'bg-red-900 text-red-100': message.type === 'error',
    }"
  >
    <Icon
      :icon="
        message.type === 'success'
          ? 'mdi:check-circle'
          : message.type === 'info'
            ? 'mdi:information'
            : 'mdi:alert'
      "
      class="mr-2 flex-shrink-0"
      width="20"
      height="20"
    />
    {{ message.text }}
  </div>
</template>

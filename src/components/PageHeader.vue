<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { PageHeaderProps } from '@interfaces';

defineProps<PageHeaderProps>();
</script>

<template>
  <div>
    <h1 class="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center">
      <Icon :icon="icon" class="mr-2" width="32" height="32" />
      {{ title }}
    </h1>
    <p class="text-base sm:text-lg text-gray-300 mb-8 flex items-center">
      <Icon
        :icon="descriptionIcon || 'mdi:information-outline'"
        class="mr-2 flex-shrink-0"
        width="24"
        height="24"
      />
      {{ description }}
    </p>
  </div>
</template>

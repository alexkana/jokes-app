<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import Navbar from "../components/Navbar.vue";
const route = useRoute();

// Compute the current route description from meta
const routeDescription = computed(() => {
  return route.meta.description as string || '';
});

</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Navigation -->
    <Navbar />
    <div class="flex">
      <!-- Main content -->
      <main class="flex-1 p-6">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@components/Navbar.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
    <!-- Navigation -->
    <Navbar />
    <!-- Main content -->
    <main class="w-full p-6">
      <slot></slot>
    </main>
  </div>
</template>

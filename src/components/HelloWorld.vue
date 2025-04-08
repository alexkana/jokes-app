<script setup lang="ts">
import { ref, computed } from 'vue'
import { HelloWorldProps, HelloWorldState, HelloWorldMethods } from '../interfaces'

// Define props with type safety using the imported interface
const props = defineProps<HelloWorldProps>()

// Reactive state using ref with the imported interface
const count = ref<HelloWorldState['count']>(0)

// Computed property
const doubleCount = computed(() => count.value * 2)

// Methods using the imported interface
const increment: HelloWorldMethods['increment'] = () => {
  count.value++
}

// Lifecycle hooks can be used directly
// For example, onMounted(() => { ... })
</script>

<template>
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">{{ msg }}</h1>

  <div class="card bg-white dark:bg-gray-800 rounded-lg shadow-lg">
    <button 
      type="button" 
      @click="increment"
      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mb-4"
    >
      count is {{ count }} (double: {{ doubleCount }})
    </button>
    <p class="text-gray-600 dark:text-gray-300">
      Edit
      <code class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <div class="mt-8 space-y-4 text-gray-600 dark:text-gray-300">
    <p>
      Check out
      <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank" class="text-blue-500 hover:text-blue-600">create-vue</a>, the official Vue + Vite starter
    </p>
    <p>
      Learn more about IDE Support for Vue in the
      <a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank" class="text-blue-500 hover:text-blue-600">Vue Docs Scaling up Guide</a>.
    </p>
    <p class="text-gray-500 dark:text-gray-400">Click on the Vite and Vue logos to learn more</p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

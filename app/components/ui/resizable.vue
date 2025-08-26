<template>
  <div
    ref="container"
    class="resize overflow-auto border p-4 rounded"
    :style="{ resize: direction }"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  direction: {
    type: String,
    default: 'both', // can be 'horizontal', 'vertical', 'both', or 'none'
  },
});
</script>

<style scoped>
/* Use tailwind if needed */
</style>

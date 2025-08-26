<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <div
    data-slot="sidebar-group"
    data-sidebar="group"
    class="relative flex w-full min-w-0 flex-col p-2"
  >
    <slot />
  </div>
</template>
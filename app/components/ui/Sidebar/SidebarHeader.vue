<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <div
    data-slot="sidebar-header"
    data-sidebar="header"
    class="flex flex-col gap-2 p-2"
  >
    <slot />
  </div>
</template>
<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <div
    data-slot="sidebar-separator"
    data-sidebar="separator"
    class="bg-sidebar-border mx-2 w-auto h-px"
  />
</template>